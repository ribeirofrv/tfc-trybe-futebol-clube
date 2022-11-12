import ITeamDTO from '../ITeam';

export default interface ITeamsModel {
  findAll(): Promise<ITeamDTO[] | null>;
}
