import { TableService } from "../services/tableService.js";

export class TableController {
    
    static async create(req,res){
        const response = await TableService.create(req.body)
        if (response.succes){ return res.status(201).json(response.table)}
        else if (response.errors.name === "ValidationError" ){res.status(400).json(response.errors)}
        else{res.status(500).json(response)}

    }
    
    static async get(req, res) {
        const response = await TableService.get()
        if (response.succes) { return res.status(200).json(response.tables) }
        res.status(500).json(response.errors)
    }

    static async getOne(req, res) {
        const response = await TableService.getOne(req.params.id)
        if (response.succes) { return res.status(200).json(response.table) }
        else if (response.errors.message === "IncorrectId") { return res.status(404).json(response.errors) }
        else { res.status(500).json(response.errors) }
    }

    static async update(req,res){
        const response = await TableService.update(req.params.id,req.body)
        if (response.succes){return res.status(200).json(response.table)}
        else if (response.errors.message==="IncorrectId"){return res.status(400).json(response.errors)}
        else{res.status(500).json(response.errors)}
    }

    static async delete(req,res){
        const response = await TableService.delete(req.params.id)
        if(response.succes){return res.status(200).json(response.message)}
        else if(response.errors.message ==="IncorrectId"){return res.status(400).json(response.errors)}
        else{res.status(500).json(response.errors)}
    }
}