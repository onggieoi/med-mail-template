import { Field, InputType, ObjectType, Int, } from "type-graphql";

// Inputs
@InputType()
export class Input {
  @Field()
  username: string

  @Field()
  password: string

  @Field()
  fullname: string
}

@ObjectType()
export class Respone {
  @Field(() => Int, { nullable: true })
  user!: number;

  @Field(() => String, { nullable: true })
  name?: string;
}

