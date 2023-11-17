# :pencil: [Store Manager]()

Uma API e um banco de dados para produção de um sistema de gerenciamento de vendas, criação de um CRUD de produtos.

## :bomb: Tecnologias

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MySQL](https://www.mysql.com/)
- [Nodemon](https://nodemon.io/)
- [NodeJs](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Joi](https://joi.dev/)
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/)

## :bulb: Funcionalidades

- Endpoints que serão conectados ao banco de dados
- Listagem de produtor e vendas
- Validações para cada Endpoint

## :computer: Utilização

1. **GET /health**
   - Retorna uma mensagem confirmando que o Serviço está funcionando.

2. **GET /products**
   - Retorna uma lista com todos os Produtos.

3. **GET /products/:id**
   - Retorna um Produto em específico pelo ID.
   
4. **POST /products**
   - Cadastra um Produto novo.

5. **DELETE /products/:id**
   - Deleta um Produto em específico pelo ID.

6. **PUT /products/:id**
   - Altera o nome de um Produto em específico pelo ID.

7. **GET /products/search?q=**
   - Retorna uma lista com todas os Produtos que tenham o Nome, pela palavra buscada por `q`.

8. **GET /sales**
   - Retorna uma lista com todas as Vendas

9. **GET /sales/:id**
   - Retorna uma Uma em específico pelo ID.

10. **POST /sales**
    - Cria uma nova Postagem.

11. **DELETE /sales/:id**
    - Deleta uma Venda em específico pelo ID

12. **PUT /sales/:saleId/products/:productId/quantity**
    - Altera a quantidade de uma venda em específica, feita de um produto em específico.


## :whale2: Como acessar com Docker
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está `1.26.0` por `1.29.2`.**

  - Abra o terminal e clone o repositório.
  ```bash
    git clone git@github.com:DaniloBertolini/store-manager.git
  ```
  - Execute os serviços `node` e `db`
  ```bash
    docker-compose up -d --build
  ```
  - Entre no `container` executado no comando anterior.
  ```bash
    docker exec -it store_manager bash
  ```
  - Instale as dependências dentro do container.
  ```bash
    npm install
  ```
  - Inicie o servidor de desenvolvimento.
  ```bash
    npm run dev
  ```
  - [Now go to HTTP requests](#http).

## :books: Como acessar localmente

  - Abra o terminal e clone o repositório.
  ```bash
    git clone git@github.com:DaniloBertolini/store-manager.git
  ```
  - Renomeie o `env.example` arquivo para `.env`.
  - Instale as dependências.
  ```bash
    npm install
  ```
  - Inicie o servidor de desenvolvimento.
  ```bash
    env $(cat .env) npm run dev
  ```

## :zap: Usando solicitações HTTP para usar a API
  - Acesse uma plataforma de sua preferência para fazer solicitações HTTP, como [ThunderClient](https://www.thunderclient.com/) ou [Insomnia](https://insomnia.rest/) 
  - Importe o arquivo de solicitação HTTP válido para sua plataforma da past `requestCollection`.
  - Agora você pode testar esta API.
