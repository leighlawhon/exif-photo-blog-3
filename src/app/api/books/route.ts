import type { NextRequest } from 'next/server';

import { createBook, getBooks, deleteBook } from '@/books/actions';
import { HttpStatus } from '@/books/constants';
import { isErrorResponse } from '@/books/utils';

export async function GET(_: NextRequest) {
  try {
    const books = await getBooks();
    return Response.json(books);
  } catch (e) {
    return Response.json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while fetching the books.',
    }, {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function POST(request: NextRequest) {
  let bookData = null;
  try {
    bookData = await request.formData();
  } catch (e) {
    // add error response here
    return Response.json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Invalid request body.',
    }, {
      status: HttpStatus.BAD_REQUEST,
    });
  }

  try {
    const response = await createBook(bookData);
    if (isErrorResponse(response)) {
      return Response.json(response, {
        status: response.status,
      });
    }

    return Response.json({
      status: HttpStatus.CREATED,
      message: 'Book created successfully.',
      payload: { _id: response._id },
    }, {
      status: HttpStatus.CREATED,
    });
  } catch (e) {
    return Response.json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while creating the book.',
    }, {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let bookData = null;
  try {
    bookData = await request.formData();
  } catch (e) {
    // add error response here
    return Response.json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Invalid request body.',
    }, {
      status: HttpStatus.BAD_REQUEST,
    });
  }

  try {
    const response = await deleteBook(bookData);
    if (isErrorResponse(response)) {
      return Response.json(response, {
        status: response.status,
      });
    }

    return Response.json({
      status: HttpStatus.OK,
      message: 'Book deleted successfully.',
      payload: { _id: response._id },
    }, {
      status: HttpStatus.OK,
    });
  } catch (e) {
    return Response.json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while deleting the book.',
    }, {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}