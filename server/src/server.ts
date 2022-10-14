import express from "express";
import { PrismaClient } from "@prisma/client";

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
const app = express();

/**
 * Configuration variable for Prisma
 */
const prisma: PrismaClient = new PrismaClient({
    log: ["query"],
});

/**
 * Get list of all games from database and add "count" column
 * to show how many ads a game has
 *
 * @return list of games + count column
 */
app.get("/games", async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                },
            },
        },
    });
    return response.json(games);
});

/**
 * Creates an ad
 *
 * @return Http status code
 */
app.post("/ads", (request, response) => {
    return response.status(201).json([]);
});

/**
 *  Get all saved ads from database
 *
 * @return list with all ads
 */
app.get("/ads", (request, response) => {
    return response.json([
        { id: 1, description: "Anúncio 1" },
        { id: 2, description: "Anúncio 2" },
        { id: 3, description: "Anúncio 3" },
        { id: 4, description: "Anúncio 4" },
        { id: 5, description: "Anúncio 5" },
        { id: 6, description: "Anúncio 6" },
    ]);
});

/**
 * Get a list of ads from a game using the game id
 *
 * @return list of ads from one single game
 */
app.get("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            yearsPlaying: true,
            useVoiceChannel: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return response.json(
        ads.map((ad) => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(","),
            };
        })
    );
});

app.get("/ads/:id/discord", async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        },
    });

    return response.json({
        discord: ad.discord,
    });
});

app.listen(3333);
