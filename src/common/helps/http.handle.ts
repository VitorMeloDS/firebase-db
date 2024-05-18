import { NextFunction, Request, Response } from 'express';
import { time } from '../utils/instante.time';
import { HttpStatus } from './http.status';

export function HttpHandle(statusCode: HttpStatus): MethodDecorator {
  /**
   * Encapsula o controlador para retornar um responta padrão e com um único ponto de tratamento de try catch;
   * @param { any } target - Classe do método que possue o encapsulamento (decorador);
   * @param { string | Symbol } methodName - Nome do método encapsulado (decorado);
   * @param { PropertyDescriptor } descriptor - Objeto do método (descritor);
   * @return { TypedPropertyDescriptor<T> } - Objeto do método manipulado;
   */
  return function <T>(
    target: any,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ): TypedPropertyDescriptor<T> {
    /**
     * Manipulador do requisição original da class controller;
     */
    const originalProperty = descriptor.value;

    // Encapsulamento do método original;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const result = await originalProperty.call(this, req, res, next);
        const data = result ?? 'NO_CONTENT';
        const hour = time;
        res.send({ data, hour }).status(statusCode);
        next();
      } catch (error: any) {
        console.error(`${target.name}.${methodName.toString()}`, error);
        const data = error.message;
        const hour = time;
        res.status(error?.status ?? 500).send({ data, hour });
        next();
      }
    };

    // Retorno do método;
    return descriptor;
  };
}