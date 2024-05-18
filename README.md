# Livro CRUD Application

Esta é uma aplicação de CRUD (Create, Read, Update, Delete) de livros desenvolvida com Node.js e Express, utilizando o Firebase para armazenamento de dados.

## Funcionalidades

- **Criar um Livro**: Adicionar um novo livro ao banco de dados.
- **Listar Livros**: Obter uma lista de todos os livros cadastrados.
- **Lista Livro**: Obter um livro cadastrado.
- **Atualizar um Livro**: Editar as informações de um livro existente.
- **Excluir um Livro**: Remover um livro do banco de dados.

## Estrutura dos Dados

Cada livro contém as seguintes propriedades:

- **anoLancamento**: `string` - Ano de lançamento do livro.
- **titulo**: `string` - Título do livro.
- **autor**: `string` - Autor do livro.
- **resumo**: `string` - Resumo do conteúdo do livro.
- **isbn**: `number` - Código ISBN do livro.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Firebase](https://firebase.google.com/)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/VitorMeloDS/firebase-db.git
   cd firebase-db
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure o Firebase:

   - Crie um projeto no Firebase.
   - Adicione um banco de dados Firestore.
   - Obtenha as credenciais de configuração do Firebase e adicione ao seu projeto (crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente conforme necessário).

4. Execute a aplicação:

   ```sh
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3000`.

> A porta da API é definida no arquivo `.env`.

## Rotas da API

### Criar um Livro

- **Endpoint**: `POST /livros`
- **Descrição**: Adiciona um novo livro.
- **Body**:

  ```json
  {
    "anoLancamento": "string",
    "titulo": "string",
    "autor": "string",
    "resumo": "string",
    "isbn": number
  }
  ```

- **Exemplo**:

  ```sh
  curl -X POST http://localhost:3000/livros -H "Content-Type: application/json" -d '{"anoLancamento": "2024", "titulo": "Meu Livro", "autor": "Autor Exemplo", "resumo": "Um resumo do livro.", "isbn": 1234567890123}'
  ```

### Listar Livros

- **Endpoint**: `GET /livros`
- **Descrição**: Retorna uma lista de todos os livros.

### Obter um Livro

- **Endpoint**: `GET /livros/:id`
- **Descrição**: Retorna os dados de um livro específico.
- **Parâmetros**:
  - `id`: ID do livro.

### Atualizar um Livro

- **Endpoint**: `PUT /livros/:id`
- **Descrição**: Atualiza as informações de um livro.
- **Parâmetros**:
  - `id`: ID do livro.
- **Body**: Qualquer propriedade do livro que você deseja atualizar.

### Excluir um Livro

- **Endpoint**: `DELETE /livros/:id`
- **Descrição**: Remove um livro do banco de dados.
- **Parâmetros**:
  - `id`: ID do livro.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Comite suas mudanças (`git commit -am 'Adicione nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- Email: <vmsvitor20@gmail.com>
- GitHub: [seu-usuario](https://github.com/VitorMeloDS)

```

```
