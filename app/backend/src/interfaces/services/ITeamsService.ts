import ITeamDTO from '../ITeam';

export default interface ITeamsService {
  findAll(): Promise<ITeamDTO[] | null>;
  findOne(id: number): Promise<ITeamDTO | null>;
}
