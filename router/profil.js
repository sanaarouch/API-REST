// jour5/router/profil.js

// ici nous allons régérer l'ensemble des requêtes http 
//que l'on peut faire à notre serveur sur la ressource profil

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// schema des données => colonnes

const { Profil , schema } = require("../modele/profil");


router.post("/", async function(req, res){
    // récupérer le body de la requête post
    const body = req.body;
    // vérifier quelle est conforme à ce que l'on attend
   
    const verif = schema.validate(body);
    // si ko => message et stop exécution
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return ;
    }
    // si ok => ajouter dans la base de données MOngo un nouvel enregistrement
    const profil = new Profil(body);
    const resultat = await profil.save(); // asychrone => attendre que Mongo écrive 
    res.send(resultat);
});

// récupérer tous les profils
router.get("/", async function(req, res){
    // récupérer tous les profils enregistrés dans la base de données
    const resultat = await Profil.find() ; // asychrone =>
    res.send(resultat);
});

// récupérer 1 seul profil 

router.get("/:id", async function(req, res){
    // récupérer l'id qui a été transmis dans l'url
    const id = req.params.id;

    // vérifier que l'id est conforme
    // on n'est plus que des chiffres de base 1, 2 ...
    // par défaut MongoDB va générer _id : 5e3a9499d4546a08dce679de
    // dans le support => Jour3 > Relations entre les documents > 5 > ObjectId du Driver de MongoDB
    // 5e3a9499d4546a08dce679de
    // 5e3a95803357f3684c3d99e6

    const verifID = mongoose.Types.ObjectId.isValid(id);
    //si l'id n'est pas conforme => 400 bad request et stop
    if(!verifID){
        res.status(400).send("id donné n'est pas conforme");
        return ;
    }
    //res.send(verifID);
    // vérifier qu'il y a bien un profil avec l'id recherché
    const resultat = await Profil.find({_id : id});
    // si il n'y a pas de profil => 404 Not Found et stop 
    if(resultat.length === 0){
        res.status(404).send("aucun enregistrement avec l'id "+ id);
        return ;
    }
    // si tout est ok, je retourne le profil concerné
    res.send(resultat);
});

// supprimer un enregistrement dans la base de données MongoDB online
router.delete("/:id", async function(req, res){
    // récupérer l'id
    const id = req.params.id ;
    // vérifier que l'id est conforme 
    // verifID = true || false 
    const verifID = mongoose.Types.ObjectId.isValid(id);
    // si non conforme => erreur 400 + stop + message
    if(!verifID){
        res.status(400).send("l'id transmis n'est pas conforme");
        return ;
    }
    // vérifier si il existe bien un engistrement avec id transmis dans l'url
    const resultat = await Profil.deleteOne({ _id : id});
    //res.send(resultat);

    /**
si c'est ok 
{
    "n": 1,
    "opTime": {
        "ts": "6789943596729499649",
        "t": 20
    },
    "electionId": "7fffffff0000000000000014",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6789943596729499649",
        "signature": {
            "hash": "pLcoyksPdAV4rQoQFLuioCH5WNI=",
            "keyId": "6725428983170596866"
        }
    },
    "operationTime": "6789943596729499649",
    "deletedCount": 1
}
     * 
     */
    // si il y en a pas => erreur 404 + message + stop

    if(resultat.deletedCount === 0){
        res.status(404).send("il n'existe pas d'enregistrement avec l'id" + id);
        return ;
    }

    // si tout est ok => effectuer la suppression
    // retourner un message la liste de tous les profils dans la base

    const reponse = await Profil.find();
    res.send(reponse);
})

// mis à jour d'un enregistrement dans la bdd MongoDB
router.put("/:id", async function(req,res){

    // récupérer l'id dans l'url
    const id = req.params.id ;
    // vérifier que l'id est conforme
    const verifID = mongoose.Types.ObjectId.isValid(id);
    // si c'est pas conforme : erreur 400 + message + stop

    if(!verifID){
        res.status(400).send("id non conforme !");
        return ;
    }
    // récupérer le body de la requête 
    const body = req.body ;
    // vérifier quelle est conforme 

    const verif = schema.validate(body); 
    // attention la variable schema est globale == disponible pour toutes les fonctions 
    // si non conforme : erreur 400 + message + stop 

    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }

    // est qu'il y a un enregistrement avec l'id transmis dans l'url

    const resultat = await Profil.findById(id);
    // si il n'y a pas d'enregistrement : erreur 404 + message + stop
    
    if(!resultat){
        res.status(404).send("aucun enregistrement trouvé pour l'id "+ id);
        return ;
    }
    // si tout ok alors effectuer la mis à jour 
    // retourner la liste des profils 

    resultat.prenom = body.prenom;
    resultat.nom = body.nom;
    resultat.status = body.status;
    resultat.age = body.age;
    resultat.email = body.email;

    const reponse = await resultat.save();

    res.send(reponse);

});



module.exports = router;