import ITeamsModel from '../interfaces/models/ITeamsModel';
import ITeamDTO from '../interfaces/dtos/ITeamDTO';
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

  async findOne(id: number): Promise<ITeamDTO | null> {
    const team = await this._model.findOne({ where: { id } });
    return team as ITeamDTO;
  }
}
