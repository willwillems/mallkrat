import { getPlaylistItems } from "../utils/ytapi"
import { receiveVideos } from "../store/videos"

const uploadsPlaylistId = "UUIfE0xC0WPJmxOaRl70Zheg"

const getOwnPlaylistItems = getPlaylistItems(null) // GET FROM LOCAL

export async function getVideos () {
   const data = await getOwnPlaylistItems(uploadsPlaylistId)
   return receiveVideos(data)
}