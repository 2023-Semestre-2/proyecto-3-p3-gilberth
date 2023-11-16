import { Router } from "express";
import { addExchangeOffer, updateExchangeOfferStatus, getExchangeOffer, getAllExchangeOffer } from "../controllers/exchangeOffers.controller"; // Asegúrate de importar correctamente las funciones

const router = Router();

// Ruta para obtener la información de un usuario específico por su ID
router.get('/exchangeOffers/:OfferID', getExchangeOffer);

// Ruta para obtener la información de un usuario específico por su ID
router.get('/exchangeOffers', getAllExchangeOffer);

// Ruta para agregar un nuevo usuario
router.post('/exchangeOffers', addExchangeOffer);

// Ruta para actualizar la información de un usuario existente
router.put('/exchangeOffers', updateExchangeOfferStatus);

export default router;
