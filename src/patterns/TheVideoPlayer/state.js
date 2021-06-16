import { writable, derived } from 'svelte/store'

export const playing = writable(false)
export const hasPlayed = writable(false)
export const currentTime = writable(0)
export const duration = writable(0)
export const volume = writable(1)

export const progress = derived(
	[currentTime, duration],
	([$currentTime, $duration]) => Math.min(($currentTime / $duration), 1)
);

export function setPlayState (s) {
   playing.set(s);
   hasPlayed.set(true)
}

export function setCurrentTime (s) {
   currentTime.set(s);
}

export function setDuration (s) {
   duration.set(s);
}

export function updateVolume (v) {
   volume.set(v)
}