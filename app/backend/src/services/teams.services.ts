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
}
