import Song, { ISong, TSong } from '../../models/Song'
import { getBucket } from '../../config/database'
import mongoose from 'mongoose'
async function postSong(song: TSong) {
    try {
        const newSong = new Song(song)
        await newSong.save()
        return {
            status: 200,
            message: newSong,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: 500,
            message: 'Server error',
        }
    }
}

async function getAllSongs() {
    try {
        const songs = await Song.find().sort({ uploaded: -1 })
        if (!songs) {
            return {
                status: 404,
                message: 'Songs not found',
            }
        }
        return {
            status: 200,
            message: songs,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: 500,
            message: 'Server error',
        }
    }
}
async function getSongByUser(userId: string) {
    try {
        const songs = await Song.find({ userId }).sort({ uploaded: -1 })
        if (!songs) {
            return {
                status: 404,
                message: 'Songs not found',
            }
        }
        return {
            status: 200,
            message: songs,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: 500,
            message: 'Server error',
        }
    }
}
async function getSongById(id: string) {
    try {
        const song = await Song.findById(id)
        if (!song) {
            return {
                status: 404,
                message: 'Song not found',
            }
        }
        return {
            status: 200,
            message: song,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: 500,
            message: 'Server error',
        }
    }
}

async function deleteSong(id: string) {
    try {
        const song = await Song.findById(id)
        const bucket = getBucket()

        if (!song) {
            return {
                status: 404,
                message: 'Song not found',
            }
        }
        // delete song file from bucket by name
        const a = bucket.find({ filename: song.filename })
        console.log(
            a.filter((x: { filename: string }) => x.filename === song.filename)
        )
        // await song.remove()
        return {
            status: 200,
            message: 'Song deleted',
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: 500,
            message: 'Server error',
        }
    }
}

async function streamSong(id: string) {
    try {
        const song = await Song.findById(id)
        if (!song) {
            return {
                status: 404,
                message: 'Song not found',
            }
        }
        return {
            status: 200,
            message: song,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: 500,
            message: 'Server error',
        }
    }
}

export default {
    postSong,
    getAllSongs,
    getSongById,
    deleteSong,
    getSongByUser,
    streamSong,
}
