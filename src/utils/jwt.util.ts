import { FastifyRequest } from 'fastify';

export interface DecodedToken {
  id: string;
  sub?: string;
  iat: number;
  exp: number;
  iss?: string;
}

export const cookieExtractor = (request: FastifyRequest): string =>
  request?.cookies?.['refresh_token'];
