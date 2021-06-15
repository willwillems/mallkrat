import { writable } from 'svelte/store'

export const videoList = writable([])

export function receiveVideos (d) {
   if (!d.items) return // ?
   videoList.set(d.items.map(i => i.snippet))
}