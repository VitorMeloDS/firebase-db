import { isBookPost } from '../../../common/validations/book.schema';
import { HttpBadRequest } from '../../../common/helps/http.exception';
import { HttpHandle } from '../../../common/helps/http.handle';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../common/helps/http.status';
import { BookService } from './book.service';
import { Book } from '../../interfaces/book';

export class BookController {
  /**
   * Manipula a requisição de busca.
   * @param { Request } _req Objeto da requisição;
   * @param { Response } _res Objecto da resposta;
   * @param { NextFunction } _next Função next do Express;
   * @returns { Promise<Book[]> } Retorna todos os livros;
   */
  @HttpHandle(HttpStatus.OK)
  public static async getAll(_req: Request, _res: Response, _next: NextFunction): Promise<Book[]> {
    return await BookService.getAll();
  }

  /**
   * Manipula a requisição de busca.
   * @param { Request } req Objeto da requisição;
   * @param { Response } res Objecto da resposta;
   * @param { NextFunction } _next Função next do Express;
   * @returns { Promise<Book> } Retorna um livro;
   */
  @HttpHandle(HttpStatus.OK)
  public static async getById(req: Request, _res: Response, _next: NextFunction): Promise<Book> {
    const { id } = req.params;
    if (!id) throw new HttpBadRequest('O id do curso é obrigatório!');

    return await BookService.getById(id);
  }

  /**
   * Manipula a requisição de criação.
   * @param { Request } req Objeto da requisição;
   * @param { Response } _res Objecto da resposta;
   * @param { NextFunction } _next Função next do Express;
   * @returns { Promise<Book> } Retorna um livro;
   */
  @HttpHandle(HttpStatus.CREATED)
  public static async save(req: Request, _res: Response, _next: NextFunction): Promise<Book> {
    const book = await isBookPost.validateAsync(req.body).catch((e: any) => {
      throw new HttpBadRequest(`'${e.details[0].message.split('"')[1]}' é um campo obrigatório!`);
    });

    return await BookService.save(book);
  }

  /**
   * Manipula a requisição de atualização.
   * @param { Request } req Objeto da requisição;
   * @param { Response } _res Objecto da resposta;
   * @param { NextFunction } _next Função next do Express;
   * @returns { Promise<Book> } Retorna um livro;
   */
  @HttpHandle(HttpStatus.OK)
  public static async update(req: Request, _res: Response, _next: NextFunction): Promise<Book> {
    const book = await isBookPost.validateAsync(req.body).catch((e: any) => {
      throw new HttpBadRequest(`'${e.details[0].message.split('"')[1]}' é um campo obrigatório!`);
    });
    const { id } = req.params;

    if (!id) throw new HttpBadRequest();

    return await BookService.update(id, book);
  }

  /**
   * Manipula a requisição de deleção.
   * @param { Request } req Objeto da requisição;
   * @param { Response } _res Objecto da resposta;
   * @param { NextFunction } _next Função next do Express;
   * @returns { Promise<string> } Retorna uma mensagem;
   */
  @HttpHandle(HttpStatus.OK)
  public static async delete(req: Request, _res: Response, _next: NextFunction): Promise<string> {
    const { id } = req.params;
    if (!id) throw new HttpBadRequest();

    return await BookService.delete(id);
  }
}
