import { writable } from 'svelte/store'

export const videoList = writable([])
export const activeVideoId = writable('eMKqoYe8meY')

export function receiveVideos ({ data }) {
   if (!data.items) return // ?
   videoList.set(data.items.map(i => i.snippet))
}

export function setActiveVideoId (id) {
   activeVideoId.set(id)
}