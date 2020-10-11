import { Query, Resolver, Mutation, Arg } from 'type-graphql';

import { Post } from 'entities';
import { ApiResponse } from 'utils/ApiHandler';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    // @UseMiddleware(checkAuth)
    posts() {
        return Post.find();
    }

    @Mutation(() => Post)
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
    async deletePost(@Arg('id') id: number): Promise<ApiResponse> {
        await Post.delete(id);
        return {
            data: id,
            ok: true,
        };
    }
}
