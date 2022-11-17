import { IMatch } from '../IMatch';

export default interface IMatchesDTO extends IMatch {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
