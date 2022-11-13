import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.services';
// import IMatchesService from '../interfaces/services/IMatchesService';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);
const matchesRouter = Router();

matchesRouter
  .get('/matches', (req, res) => matchesController.findAllMatches(req, res));

export default matchesRouter;
