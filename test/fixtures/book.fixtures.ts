import { Book } from '../../src/core/interfaces/book';

export const createBook: Book = {
  anoLancamento: '10/04/2005',
  titulo: 'O príncipe',
  autor: 'Ricardo Paz'
};

export const updateBook: Book = {
  anoLancamento: '10/04/2005',
  titulo: 'O príncipe',
  autor: 'Ricardo Paz',
  resumo: 'Esse livro é simplemente um teste de criação',
  isbn: 25649
};

export const invalidBook: Partial<Book> = {
  anoLancamento: '10/04/2005',
  titulo: 'O príncipe'
};
