import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Post } from './post';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(
        type => Post,
        post => post.tags
    )
    @JoinTable()
    posts: Post[];
}
