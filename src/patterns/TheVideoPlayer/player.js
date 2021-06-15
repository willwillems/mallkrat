import { get } from 'svelte/store'
import { setPlayState, setDuration, setCurrentTime, updateVolume, playing, duration } from "./state"

export let instance

export function init (player) {
  instance = player

  if (!instance) return
    
  instance.on('stateChange', async ({data}) => {
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
      const volume = await instance.getVolume()
      setVolume(volume)

      const duration = await instance.getDuration()
      setDuration(duration)

      return
    }
  })

  window.setInterval(async () => {
    const currentTime = await instance.getCurrentTime()
    setCurrentTime(currentTime)
    const duration = await instance.getDuration() // MOVE TO ON LOAD
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

export async function setVolume (val) {
  if (!instance) return
  const volume = Math.round(Math.max(0, Math.min((val * 100), 100)))
  await instance.setVolume(volume)

  updateVolume(volume / 100)
}

export function setProgress (targetProgress) {
  if (!instance) return
  const targetTime = targetProgress * get(duration)
  instance.seekTo(targetTime, true)
}

