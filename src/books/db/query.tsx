
import { createClient } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { BOOK_REDIS_KEY, REDIS_CONFIG } from '../constants';

export async function GET() {
    const booksClient = createClient(REDIS_CONFIG);
    // const book = await booksClient.get(`${BOOK_REDIS_KEY}:${id}`);


    const books = createClient({
        url: process.env.PRODUCTS_REST_API_URL,
        token: process.env.PRODUCTS_REST_API_TOKEN,
    });

    const book = await books.hgetall('book:shirt');


}
