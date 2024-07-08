import request from 'supertest';
import { AppListen } from '../src/app';
import { createBook, invalidBook, updateBook } from './fixtures/book.fixtures';

describe('BookController E2E', () => {
  let server: import('http').Server;
  let bookId: string = '';

  beforeAll(() => {
    server = AppListen.listen();
  });

  afterEach(async () => {
    if (bookId) {
      await request(server).delete(`/api/book/${bookId}`);
    }
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/book', () => {
    it('Should return all book', async () => {
      await request(server).post('/api/book').send(createBook);

      const response = await request(server).get('/api/book');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/book/:id', () => {
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

  describe('PUT /api/book/:id', () => {
    it('Should update a book', async () => {
      const { body } = await request(server).post('/api/book').send(createBook);
      bookId = body.data.id;

      const response = await request(server).put(`/api/book/${bookId}`).send(updateBook);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('resumo', 'Esse livro é simplemente um teste de criação');
      expect(response.body.data).toHaveProperty('isbn', 25649);
    });

    it('Should return excption to update book', async () => {
      bookId = 'qualquer-coisa';

      const response = await request(server).put(`/api/book/${bookId}`).send(updateBook);
      expect(response.status).toBe(404);
      expect(response.body.data).toEqual('Livro não encontrado');
    });
  });

  describe('DELETE /api/book/:id', () => {
    it('Should delete a book', async () => {
      const { body } = await request(server).post('/api/book').send(createBook);
      bookId = body.data.id;

      const response = await request(server).delete(`/api/book/${bookId}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe('Livro excluído!');
    });

    it('Should return excption to update book', async () => {
      bookId = 'qualquer-coisa';

      const response = await request(server).delete(`/api/book/${bookId}`);
      expect(response.status).toBe(404);
      expect(response.body.data).toEqual('Livro não encontrado');
    });
  });
});
