import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import Matches from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /matches', function () {
  describe('GET /matches', function () {
    it('Retorna todos os jogos', async function () {
      const matches = [
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 41,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Internacional"
          }
        }
      ];
      sinon.stub(Model, 'findAll').resolves(matches as Matches[]);

      const httpResponse = await chai.request(app).get('/matches');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('array');
      expect(httpResponse.body).to.have.length(2);
      sinon.restore();
    });

    it('Retorna todos os jogos em andamento', async function () {
      const matches = [
        {
          "id": 41,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Internacional"
          }
        },
        {
          "id": 42,
          "homeTeam": 6,
          "homeTeamGoals": 1,
          "awayTeam": 1,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "Ferroviária"
          },
          "teamAway": {
            "teamName": "Avaí/Kindermann"
          }
        }
      ];
      sinon.stub(Model, 'findAll').resolves(matches as Matches[]);

      const httpResponse = await chai.request(app).get('/matches?inProgress=true');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('array');
      expect(httpResponse.body).to.have.length(2);
      sinon.restore();
    });

    it('Retorna todos os jogos finalizados', async function () {
      const matches = [
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 2,
          "homeTeam": 9,
          "homeTeamGoals": 1,
          "awayTeam": 14,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
            "teamName": "Internacional"
          },
          "teamAway": {
            "teamName": "Santos"
          }
        }
      ];
      sinon.stub(Model, 'findAll').resolves(matches as Matches[]);

      const httpResponse = await chai.request(app).get('/matches?inProgress=false');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('array');
      expect(httpResponse.body).to.have.length(2);
      sinon.restore();
    });
  });
});
