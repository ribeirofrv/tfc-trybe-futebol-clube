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

  public async createMatch(request: Request, response: Response) {
    const { body } = request;
    const newMatch = await this.matchesService.createMatch(body);
    response.status(201).json(newMatch);
  }

  public async updateProgress(request: Request, response: Response) {
    const { id } = request.params;
    const updated = await this.matchesService.updateProgress(id);
    response.status(200).json({ updated });
  }
}
