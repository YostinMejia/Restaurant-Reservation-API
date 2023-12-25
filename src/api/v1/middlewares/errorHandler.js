import {Error} from "mongoose";
import { Registered,NotFound } from "../errors/errors.js";

export function errorHandler(err,req,res,next){

    if (err instanceof NotFound || err instanceof Registered){
        return  res.status(err.statusCode).send({ error: err.message, succes: false } )
    }
    if (err instanceof Error) {
        return  res.status(400).send({ error: err.message, succes: false } )
    }
    res.status(500).send({ error: err.message, succes: false } )
}