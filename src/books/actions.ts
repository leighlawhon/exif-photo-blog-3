'use server';

import { createClient } from '@vercel/kv';
import { randomUUID } from 'crypto';

import { BOOK_REDIS_KEY, HttpStatus, REDIS_CONFIG } from './constants';
import type { Book, ErrorResponse } from './types';
import { isJsonFile } from './utils';

/**
 * Get all books.
 *
 * @returns An array of books.
 */
export async function getBooks() {
  const booksClient = createClient(REDIS_CONFIG);
  const bookIds = await booksClient.keys(`${BOOK_REDIS_KEY}:*`);

  const bookRequests = bookIds.map((id) => booksClient.get(id));
  const books = await Promise.all(bookRequests) as Book[];

  return books;
}

/**
 * Get a book from a given id.
 *
 * @param id The id of the book to get, returns null if not found
 * @returns The book with the given id
 */
export async function getBook(id: Book['_id']) {
  const booksClient = createClient(REDIS_CONFIG);
  const book = await booksClient.get(`${BOOK_REDIS_KEY}:${id}`);

  return book as Book | null;
}

/**
 * Create a new book.
 *
 * @param bookData The form data relating to the book to be created.
 * @returns The id of the created book, or an error response.
 */
export async function createBook(bookData: FormData) {
  const payload = bookData.get('book');
  if (!bookData || !isJsonFile(payload)) {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'The book field is required, and must be a JSON file.',
    } as ErrorResponse;
  }

  const { _id: _, ...bookContents } = JSON.parse(await payload.text()) as Book;
  const booksClient = createClient(REDIS_CONFIG);
  const id = randomUUID();
  const bookWithId = { _id: id, ...bookContents };

  const status = await booksClient.set(
    `${BOOK_REDIS_KEY}:${id}`,
    JSON.stringify(bookWithId),
  );

  if (status !== 'OK') {
    throw new Error('Failed to create book.');
  }

  return { _id: id };
}

/**
 * Update an existing book.
 *
 * @param bookData The form data relating to the book to be updated.
 * @returns The id of the updated book, or an error response.
 */
export async function updateBook(bookData: FormData) {
  const id = bookData.get('_id');
  if (!id) {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'The _id field is required.',
    } as ErrorResponse;
  }

  const existingBook = await getBook(id as Book['_id']);
  if (!existingBook) {
    return {
      status: HttpStatus.NOT_FOUND,
      message: 'Book not found.',
    } as ErrorResponse;
  }

  const payload = bookData.get('book');
  if (!bookData || !isJsonFile(payload)) {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'The book field is required, and must be a JSON file.',
    } as ErrorResponse;
  }

  const { _id: _, ...bookContents } = JSON.parse(await payload.text()) as Book;
  const booksClient = createClient(REDIS_CONFIG);
  const bookWithId = { _id: id, ...bookContents };

  const status = await booksClient.set(
    `${BOOK_REDIS_KEY}:${id}`,
    JSON.stringify(bookWithId),
  );

  if (status !== 'OK') {
    throw new Error('Failed to update book.');
  }

  return { _id: id };
}

export async function deleteBook(id: Book['_id']) {
  if (!id) {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'The _id field is required.',
    } as ErrorResponse;
  }

  const existingBook = await getBook(id as Book['_id']);
  if (!existingBook) {
    return {
      status: HttpStatus.NOT_FOUND,
      message: 'Book not found.',
    } as ErrorResponse;
  }
  const booksClient = createClient(REDIS_CONFIG);
  const bookWithId = { _id: id };

  const status = await booksClient.del(
    `${BOOK_REDIS_KEY}:${id}`,
    JSON.stringify(bookWithId),
  );

  if (status !== 200) {
    throw new Error('Failed to delete book.');
  }

  return { _id: id };
}