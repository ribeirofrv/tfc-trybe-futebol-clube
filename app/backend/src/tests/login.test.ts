import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import User from '../database/models/UserModel';
import UserService from '../services/user.services';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', function () {
  describe('POST /login', function () {
    it('Com os dados corretos, retorna token do usuário e faz login', async function () {
      const user = {
        id: 1,
        username: 'Admin',
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY4MTkxNjI5fQ.mWVGztN-Lsy_l7TrgE2vL2V5dL-f47KXTO-GuzljIT0';
      sinon.stub(Model, 'findOne').resolves(user as User);
      sinon.stub(UserService.prototype, 'login').resolves(token);

      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.have.key('token');
      expect(httpResponse.body.token).to.be.a('string');
      sinon.restore();
    });

    it('Não permite login sem email e retorna status não-autorizado', async function () {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password: 'secret_admin' });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.have.key('message');
      expect(httpResponse.body.message).to.be.equal(
        'All fields must be filled'
      );
    });

    it('Não permite login com um email inválido', async function () {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'invalid_email@wrong.com', password: 'secret_admin' });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.have.key('message');
      expect(httpResponse.body.message).to.be.equal(
        'Incorrect email or password'
      );
    });

    it('Não permite login sem senha e retorna status não-autorizado', async function () {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: '' });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.have.key('message');
      expect(httpResponse.body.message).to.be.equal(
        'All fields must be filled'
      );
    });

    it('Não permite login com uma senha inválida', async function () {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'wrong_password' });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.have.key('message');
      expect(httpResponse.body.message).to.be.equal(
        'Incorrect email or password'
      );
    });
  });

  describe('GET /login/validate', function () {
    it('Não permite acesso sem token e retorna status não-autorizado', async function () {
      const httpResponse = await chai.request(app).get('/login/validate');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.have.key('message');
      expect(httpResponse.body.message).to.be.equal(
        'Token must be a valid token'
      );
    });

    it('Permite acesso com token válido e retorna um objeto com o tipo do usuário', async function () {
      const expectedResult = { role: 'admin' };
      const user = {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY4MTkxNjI5fQ.mWVGztN-Lsy_l7TrgE2vL2V5dL-f47KXTO-GuzljIT0';
      sinon.stub(Model, 'findOne').resolves(user as User);
      sinon.stub(UserService.prototype, 'validate').resolves('admin');
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(expectedResult);
      sinon.restore();
    });
  });
});
