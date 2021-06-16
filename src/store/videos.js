import { writable } from 'svelte/store'

export const videoList = writable([])
export const activeVideoId = writable('eMKqoYe8meY')

export function receiveVideos (d) {
   if (!d.items) return // ?
   videoList.set(d.items.map(i => i.snippet))
}