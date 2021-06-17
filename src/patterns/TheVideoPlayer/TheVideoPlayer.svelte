<script>
  import AppYouTube from '../../components/Youtube.svelte'
  import AppVolumeBar from '../../components/VolumeBar.svelte'

  import ThePlayButton from './components/ThePlayButton.svelte'

  import { activeVideoId } from '../../store/videos'

  import { init, setVolume, toggle } from './player'
  import { volume, hasPlayed } from './state'

  let player

  $: player, init(player)

  const options = {
    playerVars: {
      controls: 0,
      modestbranding: true
    }
  }

  function handleUpdateVolume (e) {
    setVolume(e.detail)
  }

</script>

<div id="video">
  <AppYouTube
    videoId={$activeVideoId}
    options={options}
    class="video-player"
    bind:player
  />
  <!-- {#if !$hasPlayed}
  <img class="video-player__overlay" on:click={toggle} src="https://i.ytimg.com/vi/eMKqoYe8meY/maxresdefault.jpg" alt="cover" >
  {/if} -->
  <div class="volume-bar">
    <AppVolumeBar class="volume-bar__controls" volume={$volume} on:update:volume={handleUpdateVolume} />
  </div>
  <div class="player-controls">
    <ThePlayButton class="player-controls__play-button"/>
  </div>
</div>

<style lang="postcss" global>
@import '../../style/mixins.pcss';

#video {
  @include box-w-2;
  grid-area: video;

  display: grid;
  grid-gap: 2px;
  grid-template-rows: 1fr 120px;
  grid-template-columns: auto 36px;
  grid-template-areas:
    "player   volume  "
    "controls controls";
}

.video-player {
  @include box-w-2;
  grid-area: player;

  iframe {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  &__overlay {
    grid-area: player;
    object-fit: cover;
    height: 100%;
    width: 100%;
    cursor: pointer;

    transition: filter .2s ease-out;

    &:hover {
      filter: saturate(1.5);
    }
  }
}

.volume-bar {
  @include box-w-2;
  grid-area: volume;

  padding: 4px;

  &__controls {
    height: 100%;
    width: 100%;
  }
}

.player-controls {
  @include box-w-2;
  grid-area: controls;

  display: grid;
  grid-gap: 2px;
  grid-template-rows: 1fr 36px;
  grid-template-columns: 1fr 120px;
  grid-template-areas:
    "data     button "
    "playback button ";

  &__play-button {
    @include box-w-2;
    grid-area: button;
  }
}
</style>