import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User } from './user';
import { Post } from './post';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ManyToOne(
        () => Post,
        post => post.comments,
        {
            onDelete: 'CASCADE',
        }
    )
    @Field(() => Post)
    @JoinColumn({ name: 'postId' })
    post: Post;
    @Column()
    postId: number;

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.comments,
        {
            eager: true,
        }
    )
    @JoinColumn({ name: 'userId' })
    user: User;
    @Column()
    userId: number;

    @Column()
    @Field()
    text: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    replayId: number;

    @Field(() => [Comment], { nullable: true })
    @ManyToOne(
        () => Comment,
        comment => comment.id
    )
    @JoinColumn({ name: 'replayId' })
    replies: Comment[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
