import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    BaseEntity,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import {
    ObjectType,
    Field,
    Int,
    registerEnumType,
    InputType,
} from 'type-graphql';

import { User } from './user';
import { Comment } from './comment';

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

    @JoinColumn({ name: 'userId' })
    @ManyToOne(
        () => User,
        user => user.posts
    )
    user: User;
    @Column()
    userId: number;

    @OneToMany(
        () => Comment,
        comment => comment.post,
        {
            cascade: true,
        }
    )
    @Field(() => [Comment])
    comments: Comment[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
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
