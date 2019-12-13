import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import { PostMetaData } from './postmetadata';
import { User } from './user';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @OneToOne(
        type => PostMetaData,
        meta => meta.post,
        {
            cascade: true,
        }
    )
    metadata: PostMetaData;

    @ManyToOne(
        type => User,
        user => user.posts
    )
    user: User;
}
