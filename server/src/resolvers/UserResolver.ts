import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import { compare, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'entities/user';
import { getConnection, getManager } from 'typeorm';
import { Context, ContextPayload } from '../types/services/context';
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from '../services/auth';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;

    @Field()
    user: User;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return 'hi!';
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
            user,
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
                throw new Error('User already exist');
            }
            const hashedPassword = await hash(password, 10);

            const user = new User();
            user.password = hashedPassword;
            user.email = email;
            await user.save();
            return true;
        } catch (error) {
            throw error;
        }
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: Context): Promise<User | null> {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error('no token in headers');

            const payload = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as ContextPayload;

            if (!payload.id) return null;

            const user = await User.findOne({ id: payload.id });
            if (!user) return null;
            return user;
        } catch (error) {
            throw error;
        }
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: Context) {
        res.clearCookie('jid');
        return true;
    }
}
