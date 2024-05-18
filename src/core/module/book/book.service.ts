import { HttpNotFound } from 'src/common/helps/http.exception';
import { FireBase } from '../../../common/providers/firebase';
import { Book } from '../../interfaces/book';

export class BookService {
  // * Estância do Firebase.
  private static readonly connection = FireBase.database();

  // * Busca todos os livros.
  public static async getAll() {
    const _books = await this.connection.collection('livro').get();

    const books: any[] = []
    _books.forEach((doc) => books.push({ id: doc.id, ...doc.data() }));

    return books;
  }

  // * Busca um livro.
  public static async getById(id: string) {
    const _books = await this.connection.collection('livro').get();
    const existBook: string[] = _books.docs.map((doc) => doc.id === id ? doc.id : '');

    if (!existBook?.includes(id)) throw new HttpNotFound('Livro não encontrado');

    const book: any[] = []
    _books.forEach((doc) => {
      if (doc.id === id) book.push({ id: doc.id, ...doc.data() });
    });

    return book;
  }

  // * Cria um novo livro.
  public static async save(_book: Book) {
    const createdBook = await this.connection.collection('livro').add({ ..._book });

    const result = await createdBook.get();

    const book = Object.assign({ ...result.data() }, { id: result.id });

    return book;
  }

  // * Atualiza um livro.
  public static async update(id: string, post: Partial<Book>) {
    const _books = await this.connection.collection('livro').get();
    const existBook: string[] = _books.docs.map((doc) => doc.id === id ? doc.id : '');

    if (!existBook?.includes(id)) throw new HttpNotFound('Livro não encontrado');

    const updatedBook = this.connection.collection('livro').doc(id);
    await updatedBook.update(post);

    const _book = await this.connection.collection('livro').get();
    const book: any[] = []
    _book.forEach((doc) => {
      if (doc.id === id) book.push({ id: doc.id, ...doc.data() })
    })

    return book;
  }

  // * Deleta um livro.
  public static async delete(id: string) {
    const _books = await this.connection.collection('livro').get();
    const existBook: string[] = _books.docs.map((doc) => doc.id === id ? doc.id : '');

    if (!existBook?.includes(id)) throw new HttpNotFound('Livro não encontrado');

    const updatedBook = this.connection.collection('livro').doc(id);
    await updatedBook.delete();

    return 'Livro excluído!';
  }
}
