import { BookController } from '../module/book/book.controller';
import { Router } from 'express';

// * Estância do gerenciador de rota.
const router: Router = Router();

// * Rota para os livros.
router
  .post('/', BookController.save)
  .get('/', BookController.getAll)
  .put('/:id', BookController.update)
  .get('/:id', BookController.getById)
  .delete('/:id', BookController.delete);

export const routerBook: Router = router;
