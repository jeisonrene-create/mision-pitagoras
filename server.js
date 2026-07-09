
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const QUESTION_BANK = [
  {
    id: 1, type: "normal", title: "La tirolesa del campamento",
    scenario: "En un campamento se instala una tirolesa desde una plataforma de 12 m de altura hasta un punto en el suelo ubicado a 16 m de la base.",
    question: "¿Cuánto mide el cable de la tirolesa?",
    options: ["20 m", "28 m", "14 m", "192 m"], answer: "20 m",
    explanation: "12² + 16² = c² → 144 + 256 = 400 → c = 20 m."
  },
  {
    id: 2, type: "normal", title: "La pantalla del cine",
    scenario: "Una pantalla rectangular mide 9 m de ancho y 12 m de alto.",
    question: "¿Cuánto mide su diagonal?",
    options: ["15 m", "21 m", "108 m", "3 m"], answer: "15 m",
    explanation: "9² + 12² = c² → 81 + 144 = 225 → c = 15 m."
  },
  {
    id: 3, type: "normal", title: "El atajo del mensajero",
    scenario: "Un mensajero avanza 8 cuadras hacia el norte y 15 cuadras hacia el este.",
    question: "¿Cuál sería la distancia directa desde el inicio hasta el destino?",
    options: ["23 cuadras", "17 cuadras", "7 cuadras", "120 cuadras"], answer: "17 cuadras",
    explanation: "8² + 15² = c² → 64 + 225 = 289 → c = 17."
  },
  {
    id: 4, type: "normal", title: "La escalera del pintor",
    scenario: "Una escalera de 10 m se apoya en una pared. La base queda a 6 m de la pared.",
    question: "¿A qué altura llega la escalera?",
    options: ["8 m", "16 m", "4 m", "12 m"], answer: "8 m",
    explanation: "6² + b² = 10² → 36 + b² = 100 → b² = 64 → b = 8 m."
  },
  {
    id: 5, type: "normal", title: "El cable del internet",
    scenario: "Un cable va desde la parte superior de un poste de 9 m hasta una casa. La distancia horizontal entre el poste y la casa es de 12 m.",
    question: "¿Cuánto mide el cable?",
    options: ["15 m", "21 m", "3 m", "108 m"], answer: "15 m",
    explanation: "9² + 12² = c² → 81 + 144 = 225 → c = 15 m."
  },
  {
    id: 6, type: "normal", title: "El puente peatonal",
    scenario: "Una rampa de un puente peatonal mide 13 m y alcanza una altura de 5 m.",
    question: "¿Cuál es la distancia horizontal aproximada?",
    options: ["12 m", "18 m", "8 m", "10 m"], answer: "12 m",
    explanation: "5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12 m."
  },
  {
    id: 7, type: "normal", title: "El terreno rectangular",
    scenario: "Un terreno mide 21 m de frente y 28 m de fondo.",
    question: "¿Cuánto mide la diagonal del terreno?",
    options: ["35 m", "49 m", "7 m", "588 m"], answer: "35 m",
    explanation: "21² + 28² = c² → 441 + 784 = 1225 → c = 35 m."
  },
  {
    id: 8, type: "normal", title: "La cuerda de la piñata",
    scenario: "Una cuerda se amarra desde un punto alto de 4 m hasta un punto en el suelo a 3 m de distancia.",
    question: "¿Cuánto mide la cuerda?",
    options: ["5 m", "7 m", "12 m", "1 m"], answer: "5 m",
    explanation: "3² + 4² = c² → 9 + 16 = 25 → c = 5 m."
  },
  {
    id: 9, type: "normal", title: "El dron sobre el parque",
    scenario: "Un dron se desplaza 20 m hacia el este y luego 15 m hacia el norte.",
    question: "¿Cuál es la distancia directa desde su punto inicial?",
    options: ["25 m", "35 m", "5 m", "300 m"], answer: "25 m",
    explanation: "20² + 15² = c² → 400 + 225 = 625 → c = 25 m."
  },
  {
    id: 10, type: "normal", title: "La cancha de baloncesto",
    scenario: "Una cancha rectangular mide 18 m de largo y 24 m de ancho.",
    question: "¿Cuánto mide la diagonal?",
    options: ["30 m", "42 m", "6 m", "432 m"], answer: "30 m",
    explanation: "18² + 24² = c² → 324 + 576 = 900 → c = 30 m."
  },
  {
    id: 11, type: "normal", title: "El poste de luz",
    scenario: "Un poste mide 7 m. Un cable se fija en su punta y llega al suelo a 24 m de la base.",
    question: "¿Cuánto mide el cable?",
    options: ["25 m", "31 m", "17 m", "168 m"], answer: "25 m",
    explanation: "7² + 24² = c² → 49 + 576 = 625 → c = 25 m."
  },
  {
    id: 12, type: "normal", title: "La maleta en diagonal",
    scenario: "Una maleta rectangular tiene 30 cm de ancho y 40 cm de alto.",
    question: "¿Cuál es la diagonal frontal de la maleta?",
    options: ["50 cm", "70 cm", "10 cm", "1200 cm"], answer: "50 cm",
    explanation: "30² + 40² = c² → 900 + 1600 = 2500 → c = 50 cm."
  },
  {
    id: 13, type: "normal", title: "El rescate en el río",
    scenario: "Un rescatista cruza 10 m hacia el norte y 24 m hacia el este para llegar a una persona.",
    question: "¿Cuál es la distancia directa entre ambos puntos?",
    options: ["26 m", "34 m", "14 m", "240 m"], answer: "26 m",
    explanation: "10² + 24² = c² → 100 + 576 = 676 → c = 26 m."
  },
  {
    id: 14, type: "normal", title: "El cuadro en la pared",
    scenario: "Un cuadro mide 45 cm de ancho y 60 cm de alto.",
    question: "¿Cuánto mide su diagonal?",
    options: ["75 cm", "105 cm", "15 cm", "2700 cm"], answer: "75 cm",
    explanation: "45² + 60² = c² → 2025 + 3600 = 5625 → c = 75 cm."
  },
  {
    id: 15, type: "normal", title: "La ruta de la ambulancia",
    scenario: "Una ambulancia recorre 12 cuadras hacia el sur y 16 cuadras hacia el oeste.",
    question: "¿Cuál sería la distancia directa desde el hospital al punto final?",
    options: ["20 cuadras", "28 cuadras", "4 cuadras", "192 cuadras"], answer: "20 cuadras",
    explanation: "12² + 16² = c² → 144 + 256 = 400 → c = 20."
  },
  {
    id: 16, type: "normal", title: "La antena del colegio",
    scenario: "Una antena mide 16 m. Un cable tensor llega al suelo a 12 m de la base.",
    question: "¿Cuánto mide el cable tensor?",
    options: ["20 m", "28 m", "4 m", "192 m"], answer: "20 m",
    explanation: "16² + 12² = c² → 256 + 144 = 400 → c = 20 m."
  },
  {
    id: 17, type: "normal", title: "El televisor",
    scenario: "La pantalla de un televisor mide 48 cm de ancho y 14 cm de alto.",
    question: "¿Cuál es la medida aproximada de su diagonal?",
    options: ["50 cm", "62 cm", "34 cm", "672 cm"], answer: "50 cm",
    explanation: "48² + 14² = c² → 2304 + 196 = 2500 → c = 50 cm."
  },
  {
    id: 18, type: "normal", title: "La ruta del ciclista",
    scenario: "Un ciclista avanza 27 m hacia el norte y 36 m hacia el este.",
    question: "¿Cuál es la distancia directa desde el punto inicial?",
    options: ["45 m", "63 m", "9 m", "972 m"], answer: "45 m",
    explanation: "27² + 36² = c² → 729 + 1296 = 2025 → c = 45 m."
  },
  {
    id: 19, type: "normal", title: "La lona del escenario",
    scenario: "Una lona rectangular mide 16 m de ancho y su diagonal mide 20 m.",
    question: "¿Cuánto mide la altura de la lona?",
    options: ["12 m", "36 m", "4 m", "18 m"], answer: "12 m",
    explanation: "16² + b² = 20² → 256 + b² = 400 → b² = 144 → b = 12 m."
  },
  {
    id: 20, type: "normal", title: "El parque de patinetas",
    scenario: "Una rampa mide 15 m de largo y su base horizontal mide 9 m.",
    question: "¿Qué altura alcanza la rampa?",
    options: ["12 m", "24 m", "6 m", "10 m"], answer: "12 m",
    explanation: "9² + b² = 15² → 81 + b² = 225 → b² = 144 → b = 12 m."
  },
  {
    id: 101, type: "bonus", title: "BONUS: El cable oculto",
    scenario: "Un cable mide 41 m. Está sujeto desde la punta de un poste hasta un punto en el suelo ubicado a 40 m de la base.",
    question: "¿Cuál es la altura del poste?",
    options: ["9 m", "1 m", "81 m", "29 m"], answer: "9 m",
    explanation: "b² + 40² = 41² → b² + 1600 = 1681 → b² = 81 → b = 9 m."
  },
  {
    id: 102, type: "bonus", title: "BONUS: Pantalla gigante",
    scenario: "Una pantalla tiene diagonal de 65 pulgadas y ancho de 56 pulgadas.",
    question: "¿Cuál es su altura aproximada?",
    options: ["33 pulgadas", "121 pulgadas", "9 pulgadas", "42 pulgadas"], answer: "33 pulgadas",
    explanation: "56² + b² = 65² → 3136 + b² = 4225 → b² = 1089 → b = 33."
  },
  {
    id: 103, type: "bonus", title: "BONUS: Triángulo escondido",
    scenario: "La hipotenusa de un triángulo rectángulo mide 85 cm y uno de sus catetos mide 77 cm.",
    question: "¿Cuánto mide el otro cateto?",
    options: ["36 cm", "162 cm", "8 cm", "54 cm"], answer: "36 cm",
    explanation: "77² + b² = 85² → 5929 + b² = 7225 → b² = 1296 → b = 36 cm."
  },
  {
    id: 104, type: "bonus", title: "BONUS: El mapa del tesoro",
    scenario: "Un tesoro está a 48 pasos hacia el este y luego en línea recta final aparece a 73 pasos desde el inicio.",
    question: "¿Cuántos pasos hacia el norte faltan?",
    options: ["55 pasos", "25 pasos", "121 pasos", "35 pasos"], answer: "55 pasos",
    explanation: "48² + b² = 73² → 2304 + b² = 5329 → b² = 3025 → b = 55 pasos."
  },
  {
    id: 105, type: "bonus", title: "BONUS: El techo inclinado",
    scenario: "Un techo inclinado mide 37 m desde el borde hasta la cumbrera. La distancia horizontal es de 35 m.",
    question: "¿Cuál es la altura del techo?",
    options: ["12 m", "72 m", "2 m", "16 m"], answer: "12 m",
    explanation: "35² + b² = 37² → 1225 + b² = 1369 → b² = 144 → b = 12 m."
  },
  {
    id: 106, type: "bonus", title: "BONUS: El dron de rescate",
    scenario: "Un dron está a 29 m en línea recta del operador. Horizontalmente se separó 20 m.",
    question: "¿A qué altura está el dron?",
    options: ["21 m", "49 m", "9 m", "25 m"], answer: "21 m",
    explanation: "20² + b² = 29² → 400 + b² = 841 → b² = 441 → b = 21 m."
  }
];

