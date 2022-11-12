import ITeamsModel from '../interfaces/models/ITeamsModel';
import ITeamDTO from '../interfaces/ITeam';
import Teams from '../database/models/TeamsModel';

export default class TeamsModel implements ITeamsModel {
  private _model: typeof Teams;

  constructor() {
    this._model = Teams;
  }

  async findAll(): Promise<ITeamDTO[] | null> {
    const allTeams = await this._model.findAll();
    return allTeams;
  }
}
