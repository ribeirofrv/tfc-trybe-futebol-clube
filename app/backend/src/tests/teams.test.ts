import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import TeamsService from '../services/teams.services';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /teams', function () {
  describe('GET /teams', function () {
    it('Retorna todos os times', async function () {
      const teams = [
        {
          id: 1,
          teamName: 'Corinthians',
        },
        {
          id: 2,
          teamName: 'Fluminense',
        },
      ];
      sinon.stub(Model, 'findAll').resolves(teams as Teams[]);

      const httpResponse = await chai.request(app).get('/teams');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('array');
      expect(httpResponse.body).to.have.length(2);
      sinon.restore();
    });
  });
});
