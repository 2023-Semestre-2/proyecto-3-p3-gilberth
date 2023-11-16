import { Router } from "express";
import { getAllBookStatus} from "../controllers/bookStatus.controller"; // Asegúrate de importar correctamente las funciones

const router = Router();

// Ruta para obtener la información de un usuario específico por su ID
router.get('/bookStatus', getAllBookStatus);



export default router;
