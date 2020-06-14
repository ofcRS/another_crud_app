import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql';
import { compare, hash } from 'bcrypt';
import { User } from 'entities/user';
import { getConnection, getManager } from 'typeorm';
import { Context } from '../types/services/context';
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from '../services/auth';
import { checkAuth } from '../middlewares/checkJwt';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return 'hi!';
    }

    @Query(() => String)
    @UseMiddleware(checkAuth)
    bye(@Ctx() { payload }: Context): string {
        return `bye, ${payload?.id}!`;
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => Boolean) async revokeRefreshTokens(@Arg('id') id: number) {
        await getConnection()
            .getRepository(User)
            .increment({ id }, 'tokenVersion', 1);
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: Context
    ): Promise<LoginResponse> {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error('Password is incorrect');
        }

        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<boolean> {
        try {
            const userRepository = getManager().getRepository(User);

            const userWithSameEmail = await userRepository.findOne({
                where: {
                    email,
                },
            });

            if (userWithSameEmail) {
                throw 'User already exist';
            }
            const hashedPassword = await hash(password, 10);

            const user = new User();
            user.password = hashedPassword;
            user.email = email;
            await user.save();
            return true;
        } catch (error) {
            return false;
        }
    }
}
