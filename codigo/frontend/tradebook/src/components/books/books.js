// Book.js
import React from 'react';
import './books.css';

const books = ({ book }) => {
    return (
        <div className="book-card">
            <h2>{book.Title}</h2>
            {book.UrlImage && <img src={book.UrlImage} alt={book.Title} />}
            <p className="book-details"><strong>Author:</strong> {book.Author}</p>
            <p className="book-details"><strong>Year:</strong> {book.PublicationYear}</p>
            <p className="book-details"><strong>Genre:</strong> {book.Genre}</p>
            <p className="book-details"><strong>Publisher:</strong> {book.Publisher}</p>
            <p className="book-details"><strong>Status:</strong> {book.BookStatus}</p>
            <p className="book-details"><strong>Condition:</strong> {book.BookCondition}</p>
        </div>
    );
};

export default books;
