import BadRequestError from '../errors/BadRequestError';
import ITeamDTO from '../interfaces/ITeam';
import TeamsModel from '../models/teams.model';

export default class TeamsService {
  private _model: TeamsModel;

  constructor() {
    this._model = new TeamsModel();
  }

  public async findAll(): Promise<ITeamDTO[] | null> {
    const allTeams = await this._model.findAll();
    return allTeams;
  }

  public async findOne(id: number): Promise<ITeamDTO | null> {
    const team = await this._model.findOne(id);
    if (!team) throw new BadRequestError('There is no team with such id!');
    return team;
  }
}
