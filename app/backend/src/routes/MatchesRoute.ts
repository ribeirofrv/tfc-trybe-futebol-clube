import { Router } from 'express';
import authentication from '../middlewares/authentication';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.services';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);
const matchesRouter = Router();

matchesRouter
  .patch('/matches/:id/finish', authentication, (req, res) => {
    matchesController.updateProgress(req, res);
  })
  .patch('/matches/:id', authentication, (req, res) => {
    matchesController.updateMatch(req, res);
  })
  .get('/matches', (req, res) => matchesController.findAllMatches(req, res))
  .post('/matches', authentication, (req, res, next) => {
    matchesController.createMatch(req, res, next);
  });

export default matchesRouter;
