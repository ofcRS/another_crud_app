import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

import { Post } from './post';
import { Comment } from './comment';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(
        () => Post,
        post => post.user
    )
    posts: Post[];

    @Column('int', { default: 0 })
    tokenVersion: number;

    @OneToMany(
        () => Comment,
        comment => comment.user
    )
    comments: Comment[];
}
