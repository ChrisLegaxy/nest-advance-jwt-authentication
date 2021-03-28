import { FastifyRequest } from 'fastify';

/**
 * * Decoded Token Interface
 * @description - it will be dynamic based on the data that is being signed in jwt
 */
export interface DecodedToken {
  id: string;
  sub?: string;
  iat: number;
  exp: number;
  iss?: string;
}

/**
 * @function cookieExtractor
 * @description - custom cookie extractor
 * @param request
 * @returns refresh_token
 */
export const cookieExtractor = (request: FastifyRequest): string =>
  request?.cookies?.['refresh_token'];
