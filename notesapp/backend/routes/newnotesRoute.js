import express from "express";
import { deletenoteController, getSinglenoteController, getnotesControlller, newnotesController, notesPhotoController, searchnotesController } from "../controllers/notescontrollers.js";


const router = express.Router();

//routes
//create new notes
router.post(
  "/New-notes", newnotesController
);

//get photo
router.get("/product-photo/:pid", notesPhotoController);

// get all notes
router.get(
  "/get-notes", getnotesControlller
);

//single note
router.get("/get-note/:slug", getSinglenoteController);

//delete notes
router.delete("/delete-note/:id", deletenoteController);

//search product
router.get("/search/:keyword", searchnotesController);


export default router; 