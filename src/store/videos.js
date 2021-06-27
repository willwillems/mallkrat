import { writable, derived } from 'svelte/store'
import { getVideoId, getVideoTitle, getVideoDescription } from '$lib/ytdata'

export const videoList = writable([])
export const activeVideoId = writable('eMKqoYe8meY')

export const activeVideo = derived([videoList, activeVideoId], ([list, id]) => list.find(el => getVideoId(el) === id))
export const activeVideoTitle = derived(activeVideo, getVideoTitle)
export const activeVideoDescription = derived(activeVideo, getVideoDescription)

export function receiveVideos ({ data }) {
   if (!data.items) return // ?
   videoList.set(data.items.map(i => i.snippet))
}

export function setActiveVideoId (id) {
   activeVideoId.set(id)
}