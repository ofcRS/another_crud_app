import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    ManyToMany,
    BaseEntity,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { PostMetaData } from './postmetadata';
import { User } from './user';
import { Tag } from './tag';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    body: string;

    @OneToOne(
        type => PostMetaData,
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
