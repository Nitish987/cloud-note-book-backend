import { validationResult } from "express-validator";
import Notes from "../models/Notes.js"

const fetchnotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.json(notes);
    } catch (error) {
        return res.status(500).send('Something went wrong.');
    }
}

const addnote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        });

        const addedNote = await note.save();
        return res.json(addedNote);

    } catch (error) {
        return res.status(500).send('Something went wrong.');
    }
}

const updatenote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};

        if(title) {
            newNote.title = title;
        }
        if(description) {
            newNote.description = description;
        }
        if(tag) {
            newNote.tag = tag;
        }

        let note = await Notes.findById({_id: req.params.id});
        if(!note) {
            return res.status(404).send("note not found");
        }

        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("updation not allowed");
        }

        note = await Notes.findByIdAndUpdate({_id: req.params.id }, {$set: newNote}, {new: true});
        return res.json(note);

    } catch(error) {
        return res.status(500).send('Something went wrong.');
    }
}

const deletenote = async (req, res) => {
    try {
        let note = await Notes.findById({_id: req.params.id});
        if(!note) {
            return res.status(404).send("note not found");
        }

        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("deletion not allowed");
        }

        note = await Notes.findByIdAndDelete({_id: req.params.id });
        return res.json({message: `${note.id} has been deleted`});

    } catch(error) {
        return res.status(500).send('Something went wrong.');
    }
}

export { fetchnotes, addnote, updatenote, deletenote }