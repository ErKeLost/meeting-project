// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch(HttpException)
// export class CustomExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const response = host.switchToHttp().getResponse<Response>();
//     console.log(response);

//     response
//       .json({
//         code: exception.getStatus(),
//         message: 'fail',
//         data: exception.message,
//       })
//       .end();
//   }
// }

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof BadRequestException) {
      // ValidationPipe error
      const validationErrors = exception.getResponse() as any;
      const errorMessage = Array.isArray(validationErrors.message)
        ? validationErrors.message[0]
        : validationErrors.message;

      response
        .json({
          code: HttpStatus.BAD_REQUEST,
          message: 'fail',
          data: { message: errorMessage },
        })
        .end();
    } else {
      // Other HttpException
      response
        .json({
          code: exception.getStatus(),
          message: 'fail',
          data: { message: exception.message },
        })
        .end();
    }
  }
}
