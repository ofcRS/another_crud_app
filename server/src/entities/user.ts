import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

import { Post } from './post';

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
}
