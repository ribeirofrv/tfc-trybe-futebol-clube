import { Request, Response } from 'express';
import ITeamsService from '../interfaces/services/ITeamsService';

export default class TeamsController {
  private readonly teamsService: ITeamsService;

  constructor(teamsService: ITeamsService) {
    this.teamsService = teamsService;
  }

  public async findAll(_request: Request, response: Response) {
    const allTeams = await this.teamsService.findAll();
    response.status(200).json(allTeams);
  }

  public async findOne(request: Request, response: Response) {
    const { id } = request.params;
    const team = await this.teamsService.findOne(Number(id));
    response.status(200).json(team);
  }
}
