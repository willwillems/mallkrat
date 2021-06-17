// import dotenv from 'dotenv'
// import { prerendering } from '$app/env'
// import { getPlaylistItems } from "../lib/ytapi
import { receiveVideos } from "../store/videos"

export async function getVideos () {
   const { data } = await fetch("/api/videos.json").then(r => r.json())
   return receiveVideos(data)
}