/**
 * * Packages Imports
 */
import { FastifyReply } from 'fastify';

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
  response.setCookie('refresh_token', token, {
    httpOnly: true,
    /**
     * !! Important
     * * need to add absolute path
     */
    path: '/api/v1/auth/refresh_token',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
