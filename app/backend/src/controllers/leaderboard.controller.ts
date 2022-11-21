import { NextFunction, Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboard.services';

export default class LeaderboardController {
  private _leaderboardServices: LeaderboardServices;

  constructor() {
    this._leaderboardServices = new LeaderboardServices();
  }

  async getLeaderboardHome(
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const leaderboard = await this._leaderboardServices.getLeaderboardHome();
      response.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }

  async getLeaderboardAway(
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const leaderboard = await this._leaderboardServices.getLeaderboardAway();
      response.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }

  async getLeaderboardTotal(
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const leaderboard = await this._leaderboardServices.getLeaderboardTotal();
      response.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
