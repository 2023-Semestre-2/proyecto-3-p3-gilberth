import { Router } from "express";
import { getAllBookGenres} from "../controllers/bookGenre.controller"; // Asegúrate de importar correctamente las funciones

const router = Router();

// Ruta para obtener la información de un usuario específico por su ID
router.get('/bookGenre', getAllBookGenres);



export default router;
