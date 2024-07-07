import request from 'supertest';
import { AppListen } from '../src/app';
import { createBook, invalidBook } from './fixtures/book.fixtures';

describe('BookController E2E', () => {
  let server: import('http').Server;

  beforeAll(() => {
    server = AppListen.listen();
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/book', () => {
    beforeEach(async () => {
      await request(server).post('/api/book').send(createBook);
    });

    it('Should return all book', async () => {
      const response = await request(server).get('/api/book');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/book/:id', () => {
    let bookId: string = '';

    it('Should return one book', async () => {
      const { body } = await request(server).post('/api/book').send(createBook);
      bookId = body.data.id;

      const response = await request(server).get(`/api/book/${bookId}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('id', bookId);
    });

    it('Should return excption to get book', async () => {
      bookId = 'qualquer-coisa';

      const response = await request(server).get(`/api/book/${bookId}`);
      expect(response.status).toBe(404);
      expect(response.body.data).toEqual('Livro não encontrado');
    });
  });

  describe('POST /api/book', () => {
    it('Should crate a book', async () => {
      const response = await request(server).post('/api/book').send(createBook);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
    });

    it('Should return excption to crate a invalid book', async () => {
      const response = await request(server).post('/api/book').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.data).toEqual("'autor' é um campo obrigatório!");
    });
  });

  // describe('PUT /api/book/:id', () => {
  //   it('Should update a book', async () => {
  //     const bookId = 'some-book-id';
  //     const updatedBook = {};

  //     const response = await request(server).put(`/api/book/${bookId}`).send(updatedBook);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty('title', 'Livro Atualizado');
  //   });
  // });

  // describe('DELETE /api/book/:id', () => {
  //   it('Should delete a book', async () => {
  //     const bookId = 'some-book-id';

  //     const response = await request(server).delete(`/api/book/${bookId}`);
  //     expect(response.status).toBe(200);
  //     expect(response.body).toBe('Livro excluído!');
  //   });
  // });
});
