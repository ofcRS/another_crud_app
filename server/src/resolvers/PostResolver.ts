import { Resolver, Query, UseMiddleware } from 'type-graphql';

import { Post } from 'entities';
import { checkAuth } from 'middlewares/checkJwt';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    @UseMiddleware(checkAuth)
    posts() {
        return Post.find();
    }
}
