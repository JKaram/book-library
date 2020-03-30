import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import BookDetails from './BookDetails'
import { getBooksQuery } from '../queries/queries'


function BookList({ data }) {
    const [showBook, setShowBook] = useState(null);
    function displayBooks() {
        if (data.loading) {
            return (
                <div>Loading Books ...</div>
            )
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={e => {setShowBook(book.id)}}>{book.name}</li>
                )
            })
        }
    }
    console.log(data, 'DATA')
    return (
        <div className="App">
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={showBook}/>
        </div>
    );
}

export default graphql(getBooksQuery)(BookList);
