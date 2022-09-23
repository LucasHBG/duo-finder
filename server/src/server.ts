import express from "express";

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
const app = express();

/**
 * Get list of all games from database
 *
 * @return list of games
 */
app.get("/games", (request, response) => {
  return response.json([]);
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
app.get("/games/:id/ads", (request, response) => {
  return response.json([
    { id: 1, description: "Anúncio 1" },
    { id: 2, description: "Anúncio 2" },
    { id: 3, description: "Anúncio 3" },
    { id: 4, description: "Anúncio 4" },
    { id: 5, description: "Anúncio 5" },
    { id: 6, description: "Anúncio 6" },
  ]);
});

app.get("ads/:id/discord", (request, response) => {
  return response.json([]);
});

app.listen(3333);
