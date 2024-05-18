import { routerBook } from './router.book';
import { Router } from 'express';

// * Estância do gerenciador de rota.
const router: Router = Router();

// * Rota para os livros.
router.use('/livro', routerBook);

export const routerControl: Router = router;
