/**
 * Interface representing a standard API response.
 * @template T - The type of the data property.
 */
export interface ApiResponse<T> {
    message?: string /** A message providing additional information about the response. */;
    count?: number /** A number representing the total length of the list of teams, players and hof. */;
    data?: T /** The data returned in the response. */;
    error?: string /** An error message, if applicable. */;
    code?: string /** An error code, if applicable. */;
}

/**
 * Creates a success response object.
 * @template T - The type of the data property.
 * @param {string} [message] - A message providing additional information about the response.
 * @param {number} [count] - The number representing the total teams, players and hof in the list.
 * @param {T} [data] - The data to include in the response.
 * @returns {ApiResponse<T | {}>} The success response object.
 */
export const successResponse = <T>(
    message?: string /** A message providing additional information about the response. */,
    count?: number /** A number representing the total length of the list of teams, players and hof. */,
    data?: T /** The data to include in the response. */
): ApiResponse<T> => ({
    message,
    count,
    data
});
