
'use client';
import { clsx } from 'clsx/lite';
import { getBooks } from '@/books/actions';
import BookList from './BookList';

import React, { useState, useEffect } from 'react';
import { Book } from '@/books/types';

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
        <div className={clsx(
            'bg-white dark:bg-black',
            'dark:text-gray-400',
            'border border-gray-200 dark:border-gray-800 rounded-md',
            'divide-y divide-gray-200 dark:divide-gray-800',
        )}>
            <BookList books={books} />
        </div>
    );
}
