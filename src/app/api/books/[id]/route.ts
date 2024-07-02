import type { NextRequest } from 'next/server';

import { getBook, updateBook } from '@/books/actions';
import { HttpStatus } from '@/books/constants';
import type { Book } from '@/books/types';
import { isErrorResponse } from '@/books/utils';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const book = await getBook(params.id as Book['_id']);
    if (!book) {
      return Response.json({
        status: HttpStatus.NOT_FOUND,
        body: 'Book not found.',
      }, { status: HttpStatus.NOT_FOUND });
    }

    return Response.json(book);
  } catch (e) {
    return Response.json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while fetching the book.',
    }, {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

  bookData.set('_id', params.id);

  try {
    const response = await updateBook(bookData);
    if (isErrorResponse(response)) {
      return Response.json(response, {
        status: response.status,
      });
    }

    return Response.json({
      status: HttpStatus.OK,
      message: 'Book updated successfully.',
      payload: { _id: response._id },
    }, {
      status: HttpStatus.OK,
    });
  } catch (e) {
    return Response.json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while updating the book.',
    }, {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
