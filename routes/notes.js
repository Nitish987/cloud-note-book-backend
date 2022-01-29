import express from "express";
import { body } from "express-validator";
import { fetchnotes, addnote, updatenote, deletenote } from "../controllers/notes-controller.js";
import fetchuser from "../middlewares/fetchuser.js";

const router = express.Router();

router.get('/api/fetchnotes', fetchuser, fetchnotes); // fetch notes

router.post('/api/addnote', [
    body('title', 'Enter a valid title').isLength({min: 5}),
    body('description', 'Description must be of 10 characters').isLength({min: 10})
], fetchuser, addnote); // add note

router.put('/api/updatenote/:id', fetchuser, updatenote); // updating note
router.delete('/api/deletenote/:id', fetchuser, deletenote); // deleting note

export default router;