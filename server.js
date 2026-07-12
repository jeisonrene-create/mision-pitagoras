
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  const publicIndex = path.join(__dirname, "public", "index.html");
  const rootIndex = path.join(__dirname, "index.html");
  res.sendFile(publicIndex, (err) => {
    if (err) res.sendFile(rootIndex);
  });
});

const QUESTION_BANK = [
  {
    id:1,type:"normal",title:"La tirolesa del campamento",scene:"zipline",target:"hypotenuse",
    scenario:"En un campamento se instala una tirolesa desde una plataforma de 12 m de altura hasta un punto en el suelo ubicado a 16 m de la base.",
    question:"¿Cuánto mide el cable de la tirolesa?",
    options:["20 m","28 m","14 m","192 m"],answer:"20 m",
    explanation:"Se busca la hipotenusa: 12² + 16² = c² → 144 + 256 = 400 → c = 20 m.",
    visual:{base:"16 m",height:"12 m",hyp:"?",unit:"m"}
  },
  {
    id:2,type:"normal",title:"Altura alcanzada por la escalera",scene:"ladder",target:"height",
    scenario:"Una escalera de 10 m se apoya en una pared. La base queda a 6 m de la pared.",
    question:"¿A qué altura de la pared llega la escalera?",
    options:["8 m","16 m","4 m","12 m"],answer:"8 m",
    explanation:"Se busca un cateto: 6² + h² = 10² → 36 + h² = 100 → h² = 64 → h = 8 m.",
    visual:{base:"6 m",height:"?",hyp:"10 m",unit:"m"}
  },
  {
    id:3,type:"normal",title:"Diagonal de una pantalla de cine",scene:"screen",target:"hypotenuse",
    scenario:"Una pantalla rectangular mide 9 m de ancho y 12 m de alto.",
    question:"¿Cuánto mide la diagonal de la pantalla?",
    options:["15 m","21 m","108 m","3 m"],answer:"15 m",
    explanation:"Se busca la diagonal: 9² + 12² = c² → 81 + 144 = 225 → c = 15 m.",
    visual:{base:"9 m",height:"12 m",hyp:"?",unit:"m"}
  },
  {
    id:4,type:"normal",title:"Base de una rampa escolar",scene:"ramp",target:"base",
    scenario:"Una rampa mide 13 m de largo y alcanza una altura de 5 m.",
    question:"¿Cuál es la distancia horizontal desde el inicio de la rampa hasta la base de la altura?",
    options:["12 m","18 m","8 m","10 m"],answer:"12 m",
    explanation:"Se busca un cateto: b² + 5² = 13² → b² + 25 = 169 → b² = 144 → b = 12 m.",
    visual:{base:"?",height:"5 m",hyp:"13 m",unit:"m"}
  },
  {
    id:5,type:"normal",title:"El atajo del mensajero",scene:"route",target:"hypotenuse",
    scenario:"Un mensajero avanza 8 cuadras al norte y 15 cuadras al este.",
    question:"¿Cuál sería la distancia directa desde el inicio hasta el destino?",
    options:["23 cuadras","17 cuadras","7 cuadras","120 cuadras"],answer:"17 cuadras",
    explanation:"Se busca la hipotenusa: 8² + 15² = c² → 64 + 225 = 289 → c = 17 cuadras.",
    visual:{base:"15 cuadras",height:"8 cuadras",hyp:"?",unit:"cuadras"}
  },
  {
    id:6,type:"normal",title:"Altura del poste con cable",scene:"cable",target:"height",
    scenario:"Un cable de 17 m se sostiene desde la punta de un poste hasta el suelo, a 8 m de la base del poste.",
    question:"¿Cuál es la altura del poste?",
    options:["15 m","25 m","9 m","12 m"],answer:"15 m",
    explanation:"Se busca un cateto: h² + 8² = 17² → h² + 64 = 289 → h² = 225 → h = 15 m.",
    visual:{base:"8 m",height:"?",hyp:"17 m",unit:"m"}
  },
  {
    id:7,type:"normal",title:"Diagonal de una cancha comunal",scene:"field",target:"hypotenuse",
    scenario:"Una cancha rectangular mide 18 m de ancho y 24 m de largo.",
    question:"¿Cuánto mide la diagonal de la cancha?",
    options:["30 m","42 m","6 m","432 m"],answer:"30 m",
    explanation:"Se busca la diagonal: 18² + 24² = c² → 324 + 576 = 900 → c = 30 m.",
    visual:{base:"24 m",height:"18 m",hyp:"?",unit:"m"}
  },
  {
    id:8,type:"normal",title:"Altura de un techo inclinado",scene:"roof",target:"height",
    scenario:"Un techo inclinado mide 37 m desde el borde hasta la cumbrera. La distancia horizontal es de 35 m.",
    question:"¿Cuál es la altura del techo?",
    options:["12 m","72 m","2 m","16 m"],answer:"12 m",
    explanation:"Se busca un cateto: 35² + h² = 37² → 1225 + h² = 1369 → h² = 144 → h = 12 m.",
    visual:{base:"35 m",height:"?",hyp:"37 m",unit:"m"}
  },
  {
    id:9,type:"normal",title:"La maleta en diagonal",scene:"suitcase",target:"hypotenuse",
    scenario:"Una maleta rectangular tiene 30 cm de ancho y 40 cm de alto.",
    question:"¿Cuál es la diagonal frontal de la maleta?",
    options:["50 cm","70 cm","10 cm","1200 cm"],answer:"50 cm",
    explanation:"Se busca la diagonal: 30² + 40² = c² → 900 + 1600 = 2500 → c = 50 cm.",
    visual:{base:"30 cm",height:"40 cm",hyp:"?",unit:"cm"}
  },
  {
    id:10,type:"normal",title:"Ancho de un portón",scene:"gate",target:"base",
    scenario:"La diagonal de un portón rectangular mide 10 m y su altura es de 8 m.",
    question:"¿Cuánto mide el ancho del portón?",
    options:["6 m","18 m","2 m","12 m"],answer:"6 m",
    explanation:"Se busca un cateto: b² + 8² = 10² → b² + 64 = 100 → b² = 36 → b = 6 m.",
    visual:{base:"?",height:"8 m",hyp:"10 m",unit:"m"}
  },
  {
    id:11,type:"normal",title:"Dron sobre el parque",scene:"drone",target:"hypotenuse",
    scenario:"Un dron se desplaza 20 m al este y luego 15 m al norte.",
    question:"¿Cuál es la distancia directa desde su punto inicial?",
    options:["25 m","35 m","5 m","300 m"],answer:"25 m",
    explanation:"Se busca la hipotenusa: 20² + 15² = c² → 400 + 225 = 625 → c = 25 m.",
    visual:{base:"20 m",height:"15 m",hyp:"?",unit:"m"}
  },
  {
    id:12,type:"normal",title:"Separación horizontal de una antena",scene:"antenna",target:"base",
    scenario:"Un cable tensor mide 25 m y está sujeto a la punta de una antena de 7 m.",
    question:"¿A qué distancia de la base de la antena está sujeto el cable en el suelo?",
    options:["24 m","18 m","32 m","625 m"],answer:"24 m",
    explanation:"Se busca un cateto: b² + 7² = 25² → b² + 49 = 625 → b² = 576 → b = 24 m.",
    visual:{base:"?",height:"7 m",hyp:"25 m",unit:"m"}
  },
  {
    id:13,type:"normal",title:"El rescate en el río",scene:"river",target:"hypotenuse",
    scenario:"Un rescatista avanza 10 m hacia el norte y 24 m hacia el este para llegar a una persona.",
    question:"¿Cuál es la distancia directa entre el punto inicial y la persona?",
    options:["26 m","34 m","14 m","240 m"],answer:"26 m",
    explanation:"Se busca la hipotenusa: 10² + 24² = c² → 100 + 576 = 676 → c = 26 m.",
    visual:{base:"24 m",height:"10 m",hyp:"?",unit:"m"}
  },
  {
    id:14,type:"normal",title:"Altura de una rampa de patinetas",scene:"skate",target:"height",
    scenario:"Una rampa de patinetas mide 15 m de largo y su base horizontal mide 9 m.",
    question:"¿Qué altura alcanza la rampa?",
    options:["12 m","24 m","6 m","10 m"],answer:"12 m",
    explanation:"Se busca un cateto: 9² + h² = 15² → 81 + h² = 225 → h² = 144 → h = 12 m.",
    visual:{base:"9 m",height:"?",hyp:"15 m",unit:"m"}
  },
  {
    id:15,type:"normal",title:"Diagonal de un cuadro",scene:"frame",target:"hypotenuse",
    scenario:"Un cuadro rectangular mide 45 cm de ancho y 60 cm de alto.",
    question:"¿Cuánto mide su diagonal?",
    options:["75 cm","105 cm","15 cm","2700 cm"],answer:"75 cm",
    explanation:"Se busca la diagonal: 45² + 60² = c² → 2025 + 3600 = 5625 → c = 75 cm.",
    visual:{base:"45 cm",height:"60 cm",hyp:"?",unit:"cm"}
  },
  {
    id:16,type:"normal",title:"Altura de una pantalla gigante",scene:"screen",target:"height",
    scenario:"Una pantalla gigante tiene una diagonal de 65 pulgadas y un ancho de 56 pulgadas.",
    question:"¿Cuál es su altura?",
    options:["33 pulgadas","121 pulgadas","9 pulgadas","42 pulgadas"],answer:"33 pulgadas",
    explanation:"Se busca un cateto: 56² + h² = 65² → 3136 + h² = 4225 → h² = 1089 → h = 33 pulgadas.",
    visual:{base:"56 pulg",height:"?",hyp:"65 pulg",unit:"pulgadas"}
  },
  {
    id:17,type:"normal",title:"Ruta de la ambulancia",scene:"ambulance",target:"hypotenuse",
    scenario:"Una ambulancia recorre 12 cuadras hacia el sur y 16 cuadras hacia el oeste.",
    question:"¿Cuál sería la distancia directa desde el hospital al punto final?",
    options:["20 cuadras","28 cuadras","4 cuadras","192 cuadras"],answer:"20 cuadras",
    explanation:"Se busca la hipotenusa: 12² + 16² = c² → 144 + 256 = 400 → c = 20 cuadras.",
    visual:{base:"16 cuadras",height:"12 cuadras",hyp:"?",unit:"cuadras"}
  },
  {
    id:18,type:"normal",title:"Distancia al muro",scene:"ladder",target:"base",
    scenario:"Una escalera de 13 m llega a una altura de 12 m en una pared.",
    question:"¿A qué distancia de la pared está la base de la escalera?",
    options:["5 m","25 m","1 m","7 m"],answer:"5 m",
    explanation:"Se busca un cateto: b² + 12² = 13² → b² + 144 = 169 → b² = 25 → b = 5 m.",
    visual:{base:"?",height:"12 m",hyp:"13 m",unit:"m"}
  },
  {
    id:19,type:"normal",title:"Diagonal de un terreno",scene:"land",target:"hypotenuse",
    scenario:"Un terreno rectangular mide 21 m de frente y 28 m de fondo.",
    question:"¿Cuánto mide la diagonal del terreno?",
    options:["35 m","49 m","7 m","588 m"],answer:"35 m",
    explanation:"Se busca la diagonal: 21² + 28² = c² → 441 + 784 = 1225 → c = 35 m.",
    visual:{base:"28 m",height:"21 m",hyp:"?",unit:"m"}
  },
  {
    id:20,type:"normal",title:"Altura del dron de rescate",scene:"drone",target:"height",
    scenario:"Un dron está a 29 m en línea recta del operador. Horizontalmente se separó 20 m.",
    question:"¿A qué altura está el dron?",
    options:["21 m","49 m","9 m","25 m"],answer:"21 m",
    explanation:"Se busca un cateto: 20² + h² = 29² → 400 + h² = 841 → h² = 441 → h = 21 m.",
    visual:{base:"20 m",height:"?",hyp:"29 m",unit:"m"}
  },
  {
    id:21,type:"normal",title:"Cable del asta de bandera",scene:"flag",target:"hypotenuse",
    scenario:"Un asta de bandera mide 10 m. Desde la punta se coloca una cuerda hasta un punto en el suelo ubicado a 24 m de la base.",
    question:"¿Cuánto mide la cuerda?",
    options:["26 m","34 m","14 m","240 m"],answer:"26 m",
    explanation:"Se busca la hipotenusa: 10² + 24² = c² → 100 + 576 = 676 → c = 26 m.",
    visual:{base:"24 m",height:"10 m",hyp:"?",unit:"m"}
  },
  {
    id:22,type:"normal",title:"Largo de una lona",scene:"frame",target:"base",
    scenario:"Una lona rectangular tiene una diagonal de 20 m y una altura de 12 m.",
    question:"¿Cuánto mide el largo de la lona?",
    options:["16 m","32 m","8 m","24 m"],answer:"16 m",
    explanation:"Se busca un cateto: b² + 12² = 20² → b² + 144 = 400 → b² = 256 → b = 16 m.",
    visual:{base:"?",height:"12 m",hyp:"20 m",unit:"m"}
  },
  {
    id:23,type:"normal",title:"Camino directo del ciclista",scene:"bike",target:"hypotenuse",
    scenario:"Un ciclista avanza 27 m hacia el norte y 36 m hacia el este.",
    question:"¿Cuál es la distancia directa desde el punto inicial?",
    options:["45 m","63 m","9 m","972 m"],answer:"45 m",
    explanation:"Se busca la hipotenusa: 27² + 36² = c² → 729 + 1296 = 2025 → c = 45 m.",
    visual:{base:"36 m",height:"27 m",hyp:"?",unit:"m"}
  },
  {
    id:24,type:"normal",title:"Altura de un anuncio",scene:"billboard",target:"height",
    scenario:"La diagonal de un anuncio rectangular mide 25 m y su base mide 24 m.",
    question:"¿Cuál es la altura del anuncio?",
    options:["7 m","49 m","1 m","12 m"],answer:"7 m",
    explanation:"Se busca un cateto: 24² + h² = 25² → 576 + h² = 625 → h² = 49 → h = 7 m.",
    visual:{base:"24 m",height:"?",hyp:"25 m",unit:"m"}
  },
  {
    id:25,type:"normal",title:"Diagonal de una tablet",scene:"tablet",target:"hypotenuse",
    scenario:"La pantalla de una tablet mide 8 pulgadas de ancho y 15 pulgadas de alto.",
    question:"¿Cuánto mide la diagonal?",
    options:["17 pulgadas","23 pulgadas","7 pulgadas","120 pulgadas"],answer:"17 pulgadas",
    explanation:"Se busca la diagonal: 8² + 15² = c² → 64 + 225 = 289 → c = 17 pulgadas.",
    visual:{base:"8 pulg",height:"15 pulg",hyp:"?",unit:"pulgadas"}
  },
  {
    id:26,type:"normal",title:"Base de una carpa",scene:"tent",target:"base",
    scenario:"El lado inclinado de una carpa mide 10 m y la altura central es de 8 m.",
    question:"¿Qué distancia horizontal hay desde el centro de la carpa hasta un extremo?",
    options:["6 m","18 m","2 m","12 m"],answer:"6 m",
    explanation:"Se busca un cateto: b² + 8² = 10² → b² + 64 = 100 → b² = 36 → b = 6 m.",
    visual:{base:"?",height:"8 m",hyp:"10 m",unit:"m"}
  },
  {
    id:27,type:"normal",title:"Ruta entre dos edificios",scene:"city",target:"hypotenuse",
    scenario:"Para ir de un edificio a otro se caminan 5 cuadras al este y 12 cuadras al norte.",
    question:"¿Cuál sería la distancia directa entre los edificios?",
    options:["13 cuadras","17 cuadras","7 cuadras","60 cuadras"],answer:"13 cuadras",
    explanation:"Se busca la hipotenusa: 5² + 12² = c² → 25 + 144 = 169 → c = 13 cuadras.",
    visual:{base:"5 cuadras",height:"12 cuadras",hyp:"?",unit:"cuadras"}
  },
  {
    id:28,type:"normal",title:"Altura de una torre de juegos",scene:"tower",target:"height",
    scenario:"Un tobogán recto mide 26 m y llega al suelo a 24 m de la base de la torre.",
    question:"¿Qué altura tiene la torre?",
    options:["10 m","50 m","2 m","14 m"],answer:"10 m",
    explanation:"Se busca un cateto: h² + 24² = 26² → h² + 576 = 676 → h² = 100 → h = 10 m.",
    visual:{base:"24 m",height:"?",hyp:"26 m",unit:"m"}
  },
  {
    id:29,type:"normal",title:"Diagonal de una puerta",scene:"door",target:"hypotenuse",
    scenario:"Una puerta mide 80 cm de ancho y 150 cm de alto.",
    question:"¿Cuánto mide su diagonal?",
    options:["170 cm","230 cm","70 cm","12000 cm"],answer:"170 cm",
    explanation:"Se busca la diagonal: 80² + 150² = c² → 6400 + 22500 = 28900 → c = 170 cm.",
    visual:{base:"80 cm",height:"150 cm",hyp:"?",unit:"cm"}
  },
  {
    id:30,type:"normal",title:"Ancho de una ventana",scene:"window",target:"base",
    scenario:"Una ventana tiene diagonal de 50 cm y altura de 40 cm.",
    question:"¿Cuánto mide el ancho de la ventana?",
    options:["30 cm","90 cm","10 cm","45 cm"],answer:"30 cm",
    explanation:"Se busca un cateto: b² + 40² = 50² → b² + 1600 = 2500 → b² = 900 → b = 30 cm.",
    visual:{base:"?",height:"40 cm",hyp:"50 cm",unit:"cm"}
  },
  {
    id:31,type:"bonus",title:"BONUS: Cable oculto del poste",scene:"cable",target:"height",
    scenario:"Un cable mide 41 m. Está sujeto desde la punta de un poste hasta un punto en el suelo ubicado a 40 m de la base.",
    question:"¿Cuál es la altura del poste?",
    options:["9 m","1 m","81 m","29 m"],answer:"9 m",
    explanation:"Se busca un cateto: h² + 40² = 41² → h² + 1600 = 1681 → h² = 81 → h = 9 m.",
    visual:{base:"40 m",height:"?",hyp:"41 m",unit:"m"}
  },
  {
    id:32,type:"bonus",title:"BONUS: Mapa del tesoro",scene:"treasure",target:"height",
    scenario:"Un tesoro está a 73 pasos en línea recta. El mapa indica avanzar 48 pasos hacia el este.",
    question:"¿Cuántos pasos hacia el norte faltan?",
    options:["55 pasos","25 pasos","121 pasos","35 pasos"],answer:"55 pasos",
    explanation:"Se busca un cateto: 48² + h² = 73² → 2304 + h² = 5329 → h² = 3025 → h = 55 pasos.",
    visual:{base:"48 pasos",height:"?",hyp:"73 pasos",unit:"pasos"}
  },
  {
    id:33,type:"bonus",title:"BONUS: Triángulo escondido",scene:"default",target:"base",
    scenario:"La hipotenusa de un triángulo rectángulo mide 85 cm y uno de sus catetos mide 77 cm.",
    question:"¿Cuánto mide el otro cateto?",
    options:["36 cm","162 cm","8 cm","54 cm"],answer:"36 cm",
    explanation:"Se busca un cateto: b² + 77² = 85² → b² + 5929 = 7225 → b² = 1296 → b = 36 cm.",
    visual:{base:"?",height:"77 cm",hyp:"85 cm",unit:"cm"}
  },
  {
    id:34,type:"bonus",title:"BONUS: Altura de pantalla profesional",scene:"screen",target:"height",
    scenario:"Una pantalla tiene diagonal de 65 pulgadas y ancho de 56 pulgadas.",
    question:"¿Cuál es su altura?",
    options:["33 pulgadas","121 pulgadas","9 pulgadas","42 pulgadas"],answer:"33 pulgadas",
    explanation:"Se busca un cateto: 56² + h² = 65² → 3136 + h² = 4225 → h² = 1089 → h = 33 pulgadas.",
    visual:{base:"56 pulg",height:"?",hyp:"65 pulg",unit:"pulgadas"}
  },
  {
    id:35,type:"bonus",title:"BONUS: Techo inclinado",scene:"roof",target:"height",
    scenario:"Un techo inclinado mide 37 m desde el borde hasta la cumbrera. La distancia horizontal es de 35 m.",
    question:"¿Cuál es la altura del techo?",
    options:["12 m","72 m","2 m","16 m"],answer:"12 m",
    explanation:"Se busca un cateto: 35² + h² = 37² → 1225 + h² = 1369 → h² = 144 → h = 12 m.",
    visual:{base:"35 m",height:"?",hyp:"37 m",unit:"m"}
  },
  {
    id:36,type:"bonus",title:"BONUS: Dron de rescate",scene:"drone",target:"height",
    scenario:"Un dron está a 29 m en línea recta del operador. Horizontalmente se separó 20 m.",
    question:"¿A qué altura está el dron?",
    options:["21 m","49 m","9 m","25 m"],answer:"21 m",
    explanation:"Se busca un cateto: 20² + h² = 29² → 400 + h² = 841 → h² = 441 → h = 21 m.",
    visual:{base:"20 m",height:"?",hyp:"29 m",unit:"m"}
  },
  {
    id:37,type:"bonus",title:"BONUS: Diagonal de escenario",scene:"stage",target:"hypotenuse",
    scenario:"Un escenario rectangular mide 33 m de largo y 56 m de ancho.",
    question:"¿Cuánto mide la diagonal del escenario?",
    options:["65 m","89 m","23 m","1848 m"],answer:"65 m",
    explanation:"Se busca la hipotenusa: 33² + 56² = c² → 1089 + 3136 = 4225 → c = 65 m.",
    visual:{base:"56 m",height:"33 m",hyp:"?",unit:"m"}
  },
  {
    id:38,type:"bonus",title:"BONUS: Base de torre de comunicaciones",scene:"antenna",target:"base",
    scenario:"Un cable tensor de 61 m sostiene una torre de 11 m de altura.",
    question:"¿A qué distancia de la base de la torre se fija el cable en el suelo?",
    options:["60 m","72 m","50 m","55 m"],answer:"60 m",
    explanation:"Se busca un cateto: b² + 11² = 61² → b² + 121 = 3721 → b² = 3600 → b = 60 m.",
    visual:{base:"?",height:"11 m",hyp:"61 m",unit:"m"}
  },
  {
    id:39,type:"bonus",title:"BONUS: Diagonal de mural",scene:"frame",target:"hypotenuse",
    scenario:"Un mural rectangular mide 39 dm de ancho y 52 dm de alto.",
    question:"¿Cuánto mide la diagonal del mural?",
    options:["65 dm","91 dm","13 dm","2028 dm"],answer:"65 dm",
    explanation:"Se busca la hipotenusa: 39² + 52² = c² → 1521 + 2704 = 4225 → c = 65 dm.",
    visual:{base:"39 dm",height:"52 dm",hyp:"?",unit:"dm"}
  },
  {
    id:40,type:"bonus",title:"BONUS: Altura de carpa gigante",scene:"tent",target:"height",
    scenario:"El lado inclinado de una carpa mide 25 m y desde el centro hasta el extremo hay 7 m.",
    question:"¿Cuál es la altura central de la carpa?",
    options:["24 m","18 m","32 m","20 m"],answer:"24 m",
    explanation:"Se busca un cateto: 7² + h² = 25² → 49 + h² = 625 → h² = 576 → h = 24 m.",
    visual:{base:"7 m",height:"?",hyp:"25 m",unit:"m"}
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
    code, hostId:null, phase:"lobby", players:{}, questionIndex:0,
    questions:[], answered:{}, bonusWinner:null, pendingEffect:null,
    frozen:{}, timer:null, questionEndsAt:null
  };
}
function sanitizeQuestion(q){
  if(!q) return null;
  return {
    id:q.id,type:q.type,title:q.title,scene:q.scene,target:q.target,
    scenario:q.scenario,question:q.question,options:q.options,visual:q.visual
  };
}
function publicRoom(room){
  return {
    code:room.code, phase:room.phase,
    players:Object.values(room.players).map(p=>({
      id:p.id,name:p.name,score:p.score,lives:p.lives,alive:p.alive,isHost:p.id===room.hostId
    })).sort((a,b)=>b.score-a.score),
    questionIndex:room.questionIndex,total:room.questions.length,
    currentQuestion:(room.phase==="question"||room.phase==="effect"||room.phase==="answer") ? sanitizeQuestion(room.questions[room.questionIndex]) : null,
    questionEndsAt:room.questionEndsAt,bonusWinner:room.bonusWinner,pendingEffect:room.pendingEffect
  };
}
function emitRoom(room){ io.to(room.code).emit("roomState", publicRoom(room)); }
function nextQuestion(room){
  room.answered={};room.bonusWinner=null;room.pendingEffect=null;room.frozen={};
  if(room.questionIndex>=room.questions.length){room.phase="ended";emitRoom(room);return;}
  room.phase="question";
  room.questionEndsAt=Date.now()+120000;
  emitRoom(room);
  clearTimeout(room.timer);
  room.timer=setTimeout(()=>showAnswer(room),120000);
}
function showAnswer(room){
  if(room.phase!=="question") return;
  room.phase="answer";
  room.questionEndsAt=null;
  const q=room.questions[room.questionIndex];
  io.to(room.code).emit("answerReveal",{answer:q.answer,explanation:q.explanation});
  emitRoom(room);
  clearTimeout(room.timer);
  room.timer=setTimeout(()=>{room.questionIndex++;nextQuestion(room);},7000);
}
function startGame(room){
  const normalHyp = shuffle(QUESTION_BANK.filter(q=>q.type==="normal" && q.target==="hypotenuse"));
  const normalCat = shuffle(QUESTION_BANK.filter(q=>q.type==="normal" && q.target!=="hypotenuse"));
  const bonus = shuffle(QUESTION_BANK.filter(q=>q.type==="bonus"));
  const selected=[];
  for(let i=0;i<MAX_QUESTIONS;i++){
    if((i===4 || i===9 || i===14) && bonus.length) selected.push(bonus.shift());
    else if(i%2===0 && normalHyp.length) selected.push(normalHyp.shift());
    else if(normalCat.length) selected.push(normalCat.shift());
    else if(normalHyp.length) selected.push(normalHyp.shift());
  }
  room.questions=selected;
  room.questionIndex=0;
  Object.values(room.players).forEach(p=>{p.score=0;p.lives=INITIAL_LIVES;p.alive=true;});
  nextQuestion(room);
}
function applyEffect(room, fromId, effect, targetId){
  const from=room.players[fromId], target=room.players[targetId];
  if(!from||!target||!target.alive) return;
  if(effect==="life"){
    target.lives=Math.max(0,target.lives-1);
    if(target.lives<=0) target.alive=false;
    io.to(targetId).emit("effectNotice","¡Un oponente te quitó una vida!");
  }
  if(effect==="freeze"){
    room.frozen[targetId]=Date.now()+10000;
    io.to(targetId).emit("effectNotice","¡Te congelaron 10 segundos! No podrás responder todavía.");
  }
  if(effect==="steal"){
    const amount=Math.min(150,target.score);
    target.score-=amount; from.score+=amount;
    io.to(targetId).emit("effectNotice","¡Un oponente te robó 150 puntos!");
  }
  room.pendingEffect=null; room.phase="answer";
  const q=room.questions[room.questionIndex];
  io.to(room.code).emit("answerReveal",{answer:q.answer,explanation:q.explanation});
  emitRoom(room);
  clearTimeout(room.timer);
  room.timer=setTimeout(()=>{room.questionIndex++;nextQuestion(room);},7000);
}

