import { Document, model, ObjectId, Schema } from 'mongoose'

export type TSong = {
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

export interface ISong extends TSong, Document {}

const songSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    filename: {
        type: String,
    },
    mimeType: {
        type: String,
    },
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    release: {
        type: Date,
        default: Date.now,
    },
    duration: {
        type: Number,
    },
    lyrics: {
        type: String,
    },
    uploaded: {
        type: Date,
        default: Date.now,
    },
})

const Song = model<ISong>('Song', songSchema)

export default Song
