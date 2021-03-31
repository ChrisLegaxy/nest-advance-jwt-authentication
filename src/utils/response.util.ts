/**
 * @version 1.0.0
 * @license MIT
 * @copyright CPC
 * @author Chris Legaxy | Chris Van
 * @contact chris.legaxy@gmail.com | chrisvan.vshmr@gmail.com
 */

/**
 * * Packages Imports
 */
import { FastifyReply } from 'fastify';

const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * @function setRefreshTokenToHttpOnlyCookie
 * @description - set refresh_token in response http-only cookie
 * @param response
 * @param token
 */
export const setRefreshTokenToHttpOnlyCookie = (
  response: FastifyReply,
  token: string,
) => {
  response.setCookie(REFRESH_TOKEN_KEY, token, {
    httpOnly: true,
    /**
     * !! Important
     * * need to add absolute path
     */
    path: '/api/v1/auth/refresh_token',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'strict',
    // secure: true, // must set secure to false in development mode (API client can't access if secure is true)
  });
};

export const terminateRefreshTokenHttpOnlyCookie = (response: FastifyReply) => {
  response.clearCookie(REFRESH_TOKEN_KEY, {
    path: '/api/v1/auth/refresh_token',
  });
};
