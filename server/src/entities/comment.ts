import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { Post } from './post';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @ManyToOne(
        () => Post,
        post => post.comments
    )
    @Field(() => Post)
    @JoinColumn({ name: 'postId' })
    post: Post;
    @Column()
    postId: number;

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.comments
    )
    @JoinColumn({ name: 'userId' })
    user: User;
    @Column()
    userId: number;

    @Column()
    @Field()
    text: string;
}
