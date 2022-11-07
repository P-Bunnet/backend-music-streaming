import { ObjectId } from 'mongoose'

export interface SongType {
    userId: ObjectId
    filename: string
    mimeType: string
    title: string
    genre?: string
    release?: Date
    duration: number
    lyrics?: string
    uploaded: Date
}
