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
    InputType,
} from 'type-graphql';

import { PostMetaData } from './postmetadata';
import { User } from './user';
import { Tag } from './tag';

@InputType('inlineStyleRangeInput')
@ObjectType('inlineStyleRange')
class InlineStyleRange {
    @Field()
    style: string;
    @Field()
    offset: number;
    @Field()
    length: number;
}

@InputType('entityRangeInput')
@ObjectType('entityRange')
class EntityRange {
    @Field()
    key: number;
    @Field()
    offset: number;
    @Field()
    length: number;
}

@ObjectType('contentBlockData')
@InputType('contentBlockDataInput')
class ContentBlockData {}

@InputType('contentBlockInput')
@ObjectType('contentBlock')
class ContentBlock {
    @Field()
    key: string;
    @Field()
    type: string;
    @Field()
    text: string;
    @Field()
    depth: number;
    @Field(() => [InlineStyleRange])
    inlineStyleRanges: InlineStyleRange[];
    @Field(() => [EntityRange])
    entityRanges: EntityRange[];
    // @Field(() => ContentBlockData)
    // data: ContentBlockData;
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

@InputType('entityDataInput')
@ObjectType('entityData')
class EntityData {
    @Field(() => String, {
        nullable: true,
    })
    src: string;
}

@InputType('entityMapInput')
@ObjectType('entityMap')
class EntityMap {
    @Field(() => Mutability)
    mutability: Mutability;

    @Field(() => EntityType)
    type: EntityType;

    @Field(() => EntityData)
    data: EntityData;
}

@InputType('postBodyInput')
@ObjectType('postBody')
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

@ObjectType()
export class PostPreview {
    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    bodyPreview: string;

    @Field(() => String, {
        nullable: true,
    })
    imageSrc: string | null;
}
