import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    ManyToMany,
    BaseEntity,
} from 'typeorm';
import {
    ObjectType,
    Field,
    Int,
    registerEnumType,
    createUnionType,
} from 'type-graphql';

import { PostMetaData } from './postmetadata';
import { User } from './user';
import { Tag } from './tag';

@ObjectType()
@Entity()
class ContentBlock {
    @Field()
    key: string;
    @Field()
    type: string;
    @Field()
    text: string;
    @Field()
    depth: number;
    @Field(() => [String])
    inlineStyleRanges: string[];
    @Field(() => [String])
    entityRanges: string[];
}

enum Mutability {
    MUTABLE = 'MUTABLE',
    IMMUTABLE = 'IMMUTABLE',
    SEGMENTED = 'SEGMENTED',
}

registerEnumType(Mutability, {
    name: 'Mutability',
});

enum EntityType {
    IMAGE = 'IMAGE',
    LINK = 'LINK',
}

registerEnumType(EntityType, {
    name: 'entityType',
});

@ObjectType()
@Entity()
class LinkData {
    @Field(() => EntityType)
    type: EntityType.LINK;
    @Field()
    url: string;
}

@ObjectType()
@Entity()
class ImageData {
    @Field(() => EntityType)
    type: EntityType.IMAGE;
    @Field()
    url: string;
}

const EntityData = createUnionType({
    name: 'EntityData',
    types: () => [ImageData, LinkData] as const,
});

@ObjectType()
@Entity()
class EntityMap {
    @Field(() => Mutability)
    mutability: Mutability;

    @Field(() => EntityType)
    entity: EntityType;

    @Field(() => EntityData)
    data: typeof EntityData;
}

@ObjectType()
export class PostBody {
    @Field(() => [ContentBlock])
    blocks: ContentBlock[];

    @Field(() => [EntityMap])
    entityMap: EntityMap[];
}

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(() => PostBody)
    @Column('json')
    body: PostBody;

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
