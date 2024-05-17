import { Router } from "express";
import { getNotes, addNote, updateNote } from "../model/db_tables";

const router = Router()

router.get("/", async (req, res)=>{
    const notes= await getNotes()
    res.render("index", {noteList: notes, currently: null})
})

router.get("/:id", async (req, res)=>{
    const notes= await getNotes();
    const currentlyNote = await getNotes(id);
    if(!currentlyNote){
        res.render("error", {errorCode: 404, message: "given note not fount"})
    }
    res.render("index", {noteList: notes, currently: currentlyNote})
})

router.post("/", async (req, res)=>{

    if(req.body.title && req.body.body){
        const id = await addNote(title, body, owner);
        if(id){
            res.redirect('/');
        }
    }else{
        res.render("error", {errorCode: 401, message: "data is invalid"})
    }
})


router.put("/:id", async (req, res)=>{
    if(!req.params.id) return res.render("error", {errorCode: "401", message: "error: missing id in params"})
    const note = await getNotes(id); 
    if(!note) return res.render("error", {errorCode: "404", message: "note not fount"})
    if(req.body.title && req.body.body){
        updateNote(req.params.id, req.body.title, req.body.body);
        res.redirect('/');
    }else{
        res.render("error", {errorCode: 401, message: "data is invalid"})
    }
})

export default router;