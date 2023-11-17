const BASE_URL = 'http://localhost:3000/books'; // Asume que tu servidor Node.js corre en el puerto 3001. Cambia si es necesario.

export const addBook = async (bookData) => {
    try {
        const response = await fetch(`${BASE_URL}/addBook`, { // Asegúrate de tener la URL correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (bookData) => {
    try {
        const response = await fetch(`${BASE_URL}/updateBook`, { // Asegúrate de tener la URL correcta
            method: 'PUT', // Puede ser PUT o PATCH dependiendo de tu implementación
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};


export const getBook = async (bookId) => {
    try {
        const response = await fetch(`${BASE_URL}/getBook/${bookId}`); // Asegúrate de tener la URL correcta
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting book:', error);
        throw error;
    }
};


export const getAllBooks = async () => {
    try {
        const response = await fetch(`${BASE_URL}`); // Asegúrate de tener la URL correcta
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting all books:', error);
        throw error;
    }
};



