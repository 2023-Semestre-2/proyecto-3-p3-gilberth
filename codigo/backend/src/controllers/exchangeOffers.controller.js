import {getConnection, sql} from '../database/connection'


export const addExchangeOffer = async (req, res) => {
    const { OfferedBookID, RequestedBookID, OfferingUserID, RequestingUserID, StatusID } = req.body;
    // Obtener la fecha y hora actuales del servidor
    const OfferDate = new Date();
    try {
        const pool = await getConnection();
        await pool.request()
            .input('OfferedBookID', sql.Int, OfferedBookID)
            .input('RequestedBookID', sql.Int, RequestedBookID)
            .input('OfferingUserID', sql.Int, OfferingUserID)
            .input('RequestingUserID', sql.Int, RequestingUserID)
            .input('OfferDate', sql.DateTime, OfferDate)
            .execute('AddExchangeOffer');
        res.json({ msg: 'Exchange offer added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const updateExchangeOfferStatus = async (req, res) => {
    const { OfferID, StatusID } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('OfferID', sql.Int, OfferID)
            .input('StatusID', sql.Int, StatusID)
            .execute('UpdateExchangeOfferStatus');
        res.json({ msg: 'Exchange offer status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getExchangeOffer = async (req, res) => {
    const { OfferID } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('OfferID', sql.Int, OfferID)
            .execute('GetExchangeOffer');
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: "Exchange offer not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getAllExchangeOffer = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .execute('GetAllExchangeOffer');
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ msg: "Exchange offer not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

