import { Query, Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { Post } from 'entities';
import { ApiResponse } from 'utils/ApiHandler';
import { checkAuth } from 'middlewares/checkJwt';

@Resolver()
export class PostResolver {
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
