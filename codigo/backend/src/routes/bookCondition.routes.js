import { Router } from "express";
import { getAllBookConditions} from "../controllers/bookCondition.controller"; // Asegúrate de importar correctamente las funciones

const router = Router();

// Ruta para obtener la información de un usuario específico por su ID
router.get('/bookCondition', getAllBookConditions);



export default router;
