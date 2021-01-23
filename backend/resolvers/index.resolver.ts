import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";

import { Input, Respone } from './Types';

@Resolver()
export class IndexResolver {
  @Mutation(() => UserRespone, { nullable: true })
  async userSignUp(
    @Arg("data") data: SignUpInput,
  ): Promise<UserRespone> {
    const { username, password, fullname } = data;

    try {
      await user.save();
    } catch (error) {
      console.log('------------ ERROR ----------------', error);
      if (error) return {
        errors: { field: 'user', message: 'something went srong' }
      }
    }

    return { user };
  }

  // Query Me
  @Query(() => UserRespone, { nullable: true })
  async me(
    @Ctx() { req }: MyContext
  ): Promise<UserRespone> {
    if (!req.session.userId) return { errors: { field: 'user', message: 'user not found' } };

    return { user: await User.findOne({ id: req.session.userId }) };
  }
}