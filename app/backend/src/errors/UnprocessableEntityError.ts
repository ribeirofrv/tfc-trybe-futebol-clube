export default class UnprocessableEntityError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);

    this.status = 422;
  }
}
