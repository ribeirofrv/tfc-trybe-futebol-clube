import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import * as jwtAuth from '../auth/jwt.auth';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testes para a rota /matches', function () {
  describe('GET /matches', function () {
    afterEach(() => sinon.restore());

    it('Retorna todos os jogos', async function () {
      const matches = [
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: false,
          teamHome: {
            teamName: 'São Paulo',
          },
          teamAway: {
            teamName: 'Grêmio',
          },
        },
        {
          id: 41,
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 9,
          awayTeamGoals: 0,
          inProgress: true,
          teamHome: {
            teamName: 'São Paulo',
          },
          teamAway: {
            teamName: 'Internacional',
          },
        },
      ];
      sinon.stub(Model, 'findAll').resolves(matches as Matches[]);

      const httpResponse = await chai.request(app).get('/matches');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('array');
      expect(httpResponse.body).to.have.length(2);
    });

    it('Retorna todos os jogos em andamento', async function () {
      const matches = [
        {
          id: 41,
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 9,
          awayTeamGoals: 0,
          inProgress: true,
          teamHome: {
            teamName: 'São Paulo',
          },
          teamAway: {
            teamName: 'Internacional',
          },
        },
        {
          id: 42,
          homeTeam: 6,
          homeTeamGoals: 1,
          awayTeam: 1,
          awayTeamGoals: 0,
          inProgress: true,
          teamHome: {
            teamName: 'Ferroviária',
          },
          teamAway: {
            teamName: 'Avaí/Kindermann',
          },
        },
      ];
      sinon.stub(Model, 'findAll').resolves(matches as Matches[]);

      const httpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('array');
      expect(httpResponse.body).to.have.length(2);
    });

    it('Retorna todos os jogos finalizados', async function () {
      const matches = [
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: false,
          teamHome: {
            teamName: 'São Paulo',
          },
          teamAway: {
            teamName: 'Grêmio',
          },
        },
        {
          id: 2,
          homeTeam: 9,
          homeTeamGoals: 1,
          awayTeam: 14,
          awayTeamGoals: 1,
          inProgress: false,
          teamHome: {
            teamName: 'Internacional',
          },
          teamAway: {
            teamName: 'Santos',
          },
        },
      ];
      sinon.stub(Model, 'findAll').resolves(matches as Matches[]);

      const httpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('array');
      expect(httpResponse.body).to.have.length(2);
    });
  });

  describe('POST /matches', function () {
    afterEach(() => sinon.restore());

    it('Cria um novo jogo', async function () {
      const matchReq = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };

      const matchRes = {
        ...matchReq,
        id: 1,
        inProgress: true,
      };

      const adminToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY4MTkxNjI5fQ.mWVGztN-Lsy_l7TrgE2vL2V5dL-f47KXTO-GuzljIT0';

      sinon.stub(Model, 'create').resolves(matchRes as Matches);
      sinon.stub(jwtAuth, 'verifyToken').resolves();

      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(matchReq);

      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.be.a('object');
      expect(httpResponse.body).to.have.property('id');
      expect(httpResponse.body).to.have.property('homeTeam');
      expect(httpResponse.body).to.have.property('homeTeamGoals');
      expect(httpResponse.body).to.have.property('awayTeam');
      expect(httpResponse.body).to.have.property('awayTeamGoals');
      expect(httpResponse.body).to.have.property('inProgress');
    });

    it('Não permite criar um novo jogo sem token JWT', async function () {
      const matchReq = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };

      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer`)
        .send(matchReq);

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.be.a('object');
      expect(httpResponse.body).to.have.property('message');
      expect(httpResponse.body.message).to.equal('Token must be a valid token');
    });

    it('Não permite criar um novo jogo com times iguais', async function () {
      const matchReq = {
        homeTeam: 16,
        awayTeam: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const matchRes = {
        ...matchReq,
        id: 1,
        inProgress: true,
      };
      const adminToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY4MTkxNjI5fQ.mWVGztN-Lsy_l7TrgE2vL2V5dL-f47KXTO-GuzljIT0';

      sinon.stub(Model, 'create').resolves(matchRes as Matches);
      sinon.stub(jwtAuth, 'verifyToken').resolves();

      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer`)
        .send(matchReq);

      expect(httpResponse.status).to.equal(422);
      expect(httpResponse.body).to.be.a('object');
      expect(httpResponse.body).to.have.property('message');
      expect(httpResponse.body.message).to.equal(
        'It is not possible to create a match with two equal teams'
      );
    });

    it('Não permite criar um novo jogo com times inexistente', async function () {
      const matchReq = {
        homeTeam: 1006,
        awayTeam: 8000,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const matchRes = {
        ...matchReq,
        id: 1,
        inProgress: true,
      };
      const adminToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWls';
      sinon.stub(Model, 'create').resolves(matchRes as Matches);
      sinon.stub(jwtAuth, 'verifyToken').resolves();

      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(matchReq);

      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.be.a('object');
      expect(httpResponse.body).to.have.property('message');
      expect(httpResponse.body.message).to.equal(
        'There is no team with such id!'
      );
    });
  });
});
