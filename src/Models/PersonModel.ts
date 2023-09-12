import { Model } from "objection";

export class PersonModel extends Model {
  static tableName: string = "person";

  public id!: string;
  public name!: string;
}
