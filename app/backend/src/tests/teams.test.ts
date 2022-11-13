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

  describe('GET /teams/:id', function () {
    it('Retorna um time específico identificado pelo id', async function () {
      const team = {
        id: 1,
        teamName: 'Corinthians',
      };
      sinon.stub(Model, 'findOne').resolves(team as Teams);

      const httpResponse = await chai.request(app).get('/teams/1');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.a('object');
      expect(httpResponse.body).to.have.property('id');
      expect(httpResponse.body).to.have.property('teamName');
      expect(httpResponse.body.id).to.equal(1);
      expect(httpResponse.body.teamName).to.equal('Corinthians');
      sinon.restore();
    });
  });
});
