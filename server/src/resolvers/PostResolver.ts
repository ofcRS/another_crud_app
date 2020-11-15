import { Query, Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { BaseResolver } from './BaseResolver';

import { Post } from 'entities';
import { checkAuth } from 'middlewares/checkJwt';
import { ApiResponse } from 'utils/ApiHandler';

@Resolver()
export class PostResolver extends BaseResolver {
    @Query(() => [Post])
    posts() {
        return Post.find();
    }

    @Mutation(() => Post)
    @UseMiddleware(checkAuth)
    async addPost(
        @Arg('title') title: string,
        @Arg('body') body: string
    ): Promise<Post> {
        const newPost = new Post();
        newPost.title = title;
        newPost.body = body;
        await newPost.save();
        return newPost;
    }

    @Mutation(() => ApiResponse)
    @UseMiddleware(checkAuth)
    async deletePost(@Arg('id') id: number): Promise<ApiResponse> {
        await Post.delete(id);
        return {
            data: id,
            ok: true,
        };
    }
}
