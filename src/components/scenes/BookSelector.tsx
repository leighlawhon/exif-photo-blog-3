
'use client';
import { clsx } from 'clsx/lite';
import { getBooks } from '@/books/actions';
import BookList from './BookList';

import React, { useState, useEffect } from 'react';
import { Book } from '@/books/types';
import JsonFileUploader from './JsonFileUploader';

interface BookSelectorProps {
    editMode: boolean;
}


export default function BookSelector({ editMode }: BookSelectorProps) {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks(); // Assuming getBooks is a function that fetches books from the API
                console.log('response', response);
                setBooks(response); // Assuming the API response contains an array of books in the "data" property
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div >
            {/* <JsonFileUploader editMode={editMode} /> */}
            {books.length === 0 ? <div>Loading...</div> : <BookList books={books} />}
        </div>
    );
}
