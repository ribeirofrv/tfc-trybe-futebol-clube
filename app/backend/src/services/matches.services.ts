// import UnprocessableEntityError from '../errors/UnprocessableEntityError';
// import UnauthorizedError from '../errors/UnauthorizedError';

import { IMatchCreate } from '../interfaces/IMatch';
import MatchesModel from '../models/matches.model';
import IMatchesDTO from '../interfaces/dtos/IMatchDTO';
import validateMatch from './utilities/match.validation';

export default class MatchesService {
  private _model: MatchesModel;

  constructor() {
    this._model = new MatchesModel();
  }

  public async findAllMatches(status: string): Promise<IMatchesDTO[] | null> {
    if (status) {
      const isInProgress = status === 'true';
      const matchesByProgress = await this._model.findAllByProgress(isInProgress);
      return matchesByProgress;
    }

    const allMatches = await this._model.findAll();
    return allMatches;
  }

  public async createMatch(match: IMatchCreate): Promise<IMatchesDTO | null> {
    const { homeTeam, awayTeam } = match;
    await validateMatch({ homeTeam, awayTeam });
    const newMatch = await this._model.create(match);
    return newMatch;
  }

  public async updateProgress(id: string): Promise<string> {
    const result = await this._model.update(id);
    return result;
  }

  public async updateMatch(id: string, goals: IMatchCreate): Promise<string> {
    const result = await this._model.updateMatch(id, goals);
    return result;
  }
}
