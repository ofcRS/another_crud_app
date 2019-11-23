import { RecordPost } from 'shared/types/Post';
import { WithRowDataPacket } from './services/db';

export type DBPost = WithRowDataPacket<RecordPost>;
