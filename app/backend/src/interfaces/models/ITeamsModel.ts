import ITeamDTO from '../dtos/ITeamDTO';

export default interface ITeamsModel {
  findAll(): Promise<ITeamDTO[] | null>;
  findOne(id: number): Promise<ITeamDTO | null>;
}
