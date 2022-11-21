import { NextFunction, Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboard.services';

export default class LeaderboardController {
  private _leaderboardServices: LeaderboardServices;

  constructor() {
    this._leaderboardServices = new LeaderboardServices();
  }

  async getLeaderboardHome(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const leaderboard = await this._leaderboardServices.getLeaderboardHome();
      res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
