import { IMatchCreate } from '../interfaces/IMatch';
import IMatchesModel from '../interfaces/models/IMatchesModel';
import IMatchesDTO from '../interfaces/dtos/IMatchDTO';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesModel implements IMatchesModel {
  private _model: typeof Matches;

  constructor() {
    this._model = Matches;
  }

  async findAll(): Promise<IMatchesDTO[] | null> {
    const matches = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async findAllByProgress(status: boolean): Promise<IMatchesDTO[] | null> {
    const matches = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        inProgress: status,
      },
    });
    return matches;
  }

  async create(match: IMatchCreate): Promise<IMatchesDTO | null> {
    const newMatch = await this._model.create({ ...match, inProgress: true });
    return newMatch;
  }

  async update(id: string): Promise<string> {
    const updatedMatch = await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch ? 'ok' : 'false';
  }
}
