import { Request, Response } from "express";
import { Type, Note } from "../db/noteDb";   

//get all notes
export const GetAllNotes = async (req: Request, res: Response) => {
  try {
    const allNotes = await Note.find();
    
    return res.render("note",{allNotes});
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

// add note
export const AddNote = async (req: Request, res: Response) => {
  try {
    const data: Type = req.body;

    const note = new Note({
      title: data.title,
      content: data.content,
    });

    const newNote = await note.save();
    res.status(200).json({ newNote });
  } catch (error) {
    res.json(501).json({ err: error });
  }
};

//edit notes
export const EditNote = async (req: Request, res: Response) => {
  try {
    const data: Type = req.body;

    const editedNote = await Note.findByIdAndUpdate(
      { _id: data._id },
      {
        $set: {
          content: data.content,
          title: data.title,
        },
      },
      { new: true }
    );

    if (!editedNote) {
      return res.status(400).json({ err: "note not found" });
    }

    return res.status(200).json({ editedNote });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

//delete note
export const DeleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;  
    
    if (!id) {
      return res.status(400).json({ error: "No ID provided" });
    }

    const deletedNote = await Note.findByIdAndDelete(id);
    
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
