import {
    Query,
    Resolver,
    Mutation,
    Arg,
    UseMiddleware,
    Int,
} from 'type-graphql';
import { BaseResolver } from './BaseResolver';

import { Post, PostBody } from 'entities';
import { checkAuth } from 'middlewares/checkJwt';
import { ApiResponse } from 'utils/ApiHandler';
import { PostPreview } from 'entities/post';

@Resolver()
export class PostResolver extends BaseResolver {
    @Query(() => [Post])
    posts() {
        return Post.find({
            order: {
                id: 'DESC',
            },
        });
    }

    @Query(() => Post, {
        nullable: true,
    })
    getPost(@Arg('id', () => Int) id: number) {
        return Post.findOne({
            id,
        });
    }

    @Mutation(() => Post)
    @UseMiddleware(checkAuth)
    async addPost(
        @Arg('title') title: string,
        @Arg('body') body: PostBody
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

    getPostPreview({ body, title, id }: Post): PostPreview {
        const atomicType = body.blocks.find(({ type }) => type === 'atomic');

        let previewImage: null | string = null;

        if (atomicType) {
            const [{ key }] = atomicType.entityRanges;
            const { src } = body.entityMap[key].data;
            previewImage = src;
        }

        return {
            title,
            bodyPreview: body.blocks?.[0].text,
            imageSrc: previewImage,
            id,
        };
    }

    @Query(() => [PostPreview])
    async postsPreview(): Promise<PostPreview[]> {
        const posts = await Post.find();

        return posts.map(this.getPostPreview);
    }
}
