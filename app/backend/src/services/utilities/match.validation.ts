import BadRequestError from '../../errors/BadRequestError';
import UnprocessableEntityError from '../../errors/UnprocessableEntityError';
import { ITeamsToMatch } from '../../interfaces/IMatch';
import TeamsModel from '../../models/teams.model';

export default async function validateMatch(match: ITeamsToMatch): Promise<void> {
  const model = new TeamsModel();

  const { homeTeam, awayTeam } = match;

  const itsTheSameTeam = homeTeam === awayTeam;
  if (itsTheSameTeam) {
    throw new UnprocessableEntityError(
      'It is not possible to create a match with two equal teams',
    );
  }

  const homeTeamExists = await model.findOne(homeTeam);
  const awayTeamExists = await model.findOne(awayTeam);

  const teamDoesNotExist = !homeTeamExists || !awayTeamExists;

  if (teamDoesNotExist) throw new BadRequestError('There is no team with such id!');
}
