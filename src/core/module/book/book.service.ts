import { HttpNotFound } from '../../../common/helps/http.exception';
import { FireBase } from '../../../common/providers/firebase';
import { Book } from '../../interfaces/book';

export class BookService {
  // * Estância do Firebase.
  private static readonly connection = FireBase.database();

  // * Busca todos os livros.
  public static async getAll(): Promise<Book[]> {
    const _books = await this.connection.collection('livro').get();

    const books: Book[] = [];
    _books.forEach((doc) => books.push(Object.assign({ id: doc.id, ...doc.data() })));

    return books;
  }

  // * Busca um livro.
  public static async getById(id: string): Promise<Book> {
    const _book = await this.connection.collection('livro').doc(id).get();
    if (!_book.exists) throw new HttpNotFound('Livro não encontrado');
    const book: Book = Object.assign({ ..._book.data(), id: _book.id });

    return book;
  }

  // * Cria um novo livro.
  public static async save(_book: Book): Promise<Book> {
    const createdBook = await this.connection.collection('livro').add({ ..._book });

    const result = await createdBook.get();

    const book: Book = Object.assign({ ...result.data(), id: result.id });

    return book;
  }

  // * Atualiza um livro.
  public static async update(id: string, post: Partial<Book>): Promise<Book> {
    const _existBook = await this.connection.collection('livro').doc(id).get();
    if (!_existBook.exists) throw new HttpNotFound('Livro não encontrado');

    const updatedBook = this.connection.collection('livro').doc(id);
    await updatedBook.update(post);

    const _book = await this.connection.collection('livro').doc(id).get();
    const book: Book = Object.assign({ ..._book.data(), id: _book.id });

    return book;
  }

  // * Deleta um livro.
  public static async delete(id: string) {
    const _existBook = await this.connection.collection('livro').doc(id).get();
    if (!_existBook.exists) throw new HttpNotFound('Livro não encontrado');

    const updatedBook = this.connection.collection('livro').doc(id);
    await updatedBook.delete();

    return 'Livro excluído!';
  }
}
