import {
    Query,
    Resolver,
    Mutation,
    Arg,
    UseMiddleware,
    Int,
    Ctx,
} from 'type-graphql';
import { BaseResolver } from './BaseResolver';

import { Post, PostBody, PostPreview, Comment } from 'entities';
import { checkAuth } from 'middlewares/checkJwt';
import { ApiResponse } from 'utils/ApiHandler';

import { Context } from 'types/services/context';

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
        return Post.findOne(
            {
                id,
            },
            {
                relations: ['comments', 'comments.user', 'comments.replies'],
            }
        );
    }

    @Mutation(() => Post)
    @UseMiddleware(checkAuth)
    async addPost(
        @Ctx() { payload }: Context<true>,
        @Arg('title') title: string,
        @Arg('body') body: PostBody
    ): Promise<Post> {
        const newPost = new Post();

        newPost.title = title;
        newPost.body = body;
        newPost.userId = payload.id;

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
        const atomicType = body.blocks.find(
            ({ type, entityRanges }) =>
                type === 'atomic' && entityRanges.length === 1
        );

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
    async postsPreview(
        @Arg('skip', () => Int) skip: number,
        @Arg('take', () => Int) take: number
    ): Promise<PostPreview[]> {
        const posts = await Post.find({
            skip,
            take,
        });

        return posts.map(this.getPostPreview);
    }

    @Query(() => Int)
    getAmountOfPosts(): Promise<number> {
        return Post.count();
    }

    @Mutation(() => Comment, {
        name: 'leaveComment',
    })
    @UseMiddleware(checkAuth)
    async leaveComment(
        @Ctx() { payload }: Context<true>,
        @Arg('text') text: string,
        @Arg('postId', () => Int) postId: number,
        @Arg('replayId', () => Int, { nullable: true }) replayId: number
    ) {
        const comment = new Comment();

        comment.userId = payload.id;
        comment.text = text;
        comment.postId = postId;
        comment.replayId = replayId;

        const { id } = await comment.save();

        return Comment.findOne(id);
    }
}
