import ITeamDTO from '../dtos/ITeamDTO';

export default interface ITeamsService {
  findAll(): Promise<ITeamDTO[] | null>;
  findOne(id: number): Promise<ITeamDTO | null>;
}
