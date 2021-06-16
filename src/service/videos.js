// import dotenv from 'dotenv'
// import { prerendering } from '$app/env'
// import { getPlaylistItems } from "../lib/ytapi
import { receiveVideos } from "../store/videos"

export async function getVideos () {
   const { data } = await fetch("http://localhost:3000/api/videos.json").then(r => r.json())
   return receiveVideos(data)
}