const MAX_QUESTIONS = 15;
const INITIAL_LIVES = 3;
const rooms = new Map();

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function createRoom(code){
  return {
    code,
    hostId:null,
    phase:"lobby",
    players:{},
    questionIndex:0,
    questions:[],
    answered:{},
    bonusWinner:null,
    pendingEffect:null,
    frozen:{},
    timer:null,
    questionEndsAt:null
  };
}

function publicRoom(room){
  return {
    code:room.code,
    phase:room.phase,
    players:Object.values(room.players).map(p => ({
      id:p.id, name:p.name, score:p.score, lives:p.lives, alive:p.alive, isHost:p.id===room.hostId
    })).sort((a,b)=>b.score-a.score),
    questionIndex:room.questionIndex,
    total:room.questions.length,
    currentQuestion: room.phase==="question" || room.phase==="effect" || room.phase==="answer" ? sanitizeQuestion(room.questions[room.questionIndex]) : null,
    questionEndsAt: room.questionEndsAt,
    bonusWinner: room.bonusWinner,
    pendingEffect: room.pendingEffect
  };
}

function sanitizeQuestion(q){
  if(!q) return null;
  return {
    id:q.id, type:q.type, title:q.title, scenario:q.scenario,
    question:q.question, options:q.options
  };
}

