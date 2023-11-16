import {getConnection, sql} from '../database/connection'

export const addBook = async (req, res) => {
    const { UserID, Title, Description, Author, PublicationYear, GenreID, Publisher, ISBN, StatusID, ConditionID } = req.body;
    // Aquí puedes agregar validaciones para los campos requeridos
    try {
        const pool = await getConnection();
        await pool.request()
            .input('UserID', sql.Int, UserID)
            .input('Title', sql.VarChar, Title)
            .input('Description', sql.Text, Description)
            .input('Author', sql.VarChar, Author)
            .input('PublicationYear', sql.Int, PublicationYear)
            .input('GenreID', sql.Int, GenreID)
            .input('Publisher', sql.VarChar, Publisher)
            .input('StatusID', sql.Int, StatusID)
            .input('ConditionID', sql.Int, ConditionID)
            .execute('AddBook');
        res.json({ msg: 'Book added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const updateBook = async (req, res) => {
    const { BookID, UserID, Title, Description, Author, PublicationYear, GenreID, Publisher, ISBN, StatusID, ConditionID } = req.body;

    // Aquí puedes agregar validaciones para los campos requeridos
    if (!BookID || !UserID || !Title || !Author || !PublicationYear || !GenreID || !Publisher || !ISBN || !StatusID || !ConditionID) {
        return res.status(400).json({ msg: "Bad request. Please provide all necessary fields" });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('BookID', sql.Int, BookID)
            .input('UserID', sql.Int, UserID)
            .input('Title', sql.VarChar, Title)
            .input('Description', sql.Text, Description)
            .input('Author', sql.VarChar, Author)
            .input('PublicationYear', sql.Int, PublicationYear)
            .input('GenreID', sql.Int, GenreID)
            .input('Publisher', sql.VarChar, Publisher)
            .input('StatusID', sql.Int, StatusID)
            .input('ConditionID', sql.Int, ConditionID)
            .execute('UpdateBook');
        res.json({ msg: 'Book updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getBook = async (req, res) => {
    const { BookID } = req.params;
    if (!BookID) {
        return res.status(400).json({ msg: "Bad request. BookID is required" });
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('BookID', sql.Int, BookID)
            .execute('GetBook');
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const getAllBook = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .execute('GetAllBooks');
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ msg: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


