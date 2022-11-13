import { Router } from 'express';
import TeamsService from '../services/teams.services';
import TeamsController from '../controllers/teams.controller';
import ITeamsService from '../interfaces/services/ITeamsService';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService as ITeamsService);
const teamsRouter = Router();

teamsRouter
  .get('/teams', (req, res) => teamsController.findAll(req, res))
  .get('/teams/:id', (req, res) => teamsController.findOne(req, res));

export default teamsRouter;
