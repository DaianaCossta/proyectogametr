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

let proximoId = 4; // Variable para asignar IDs únicos

// Crear un nuevo jugador
app.post('/jugadores', (req, res) => {
    const { nickname, juego, nivel, pais } = req.body;

    if(!nickname) {
        return res.status(400).json({ mensaje: "El campo 'nickname' es obligatorio" });
    }

    if(!juego) {
        return res.status(400).json({ mensaje: "El campo 'juego' es obligatorio" });
    }

    if(!nivel) {
        return res.status(400).json({ mensaje: "El campo 'nivel' es obligatorio" });
    }

    if(!pais) {
        return res.status(400).json({ mensaje: "El campo 'pais' es obligatorio" });
    }
   const nicknameExistente = jugadores.find(j => j.nickname.toLowerCase() === nickname.toLowerCase());

   if(nicknameExistente) {
        return res.status(400).json({ mensaje: "Este nickname ya existe, elija otro" });
   }

    const nuevoJugador = { // Crear el nuevo jugador con un ID único
        id: proximoId++, // Incrementar el ID para el próximo jugador
        nickname, 
        juego,
        nivel,
        pais
    };

    jugadores.push(nuevoJugador); // Agregar el nuevo jugador al array

    res.status(201).json({
        mensaje: "nuevo jugador creado exitosamente",
        jugador: nuevoJugador}); // Devolver el nuevo jugador creado
});

app.put('/jugadores/:id', (req, res) => { // Ruta para actualizar un jugador por ID
    const id = parseInt(req.params.id); // Obtener el ID del jugador desde los parámetros de la URL
    const { nickname, juego, nivel, pais } = req.body;

    const jugador = jugadores.find(j => j.id === id);

    if (!jugador) {
        return res.status(404).json({ mensaje: "Jugador no encontrado" });
    }

    // Actualizar los campos del jugador
    jugador.nickname = nickname || jugador.nickname;
    jugador.juego = juego || jugador.juego;
    jugador.nivel = nivel || jugador.nivel;
    jugador.pais = pais || jugador.pais;

    res.json(jugador);
});





