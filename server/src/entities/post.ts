import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    ManyToMany,
    BaseEntity,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { PostMetaData } from './postmetadata';
import { User } from './user';
import { Tag } from './tag';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    body: string;

    @OneToOne(
        () => PostMetaData,
        meta => meta.post,
        {
            cascade: true,
            onDelete: 'CASCADE',
        }
    )
    metadata: PostMetaData;

    @ManyToOne(
        type => User,
        user => user.posts
    )
    user: User;

    @ManyToMany(
        type => Tag,
        tag => tag.posts,
        {
            cascade: true,
            onDelete: 'CASCADE',
        }
    )
    tags: Tag[];
}
