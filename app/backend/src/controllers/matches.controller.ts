import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  private readonly matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  public async findAllMatches(request: Request, response: Response) {
    const { inProgress } = request.query;
    const matches = await this.matchesService.findAllMatches(inProgress as string);
    response.status(200).json(matches);
  }
}
