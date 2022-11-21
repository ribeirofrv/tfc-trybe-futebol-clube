import IMatchesDTO from '../interfaces/dtos/IMatchDTO';
import MatchesModel from '../models/matches.model';
import { ITotalOfPoints } from '../interfaces/ITeam';

export default class LeaderboardService {
  private _matchesModel: MatchesModel;

  constructor() {
    this._matchesModel = new MatchesModel();
  }

  async getLeaderboardHome(): Promise<ITotalOfPoints[]> {
    const allMatches = await this._matchesModel.findAll();
    const homeGames = allMatches?.filter((game) => !game.inProgress);
    const pointsPerHomeMatch = LeaderboardService.pointsPerHomeMatch(
      homeGames as IMatchesDTO[],
    );
    const countPointsPerMatch = LeaderboardService.countPointsPerMatch(
      pointsPerHomeMatch as ITotalOfPoints[],
    );
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(
      countPointsPerMatch as ITotalOfPoints[],
    );
    return sortedLeaderboard;
  }

  async getLeaderboardAway(): Promise<ITotalOfPoints[]> {
    const allMatches = await this._matchesModel.findAll();
    const awayGames = allMatches?.filter((game) => !game.inProgress);
    const pointsPerAwayGame = LeaderboardService.pointsPerAwayGame(
      awayGames as IMatchesDTO[],
    );
    const countPointsPerMatch = LeaderboardService.countPointsPerMatch(
      pointsPerAwayGame as ITotalOfPoints[],
    );
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(
      countPointsPerMatch as ITotalOfPoints[],
    );
    return sortedLeaderboard;
  }

  async getLeaderboardTotal(): Promise<ITotalOfPoints[]> {
    const allMatches = await this._matchesModel.findAll();
    const finishMatches = allMatches?.filter((game) => !game.inProgress);
    const homeGames = LeaderboardService
      .pointsPerHomeMatch(finishMatches as IMatchesDTO[]);
    const awayGames = LeaderboardService
      .pointsPerAwayGame(finishMatches as IMatchesDTO[]);
    const totalGames = LeaderboardService
      .countPointsPerMatch([...homeGames, ...awayGames] as ITotalOfPoints[]);
    const sortedLeaderboard = LeaderboardService
      .sortLeaderboard(totalGames as ITotalOfPoints[]);
    return sortedLeaderboard;
  }

  static sortLeaderboard(leaderboard: ITotalOfPoints[]) {
    return leaderboard.sort(
      (first, second) =>
        second.totalPoints - first.totalPoints
        || second.totalVictories - first.totalVictories
        || second.goalsBalance - first.goalsBalance
        || second.goalsFavor - first.goalsFavor
        || first.goalsOwn - second.goalsOwn,
    );
  }

  static pointsPerHomeMatch(homeGames: IMatchesDTO[]) {
    return homeGames?.map(({ teamHome, homeTeamGoals, awayTeamGoals }) => {
      let scores = { points: 0, victory: 0, draw: 0, loss: 0 };
      if (homeTeamGoals > awayTeamGoals) { scores = { ...scores, points: 3, victory: 1 }; }
      if (homeTeamGoals === awayTeamGoals) { scores = { ...scores, points: 1, draw: 1 }; }
      if (homeTeamGoals < awayTeamGoals) scores = { ...scores, loss: 1 };
      return {
        name: teamHome.teamName,
        totalPoints: scores.points,
        totalVictories: scores.victory,
        totalDraws: scores.draw,
        totalLosses: scores.loss,
        goalsFavor: homeTeamGoals,
        goalsOwn: awayTeamGoals,
        goalsBalance: 0,
        efficiency: '0.0',
      };
    });
  }

  static countPointsPerMatch(matches: ITotalOfPoints[]) {
    const ratings = [] as ITotalOfPoints[];
    return matches.reduce((acc, match) => {
      const index = acc.findIndex((team: ITotalOfPoints) => team.name === match.name);
      if (index === -1) { acc.push({ ...match, totalGames: 1 } as ITotalOfPoints); } else {
        acc[index].totalPoints += match.totalPoints;
        acc[index].totalGames += 1;
        acc[index].totalVictories += match.totalVictories;
        acc[index].totalDraws += match.totalDraws;
        acc[index].totalLosses += match.totalLosses;
        acc[index].goalsFavor += match.goalsFavor;
        acc[index].goalsOwn += match.goalsOwn;
        acc[index].goalsBalance = acc[index].goalsFavor - acc[index].goalsOwn;
        acc[index].efficiency = (
          (acc[index].totalPoints / (acc[index].totalGames * 3)) * 100).toFixed(2);
      }
      return acc;
    }, ratings);
  }

  static pointsPerAwayGame(awayGames: IMatchesDTO[]) {
    return awayGames?.map(({ teamAway, homeTeamGoals, awayTeamGoals }) => {
      let scores = { points: 0, victory: 0, draw: 0, loss: 0 };
      if (awayTeamGoals > homeTeamGoals) { scores = { ...scores, points: 3, victory: 1 }; }
      if (awayTeamGoals === homeTeamGoals) { scores = { ...scores, points: 1, draw: 1 }; }
      if (awayTeamGoals < homeTeamGoals) scores = { ...scores, loss: 1 };
      return {
        name: teamAway.teamName,
        totalPoints: scores.points,
        totalVictories: scores.victory,
        totalDraws: scores.draw,
        totalLosses: scores.loss,
        goalsFavor: awayTeamGoals,
        goalsOwn: homeTeamGoals,
        goalsBalance: 0,
        efficiency: '0.0',
      };
    });
  }
}
