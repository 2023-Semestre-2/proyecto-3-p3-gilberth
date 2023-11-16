import {getConnection, sql} from '../database/connection'

export const getAllBookConditions = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .execute('GetAllBookConditions');
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};