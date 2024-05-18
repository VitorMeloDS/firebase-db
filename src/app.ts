import { routerControl } from './core/router/router';
import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';

export class AppListen {
  // * Estância do express.
  private static readonly app: Express = express();
  // * Porta da API.
  private static readonly port: number = Number(process.env.API_PORT);

  // * Configurações de resposta para as requisições.
  private static configResponse(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  // * Configurações de cors
  private static configCors(): void {
    this.app.use(cors());
  }

  // * Roteamente da API.
  private static router(): void {
    this.app.use('/api', routerControl);
  }

  // * Inicializador da API.
  public static listen(): void {
    this.configResponse();
    this.configCors();
    this.router();

    this.app.listen(this.port, (): void => {
      console.log('Server started on port ' + this.port);
    });
  }
}
