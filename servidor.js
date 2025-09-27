//servidor.js
const express = require('express');
const app = express();


app.use(express.json()); // Middleware para parsear JSON

//array de jugadores, sera nuestro "base de datos" temporal
let jugadores = [
    { id: 1, nickname: "DragonSlayer", juego: "League of Legends", nivel: "Pro", pais: "España" },
    { id: 2, nickname: "ShadowHunter", juego: "Dota 2", nivel: "Intermedio", pais: "Argentina" },
    { id: 3, nickname: "FireMage", juego: "World of Warcraft", nivel: "Principiante", pais: "México" }
];

//obtener jugador por ID

app.get('/jugadores/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const jugador = jugadores.find(j => j.id === id);

    if (!jugador) {
        return res.status(404).json({ mensaje: "Jugador no encontrado" }); // Manejo de error si no se encuentra el jugador
    }
    res.json(jugador);  
});

app.listen(3000, () => {
    console.log('API Torneo Gaming en http://localhost:3000');
});

//QUERY PARAMS

// Obtener todos los jugadores
app.get('/jugadores', (req, res) => { 
    const limite = parseInt(req.query.limite);
    const juego = req.query.juego;
    const nivel = req.query.nivel;
    const pais = req.query.pais;    
    const buscar = req.query.buscar;

    let resultados = jugadores; // Copia del array original
   
    if (juego) { //filtrar por juego
        resultados = resultados.filter(j => j.juego.toLowerCase() === juego.toLowerCase()); 
    }

    if (nivel) { //filtrar por nivel
        resultados = resultados.filter(j => j.nivel.toLowerCase() === nivel.toLowerCase());
    }   

    if (pais) { //filtrar por pais
        resultados = resultados.filter(j => j.pais.toLowerCase() === pais.toLowerCase());
    }   

    if (buscar) { //filtrar por busqueda en nickname
        resultados = resultados.filter(j => j.nickname.toLowerCase().includes(buscar.toLowerCase()));
    }

    if (limite) { //filtrar por limite
        resultados = resultados.slice(0, limite);
    }

    res.json({
        total: resultados.length,
        resultados: resultados              
    }); // Devolver los resultados filtrados
});     




