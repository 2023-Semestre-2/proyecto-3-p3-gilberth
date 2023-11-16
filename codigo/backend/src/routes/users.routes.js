import { Router } from "express";
import { addUser, updateUser, getUser, getAllUser, userLogin } from "../controllers/users.controller"; // Asegúrate de importar correctamente las funciones

const router = Router();

// Ruta para obtener la información de un usuario específico por su ID
router.get('/users/:UserID', getUser);

// Ruta para obtener la información de todos los usuarios
router.get('/users', getAllUser);

// Ruta para agregar un nuevo usuario
router.post('/users', addUser);

// Ruta para agregar un nuevo usuario
router.post('/users/Login', userLogin);

// Ruta para actualizar la información de un usuario existente
router.put('/users/:UserID', updateUser);

export default router;
