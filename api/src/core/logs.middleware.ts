// logger.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    const { method, url, body, params, query } = req;

    // Log request details
    console.log(`[${now.toISOString()}] ${method} ${url}`);
    console.log('Request Body:', body);
    console.log('Request Params:', params);
    console.log('Request Query:', query);
    next();
  }
}