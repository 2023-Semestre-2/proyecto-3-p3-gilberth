import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../../api/booksApi'; // Asegúrate de importar la función que hicimos anteriormente
import Book from '../../components/books/books'; // Importa el componente Book


const MainPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooks();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <div className="books-container">
                {books.map((book) => (
                    <Book key={book.BookID} book={book} />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
