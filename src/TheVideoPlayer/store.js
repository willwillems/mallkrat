import { writable } from 'svelte/store';

export const playing = writable(false);

export function setPlayState (s) {
   playing.set(s);
}