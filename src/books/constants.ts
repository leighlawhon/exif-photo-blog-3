import { createClient } from '@vercel/kv';

export const BOOK_REDIS_KEY = 'books';

export const REDIS_CONFIG: Parameters<typeof createClient>[0] = {
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
};

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
