//servidor.js
const express = require('express');
const app = express();

app.use(express.json()); // Middleware para parsear JSON

let jugadores = [
    { id: 1, nickname: "DragonSlayer", juego: "League of Legends", nivel: "Pro", pais: "España" },
    { id: 2, nickname: "ShadowHunter", juego: "Dota 2", nivel: "Intermedio", pais: "Argentina" },
    { id: 3, nickname: "FireMage", juego: "World of Warcraft", nivel: "Principiante", pais: "México" }
];

//obtener jugador por ID

app.get('/jugadores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const jugador = jugadores.find(j => j.id === id);
    if (jugador) {
        res.json(jugador);
    } else {
        res.status(404).json({ mensaje: "Jugador no encontrado" });
    }
});

