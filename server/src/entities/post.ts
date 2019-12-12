import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PostMetaData } from './postmetadata';

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
        meta => meta.post
    )
    metadata: PostMetaData;
}