function emitRoom(room){
  io.to(room.code).emit("roomState", publicRoom(room));
}

function nextQuestion(room){
  room.answered = {};
  room.bonusWinner = null;
  room.pendingEffect = null;
  room.frozen = {};
  if(room.questionIndex >= room.questions.length){
    room.phase = "ended";
    emitRoom(room);
    return;
  }
  room.phase = "question";
  room.questionEndsAt = Date.now() + 45000;
  emitRoom(room);
  clearTimeout(room.timer);
  room.timer = setTimeout(()=>showAnswer(room), 45000);
}

function showAnswer(room){
  if(room.phase !== "question") return;
  room.phase = "answer";
  room.questionEndsAt = null;
  const q = room.questions[room.questionIndex];
  io.to(room.code).emit("answerReveal", {answer:q.answer, explanation:q.explanation});
  emitRoom(room);
  clearTimeout(room.timer);
  room.timer = setTimeout(()=>{
    room.questionIndex++;
    nextQuestion(room);
  }, 7000);
}

function startGame(room){
  const normal = shuffle(QUESTION_BANK.filter(q=>q.type==="normal"));
  const bonus = shuffle(QUESTION_BANK.filter(q=>q.type==="bonus"));
  const selected = [];
  for(let i=0;i<MAX_QUESTIONS;i++){
    if((i===4 || i===9 || i===14) && bonus.length) selected.push(bonus.shift());
    else selected.push(normal.shift());
  }
  room.questions = selected;
  room.questionIndex = 0;
  room.phase = "question";
  room.answered = {};
  Object.values(room.players).forEach(p=>{
    p.score = 0; p.lives = INITIAL_LIVES; p.alive = true;
  });
  nextQuestion(room);
}

