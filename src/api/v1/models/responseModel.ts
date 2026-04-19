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
    data?: T /** The data to include in the response. */
): ApiResponse<T> => ({
    message,
    data
});

/**
 * Creates a standardized error response object.
 * This ensures all API errors follow the same format for consistent client handling.
 *
 * @param {string} message - The error message to display to the client.
 * @param {string} code - The error code for programmatic handling.
 * @returns {object} A formatted error response object.
 */
export const errorResponse = (message: string, code: string) => ({
    success: false,
    error: {
        message,
        code,
    },
    timestamp: new Date().toISOString(),
});

/**
 * Creates a user response object.
 * This returns a formatted user information.
 *
 * @param {string} role - The role of the user.
 * @param {string} email - The user email to sign-in with.
 * @param {string} password - The user password to sign-in with.
 * @param {string} localNum - The assigned number for each role.
 * @returns {object} A formatted user response object.
 */
export const userResponse = (role: string, email: string, password: string, localNum: string) => ({
    idToken: `${role}-token-${password}`,
    email: email,
    localId: `${role}-uid-${localNum}`,
    expiresIn: 3600,
    refreshToken: "mock-refresh-token"
});