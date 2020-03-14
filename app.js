// jour5/router/profil.js

// ici nous allons régérer l'ensemble des requêtes http 
//que l'on peut faire à notre serveur sur la ressource profil

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routerRouter = require("./router/profil")

const app = express();
app.use(cors())
app.use(express.json())
app.use("/profil", routerRouter)


const urlBdd = "mongodb+srv://ifocop_admin:azerty1234@cluster0-0yrkh.mongodb.net/test?retryWrites=true&w=majority";
const optionConnexion = {
    useNewUrlParser : true ,
    useUnifiedTopology: true
}

mongoose.connect(urlBdd, optionConnexion)
        .then(function(){
            console.log("connexion établie avec la bdd")
        })
        .catch(function(err){
            console.log(err)
        })


const port = process.env.PORT || 2000;

app.listen(port, function(){
    console.log("server disponible sur le port" + port)
})

