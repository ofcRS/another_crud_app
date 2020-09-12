import { Resolver, Query } from 'type-graphql';

import { Post } from 'entities';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    // @UseMiddleware(checkAuth)
    posts() {
        return Post.find();
    }
}
