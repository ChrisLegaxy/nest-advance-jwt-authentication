import { FastifyReply } from 'fastify';

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
