import { isBookPost } from '../../../common/validations/book.schema';
import { HttpBadRequest } from 'src/common/helps/http.exception';
import { HttpHandle } from 'src/common/helps/http.handle';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'src/common/helps/http.status';
import { BookService } from './book.service';
import { Book } from 'src/core/interfaces/book';

export class BookController {
  /**
 * Manipula a requisição de login.
 * @param { Request } _req Objeto da requisição;
 * @param { Response } _res Objecto da resposta;
 * @param { NextFunction } _next Função next do Express;
 * @returns { Promise<FirebaseFirestore.DocumentData> } Retorna todos os livros;
 */
  @HttpHandle(HttpStatus.OK)
  public static async getAll(_req: Request, _res: Response, _next: NextFunction): Promise<FirebaseFirestore.DocumentData> {
    return await BookService.getAll();
  }

  /**
 * Manipula a requisição de login.
 * @param { Request } req Objeto da requisição;
 * @param { Response } res Objecto da resposta;
 * @param { NextFunction } _next Função next do Express;
 * @returns { Promise<any> } Retorna um livro;
 */
  @HttpHandle(HttpStatus.OK)
  public static async getById(req: Request, _res: Response, _next: NextFunction): Promise<any> {
    const { id } = req.params;
    if (!id) throw new HttpBadRequest();

    return await BookService.getById(id);
  }

  /**
 * Manipula a requisição de login.
 * @param { Request } req Objeto da requisição;
 * @param { Response } _res Objecto da resposta;
 * @param { NextFunction } _next Função next do Express;
 * @returns { Promise<any> } Retorna um livro;
 */
  @HttpHandle(HttpStatus.CREATED)
  public static async save(req: Request, _res: Response, _next: NextFunction): Promise<any> {
    const book = await isBookPost.validateAsync(req.body).catch((e: any) => {
      throw new HttpBadRequest(`'${e.details[0].message.split('"')[1]}' é um campo obrigatório!`);
    });

    return await BookService.save(book);
  }

  /**
 * Manipula a requisição de login.
 * @param { Request } req Objeto da requisição;
 * @param { Response } _res Objecto da resposta;
 * @param { NextFunction } _next Função next do Express;
 * @returns { Promise<any> } Retorna um livro;
 */
  @HttpHandle(HttpStatus.OK)
  public static async update(req: Request, _res: Response, _next: NextFunction): Promise<any> {
    const book = await isBookPost.validateAsync(req.body).catch((e: any) => {
      throw new HttpBadRequest(`'${e.details[0].message.split('"')[1]}' é um campo obrigatório!`);
    });
    const { id } = req.params;

    if (!id) throw new HttpBadRequest();

    return await BookService.update(id, book);
  }

  /**
 * Manipula a requisição de login.
 * @param { Request } req Objeto da requisição;
 * @param { Response } _res Objecto da resposta;
 * @param { NextFunction } _next Função next do Express;
 * @returns { Promise<any> } Retorna um livro;
 */
  @HttpHandle(HttpStatus.OK)
  public static async delete(req: Request, _res: Response, _next: NextFunction): Promise<any> {
    const { id } = req.params;
    if (!id) throw new HttpBadRequest();

    return await BookService.delete(id);
  }
}
