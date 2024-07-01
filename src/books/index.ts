import { createClient } from '@vercel/kv';
import { auth } from '@/auth';


export interface Book {
    title: string;
    chapters: [string];
    // Add more properties as needed
}

export async function POST_BOOK(book: Book): Promise<void> {


    console.log(book, process.env.USERS_REST_API_URL)
    // const users = createClient({
    //     url: process.env.USERS_REST_API_URL as string,
    //     token: process.env.USERS_REST_API_TOKEN as string,
    // });

    // const user = await users.hgetall('user:me');
    // console.log(user)
    // SET userSession jsonObject
    // fetch(`${process.env.KV_REST_API_URL}/set/userSession`, {
    //     headers: {
    //         Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    //     },
    //     body: JSON.stringify(book),
    //     method: 'POST',
    // })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
}