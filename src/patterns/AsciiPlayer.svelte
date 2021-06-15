<script>
import { onMount, createEventDispatcher } from 'svelte' 
import { Player } from 'asciiplayer'

export let src
export let videoPlayer
export let noBar

let asciiPlayer = null

const dispatch = createEventDispatcher();

const player = Player({ noBar: true, preserveRatio: 'cover' })

// WATCHERS
// $: noBar       , player.noBar = noBar

onMount(() => {
  player.init(asciiPlayer)
  player.pixels = ['.', ',', ':', ';', '+', '*', '?', '%', 'S', '#', '@'].reverse()
  player.pixels = ['🍂', '🧱', '🧶', '🦀', '🦐', '😡', '☢️', '😳', '😷', '👩‍🦳']
  player.pixels = ['🏴', '🏴‍☠️', '☠️']
  player.setWidth(Math.floor(asciiPlayer.parentElement.offsetWidth / 11.2))
  player.setHeight(Math.floor(asciiPlayer.parentElement.offsetHeight / 9.5))
  player.setSourceMedia(src)

  videoPlayer = player.video

  videoPlayer.addEventListener('timeupdate', (ev) => dispatch('timeupdate', { ev }) )

  window.addEventListener('resize', () => {
    player.setWidth(Math.floor(asciiPlayer.parentElement.offsetWidth / 11.2))
    player.setHeight(Math.floor(asciiPlayer.parentElement.offsetHeight / 9.5  ))
  })
})


</script>

<div bind:this={asciiPlayer} class="ascii-player"></div>

<style lang="postcss">
.ascii-player {
  color: white;
  display: inline-block;
  width: 100%;
  height: 100%;
  font-family: monospace;
  white-space: pre;
  font-size: 7px;
  letter-spacing: .25em;
}
</style>