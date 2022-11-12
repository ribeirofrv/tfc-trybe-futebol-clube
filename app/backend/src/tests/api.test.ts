import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import { app } from '../app';

chai.use(chaiHttp);

const { request, expect } = chai;

describe(`API it's alive!`, function () {
  it('Deve retornar com o http status code 200', async function () {
    const response = await request(app).get('/')
    expect(response.status).to.equal(200)
  })
})