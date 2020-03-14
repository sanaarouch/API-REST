const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schemaProfil = mongoose.Schema({
    prenom : String,
    nom : String ,
    status : Boolean,
    age : Number,
    email : String
});

// lier le schema à la collection = Modèle

const Profil = mongoose.model("profil", schemaProfil);

const schema = Joi.object({
    prenom : Joi.string().min(3).max(255).required(),
    nom : Joi.string().min(3).max(255).required(),
    status : Joi.boolean().required(),
    age : Joi.number().min(0).max(120).required(),
    email : Joi.string().email().required()
});

module.exports.schema = schema;
module.exports.Profil = Profil;