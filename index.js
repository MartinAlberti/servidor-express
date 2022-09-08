const express = require("express");
const fs = require('fs');


const PORT = process.env.PORT || 8080;

const app = express();

class Contenedor {
    constructor(name) {
        this.name = name
    }

    async GetAll() {

        try {
            let contenido = await fs.promises.readFile(`${this.name}`, "utf-8");
            let contenidoJson = JSON.parse(contenido);
            return contenidoJson;

        } catch (error) {
            console.log(error.message);
        }

    }

    async GetRandom() {
        try {
            let contenido = await this.GetAll();
            let productoRandom = contenido[Math.floor(Math.random() * contenido.length)];

            return productoRandom;


        } catch (error) {
            console.log(error.message);
        }
    }

}

let contenedor = new Contenedor("./productos.json");


app.get("/",  (req, res) => {
    res.send("<h1>Pagina de inicio</h1>");

})

app.get("/productos",  (req, res) => {
    contenedor.GetAll().then((productos) => res.send(productos));

})
app.get("/productoRandom",  (req, res) => {
    contenedor.GetRandom().then((productos) => res.send(productos));

})

app.get("*", (req, res) => {
    res.status(404).send(`<h1> La pagina que busca no existe </h1>`);
})


const conectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

conectedServer.on("error", (error) => {
    console.log(error.message);
})