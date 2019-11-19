import { RowDataPacket } from 'mysql2'
import { RecordPost } from 'shared/types/Post';

export type DBPost = RecordPost & RowDataPacket
