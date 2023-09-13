import { Model } from "objection";

export class PersonModel extends Model {
  static tableName: string = "persons";

  public id!: string;
  public name!: string;
}
