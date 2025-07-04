const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('¡Hola Mundo! Esta es mi aplicación corriendo en un contenedor Docker.');
});

app.listen(PORT, () => {
    console.log(`La aplicación está escuchando el puerto ${PORT}`);
});