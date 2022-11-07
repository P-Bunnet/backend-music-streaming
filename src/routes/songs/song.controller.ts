// import Request from '../../types/Request'
import { Response, Request } from 'express'
import songServices from './song.service'
import HttpStatusCodes from 'http-status-codes'
import { ISong, TSong } from '../../models/Song'
import config from '../../config/config'
import jwt from 'jsonwebtoken'
import Payload from '../../types/Payload'
import { getBucket } from '../../config/database'
async function postSong(req: Request, res: Response) {
    try {
        const [, token] = req.headers.authorization.split(' ')
        const decoded: Payload | any = jwt.verify(token, config.jwtSecret)
        console.log('Body- ' + JSON.stringify(req.body))
        console.log('File- ' + JSON.stringify(req.file))
        if (!req.file?.filename) {
            res.status(400).send('File not uploaded')
            return
        }
        const Song: TSong = {
            userId: decoded.userId,
            filename: req.file.filename,
            mimeType: req.file.mimetype,
            title: req.body.title,
            duration: req.body.duration,
            genre: req.body.genre,
            lyrics: req.body.lyrics,
            uploaded: new Date(),
        }
        const song = await songServices.postSong(Song)
        return res.status(song.status).json({ msg: song.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}
async function getSongs(req: Request, res: Response) {
    try {
        const songs = await songServices.getAllSongs()
        return res.status(songs.status).json({ msg: songs.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function getSongByUser(req: Request, res: Response) {
    try {
        const [, token] = req.headers.authorization.split(' ')
        const decoded: Payload | any = jwt.verify(token, config.jwtSecret)
        const songs = await songServices.getSongByUser(decoded.userId)
        return res.status(songs.status).json({ msg: songs.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function getSongById(req: Request, res: Response) {
    try {
        const song = await songServices.getSongById(req.params.id)
        return res.status(song.status).json({ msg: song.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function deleteSong(req: Request, res: Response) {
    try {
        const song = await songServices.deleteSong(req.params.id)
        return res.status(song.status).json({ msg: song.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function streamSong(req: Request, res: Response) {
    try {
        const bucket = await getBucket()
        const collection = await songServices.streamSong(req.params.id)
        const song: ISong = collection.message as ISong
        if (collection.status === 200) {
            res.status(200)
            res.set({
                'Content-Type': song.mimeType,
                'Transfer-Encoding': 'chunked',
            })
            bucket.openDownloadStreamByName(song.filename).pipe(res)
        } else {
            res.status(collection.status).json({ msg: collection.message })
        }
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

export default {
    postSong,
    getSongs,
    getSongByUser,
    getSongById,
    deleteSong,
    streamSong,
}
