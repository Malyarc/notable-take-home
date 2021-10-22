import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      'Req Headers:',
      JSON.stringify(req.rawHeaders),
      'Req Params:',
      JSON.stringify(req.params),
      'Req Body:',
      JSON.stringify(req.body),
    );
    next();
  }
}
