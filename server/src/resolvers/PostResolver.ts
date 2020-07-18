import { Resolver, Query } from 'type-graphql';

import { Post } from 'entities';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts() {
        return Post.find();
    }
}
