import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();
const leaderboardRoutes = Router();

leaderboardRoutes.get(
  '/leaderboard/home',
  (req, res, next) => leaderboardController.getLeaderboardHome(req, res, next),
);

export default leaderboardRoutes;
