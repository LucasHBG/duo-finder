import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertStringHourToMinutes } from "./utils/convert-string-hour-to-minutes";
import { convertStringMinutesToHour } from "./utils/convert-string-minutes-to-hour";

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
const app = express();

// Enables Express library to accept JSON data
app.use(express.json());

//! Need to set up your origin or leave it open to be used by everyone
app.use(cors());

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
app.post("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            hourStart: convertStringHourToMinutes(body.hourStart),
            hourEnd: convertStringHourToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        },
    });

    return response.status(201).json(ad);
});

/**
 *  Get all saved ads from database
 *
 * @return list with all ads
 */
app.get("/ads", async (request, response) => {
    const ads = await prisma.ad.findMany();

    return response.json(ads);
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
                hourStart: convertStringMinutesToHour(ad.hourStart),
                hourEnd: convertStringMinutesToHour(ad.hourEnd),
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
