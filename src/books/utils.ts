import { ErrorResponse } from './types';

/**
 * Type narrowing function to check if a response is an error response.
 *
 * @param response The response to check.
 * @returns Whether the response is an error response.
 */
export function isErrorResponse<T>(
  response: T | ErrorResponse,
): response is ErrorResponse {
  return typeof response === 'object' && response &&
    response.hasOwnProperty('status') &&
    response.hasOwnProperty('message');
}

/**
 * Check if a file is a JSON file.
 *
 * @param file The file to check.
 * @returns A boolean indicating whether the file is a JSON file.
 */
export function isJsonFile<T>(file: T | File): file is File {
  return file instanceof File && file.type === 'application/json' &&
    file.name.endsWith('.json');
}
