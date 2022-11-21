import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();
const leaderboardRoutes = Router();

leaderboardRoutes
  .get('/leaderboard/home', (req, res, next) =>
    leaderboardController.getLeaderboardHome(req, res, next))
  .get('/leaderboard/away', (req, res, next) =>
    leaderboardController.getLeaderboardAway(req, res, next));

export default leaderboardRoutes;