function applyEffect(room, fromId, effect, targetId){
  const from = room.players[fromId];
  const target = room.players[targetId];
  if(!from || !target || !target.alive) return;
  if(effect === "life"){
    target.lives = Math.max(0, target.lives - 1);
    if(target.lives <= 0) target.alive = false;
    io.to(targetId).emit("effectNotice", "¡Un oponente te quitó una vida!");
  }
  if(effect === "freeze"){
    room.frozen[targetId] = Date.now() + 10000;
    io.to(targetId).emit("effectNotice", "¡Te congelaron 10 segundos! No podrás responder todavía.");
  }
  if(effect === "steal"){
    const amount = Math.min(150, target.score);
    target.score -= amount;
    from.score += amount;
    io.to(targetId).emit("effectNotice", "¡Un oponente te robó 150 puntos!");
  }
  room.pendingEffect = null;
  room.phase = "answer";
  const q = room.questions[room.questionIndex];
  io.to(room.code).emit("answerReveal", {answer:q.answer, explanation:q.explanation});
  emitRoom(room);
  clearTimeout(room.timer);
  room.timer = setTimeout(()=>{
    room.questionIndex++;
    nextQuestion(room);
  }, 7000);
}

io.on("connection", (socket)=>{
  socket.on("joinRoom", ({roomCode, name}, cb)=>{
    const code = (roomCode || "CLASE").trim().toUpperCase();
    const cleanName = (name || "Jugador").trim().slice(0,18);
    if(!rooms.has(code)) rooms.set(code, createRoom(code));
    const room = rooms.get(code);
    room.players[socket.id] = {id:socket.id, name:cleanName, score:0, lives:INITIAL_LIVES, alive:true};
    if(!room.hostId) room.hostId = socket.id;
    socket.join(code);
    socket.data.roomCode = code;
    cb && cb({ok:true, id:socket.id, code});
    emitRoom(room);
  });

  socket.on("startGame", ()=>{
    const room = rooms.get(socket.data.roomCode);
    if(!room || room.hostId !== socket.id) return;
    startGame(room);
  });

  socket.on("submitAnswer", ({answer})=>{
    const room = rooms.get(socket.data.roomCode);
    if(!room || room.phase !== "question") return;
    const p = room.players[socket.id];
    if(!p || !p.alive || room.answered[socket.id]) return;
    if(room.frozen[socket.id] && Date.now() < room.frozen[socket.id]){
      socket.emit("effectNotice", "Sigues congelado por unos segundos.");
      return;
    }
    const q = room.questions[room.questionIndex];
    const correct = answer === q.answer;
    room.answered[socket.id] = {answer, correct};
    if(correct){
      p.score += q.type === "bonus" ? 300 : 100;
      if(q.type === "bonus" && !room.bonusWinner){
        room.bonusWinner = socket.id;
        room.pendingEffect = {from:socket.id};
        room.phase = "effect";
        clearTimeout(room.timer);
        socket.emit("chooseEffect");
        emitRoom(room);
        return;
      }
    }else{
      p.lives -= 1;
      if(p.lives <= 0) p.alive = false;
    }
    emitRoom(room);
    const alive = Object.values(room.players).filter(x=>x.alive);
    const aliveAnswered = alive.every(x => room.answered[x.id]);
    if(alive.length && aliveAnswered) showAnswer(room);
  });

  socket.on("applyEffect", ({effect, targetId})=>{
    const room = rooms.get(socket.data.roomCode);
    if(!room || room.phase !== "effect" || !room.pendingEffect || room.pendingEffect.from !== socket.id) return;
    applyEffect(room, socket.id, effect, targetId);
  });

  socket.on("disconnect", ()=>{
    const code = socket.data.roomCode;
    if(!code || !rooms.has(code)) return;
    const room = rooms.get(code);
    delete room.players[socket.id];
    if(room.hostId === socket.id){
      const ids = Object.keys(room.players);
      room.hostId = ids[0] || null;
    }
    if(Object.keys(room.players).length === 0){
      clearTimeout(room.timer);
      rooms.delete(code);
    }else{
      emitRoom(room);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
  console.log(`Misión Pitágoras disponible en http://localhost:${PORT}`);
});
