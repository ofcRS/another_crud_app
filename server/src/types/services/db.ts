import { RowDataPacket } from 'mysql'

export type WithRowDataPacket<T> = T & RowDataPacket
