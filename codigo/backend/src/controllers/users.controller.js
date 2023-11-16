import {getConnection, sql} from '../database/connection'

export const addUser = async (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;
    if (!FirstName || !LastName || !Email || !Password) {
        return res.status(400).json({ msg: "Bad request. Please fill all necessary fields" });
    }

    // Obteniendo la fecha y hora actual
    const RegistrationDate = new Date();

    try {
        const pool = await getConnection();
        await pool.request()
            .input('FirstName', sql.VarChar, FirstName)
            .input('LastName', sql.VarChar, LastName)
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, Password)
            .input('RegistrationDate', sql.DateTime, RegistrationDate)
            .execute('AddUser');
        res.json({ msg: 'New user added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};



export const updateUser = async (req, res) => {
    const { UserID, FirstName, LastName, Email, Password } = req.body;
    if (!UserID || !FirstName || !LastName || !Email || !Password) {
        return res.status(400).json({ msg: "Bad request. Please fill all fields" });
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('UserID', sql.Int, UserID)
            .input('FirstName', sql.VarChar, FirstName)
            .input('LastName', sql.VarChar, LastName)
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, Password)
            .execute('UpdateUser');
        res.json({ msg: 'User updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const userLogin = async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        return res.status(400).json({ msg: "Bad request. Please provide both email and password" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, Password)
            .execute('UserLogin');

        if (result.recordset.length > 0) {
            // Usuario encontrado
            res.json({ msg: 'User logged in successfully', user: result.recordset[0] });
        } else {
            // Usuario no encontrado
            res.status(401).json({ msg: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};



export const getUser = async (req, res) => {
    const { UserID } = req.params;
    if (!UserID) {
        return res.status(400).json({ msg: "Bad request. UserID is required" });
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('UserID', sql.Int, UserID)
            .execute('GetUser');
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .execute('GetALLUser');
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

