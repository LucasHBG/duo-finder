import express from "express";

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
const app = express();

app.get("/caraio", (request, response) => {
  return response.json([
    { id: 1, description: "Alto, com 1,82 cm" },
    { id: 2, description: "Baixo, com 1,65 cm" },
    { id: 3, description: "Médio, com 1,72 cm" },
  ]);
});

app.listen(3333);
