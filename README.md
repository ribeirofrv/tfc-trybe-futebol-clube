
# Trybe Futebol Clube

O Trybe Futebol Clube é um site informativo sobre partidas e classificações de futebol.
Ele foi construído com as seguintes tecnologias:

Back-end: Node.js e TypeScript/Express com Docker, Banco de Dados relacional e não relacional, ORM, Testes com Mocha, Chai e Sinon, construção de APIs em camadas, REST, autenticação com JWT, POO e SOLID; <br/>
Front-end: O design e implementação do front end foram fornecidos pela Trybe.

O site utiliza uma API em ambiente dockerizado, utilizando modelagem de dados através do Sequelize.

![frontendimg](https://user-images.githubusercontent.com/26294585/231933124-fe40d218-0416-41a6-92d2-132b936c0866.png)


## Como executar o projeto 💻

Para executar o projeto em sua máquina, siga os passos abaixo:

1. Clone este repositório para a sua máquina;
2. Instale as dependências do projeto com o comando `npm install` na pasta raiz do projeto;
3. Execute o comando `npm run dev` para iniciar o servidor backend;
4. Execute o comando npm start para iniciar o servidor frontend;
5. Abra o seu navegador e acesse http://localhost:3000.

### Via Docker
>Seu docker-compose precisa estar na versão 1.29 ou superior.

1. Clone este repositório para a sua máquina;
2. Rode os serviços `react` , `node` e `db` com o comando:
  ```
  npm run compose:up
  ```
>Esses serviços irão inicializar um container chamado `app-frontend-1` , `app_backend` e outro chamado `db`;
3. Abra terminal interativo do container criado pelo compose
  ```
  docker exec -it app_backend bash
  ```
4. Instale as dependências dentro do container e inicialize com:
  ```
  npm install
  npm run debug
  ```
5. Abra o seu navegador e acesse http://localhost:3000.

Projeto desenvolvido durante o curso da Trybe. 🚀
