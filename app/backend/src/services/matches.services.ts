import MatchesModel from '../models/matches.model';
import IMatchesDTO from '../interfaces/dtos/IMatchDTO';

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
}
