export interface IMatchCreate {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface IMatch extends IMatchCreate {
  id: number;
  inProgress: boolean;
}
