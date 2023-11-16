import { Router } from "express";
import { addBook, updateBook, getBook, getAllBook } from "../controllers/books.controller"; // Asegúrate de importar correctamente las funciones

const router = Router();

// Ruta para obtener la información de un usuario específico por su ID
router.get('/books/:BookID', getBook);

// Ruta para obtener la información de un usuario específico por su ID
router.get('/books', getAllBook);

// Ruta para agregar un nuevo usuario
router.post('/books', addBook);

// Ruta para actualizar la información de un usuario existente
router.put('/books/:BookID', updateBook);

export default router;
