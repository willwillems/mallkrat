import { get } from 'svelte/store'
import { setPlayState, setDuration, setCurrentTime, playing } from "./state"

export let instance

export function init (player) {
  instance = player

  if (!instance) return
    
  instance.on('stateChange', ({data}) => {
    // unstarted 
    if (data === -1) {
      return
    }
    // ended
    if (data === 0) {
      return
    }
    // playing
    if (data === 1) {
      setPlayState(true)
      return
    }
    // paused
    if (data === 2) {
      setPlayState(false)
      return
    }
    // buffering
    if (data === 3) {
      return
    }
    // video cued
    if (data === 5) {
      return
    }
  })

  window.setInterval(async () => {
    const currentTime = await instance.getCurrentTime()
    const duration = await instance.getDuration() // MOVE TO ON LOAD
    setCurrentTime(currentTime)
    setDuration(duration)
  }, 250)
}

export function play () {
  if (!instance) return
  instance.playVideo()
}

export function pause () {
  if (!instance) return
  instance.pauseVideo()
}

export function stop () {
  if (!instance) return
  instance.stopVideo()
}

export function toggle () {
  if (!instance) return
  if (get(playing)) return pause()
  return play()
}


