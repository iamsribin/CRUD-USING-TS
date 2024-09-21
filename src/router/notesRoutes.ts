import {AddNote, DeleteNote, EditNote, GetAllNotes} from "../controller/noteController";
import {Router} from "express";

const route = Router();

//get all notes
route.get("/",GetAllNotes);

// add note 
route.post("/add-note",AddNote);

//edit note
route.patch("/edit-note",EditNote);

//delete note
route.delete("/delete-note",DeleteNote);

export default route;