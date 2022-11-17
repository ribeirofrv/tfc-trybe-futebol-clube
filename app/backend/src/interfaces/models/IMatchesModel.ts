import IMatchesDTO from '../dtos/IMatchDTO';

export default interface IMatchesModel {
  findAll(): Promise<IMatchesDTO[] | null>;
  findAllByProgress(status: boolean): Promise<IMatchesDTO[] | null>;
  create(match: IMatchesDTO): Promise<IMatchesDTO | null>;
}
