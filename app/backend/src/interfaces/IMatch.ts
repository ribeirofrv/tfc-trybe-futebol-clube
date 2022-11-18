export interface ITeamsToMatch {
  homeTeam: number;
  awayTeam: number;
}

export interface IMatchCreate extends ITeamsToMatch {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IMatchCreate {
  id: number;
  inProgress: boolean;
}
