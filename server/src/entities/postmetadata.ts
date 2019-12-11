import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from './post';

@Entity()
export class PostMetaData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    publicationDate: Date;

    @Column()
    anotherColumn: string;

    @OneToOne(type => Post)
    @JoinColumn()
    post: Post;
}