io.on("connection",(socket)=>{
  socket.on("joinRoom",({roomCode,name},cb)=>{
    const code=(roomCode||"CLASE").trim().toUpperCase();
    const cleanName=(name||"Jugador").trim().slice(0,18);
    if(!rooms.has(code)) rooms.set(code,createRoom(code));
    const room=rooms.get(code);
    room.players[socket.id]={id:socket.id,name:cleanName,score:0,lives:INITIAL_LIVES,alive:true};
    if(!room.hostId) room.hostId=socket.id;
    socket.join(code); socket.data.roomCode=code;
    cb && cb({ok:true,id:socket.id,code});
    emitRoom(room);
  });
  socket.on("startGame",()=>{
    const room=rooms.get(socket.data.roomCode);
    if(!room || room.hostId!==socket.id) return;
    startGame(room);
  });
  socket.on("submitAnswer",({answer})=>{
    const room=rooms.get(socket.data.roomCode);
    if(!room || room.phase!=="question") return;
    const p=room.players[socket.id];
    if(!p || !p.alive || room.answered[socket.id]) return;
    if(room.frozen[socket.id] && Date.now()<room.frozen[socket.id]){
      socket.emit("effectNotice","Sigues congelado por unos segundos.");
      return;
    }
    const q=room.questions[room.questionIndex];
    const correct=answer===q.answer;
    room.answered[socket.id]={answer,correct};
    if(correct){
      p.score += q.type==="bonus" ? 300 : 100;
      if(q.type==="bonus" && !room.bonusWinner){
        room.bonusWinner=socket.id;
        room.pendingEffect={from:socket.id};
        room.phase="effect";
        clearTimeout(room.timer);
        socket.emit("chooseEffect");
        emitRoom(room);
        return;
      }
    }else{
      p.lives-=1;
      if(p.lives<=0) p.alive=false;
    }
    emitRoom(room);
    const alive=Object.values(room.players).filter(x=>x.alive);
    const aliveAnswered=alive.every(x=>room.answered[x.id]);
    if(alive.length && aliveAnswered) showAnswer(room);
  });
  socket.on("applyEffect",({effect,targetId})=>{
    const room=rooms.get(socket.data.roomCode);
    if(!room || room.phase!=="effect" || !room.pendingEffect || room.pendingEffect.from!==socket.id) return;
    applyEffect(room,socket.id,effect,targetId);
  });
  socket.on("disconnect",()=>{
    const code=socket.data.roomCode;
    if(!code || !rooms.has(code)) return;
    const room=rooms.get(code);
    delete room.players[socket.id];
    if(room.hostId===socket.id){
      const ids=Object.keys(room.players);
      room.hostId=ids[0] || null;
    }
    if(Object.keys(room.players).length===0){
      clearTimeout(room.timer);
      rooms.delete(code);
    }else emitRoom(room);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log(`Misión Pitágoras disponible en puerto ${PORT}`));
