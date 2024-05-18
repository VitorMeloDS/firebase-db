import { Book } from '../../core/interfaces/book';
import Joi from 'joi';

// * Validação para a requisição
export const isBookPost = Joi.object<Book>({
  anoLancamento: Joi.string().required(),
  titulo: Joi.string().required(),
  autor: Joi.string().required(),
  resumo: Joi.string(),
  isbn: Joi.number()
});
