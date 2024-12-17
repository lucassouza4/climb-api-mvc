export type AscentProps = {
  id: string;
  userId: string;
  boulderId: string;
};
export class Ascent {
  private constructor(readonly props: AscentProps) {}

  public static build(userId: string, boulderId: string) {
    return new Ascent({
      id: crypto.randomUUID().toString(),
      userId: userId,
      boulderId: boulderId,
    });
  }

  public static with(id: string, userId: string, boulderId: string) {
    return new Ascent({ id, userId, boulderId });
  }

  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get boulderId() {
    return this.props.boulderId;
  }
}
