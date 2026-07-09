# Misión Pitágoras Multijugador

Juego interactivo para noveno año, Geometría: aplicación del Teorema de Pitágoras en situaciones cotidianas.

## Características
- Modo multijugador en tiempo real.
- Cada jugador entra con nombre de usuario.
- Todos compiten en la misma sala.
- Cada jugador inicia con 3 vidas.
- Si falla 3 veces, queda eliminado hasta la siguiente ronda.
- 15 preguntas por partida.
- Banco de 26 preguntas: 20 normales y 6 bonus.
- Preguntas bonus difíciles.
- Quien responde correctamente una bonus puede aplicar un efecto a un oponente:
  - Quitar 1 vida.
  - Congelar 10 segundos.
  - Robar 150 puntos.

## Cómo usarlo en clase

### Paso 1
Instalar Node.js en la computadora que funcionará como servidor.

### Paso 2
Abrir una terminal dentro de esta carpeta.

### Paso 3
Ejecutar:

npm install

### Paso 4
Ejecutar:

npm start

### Paso 5
Abrir en el navegador:

http://localhost:3000

### Para que entren otros compañeros
Si están en la misma red Wi-Fi, deben entrar desde sus dispositivos usando la IP de la computadora anfitriona:

http://IP-DE-LA-COMPUTADORA:3000

Ejemplo:

http://192.168.1.25:3000

### Para clase virtual con personas en diferentes lugares
Debe publicarse el servidor en un servicio en línea o usar un túnel temporal. 
El juego ya está preparado; solo necesita alojarse para que todos entren con el mismo enlace.

## Uso didáctico sugerido
Esta actividad corresponde a la Etapa 2: Movilización y aplicación de los conocimientos.
Después de explicar el Teorema de Pitágoras mediante GeoGebra, se aplica el juego para que los estudiantes resuelvan situaciones cotidianas y compitan de forma lúdica.
