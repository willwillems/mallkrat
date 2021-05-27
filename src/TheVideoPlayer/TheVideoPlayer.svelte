<script>
  import YouTube from '../components/Youtube.svelte'
  import ThePlayButton from './components/ThePlayButton.svelte'

  import { init } from './player'

  let player

  $: player, init(player)

  const options = {
    playerVars: {
      controls: 0,
      modestbranding: true
    }
  }

  const videos = [
    {
      title: 'GRAAFBAK',
      ytId: '3kbe6ww50UY',
      video: {
        src: '/media/GRAAFBAK.webm',
        type: 'video/webm'
      }
    },
    {
      title: 'BUNKER #001',
      ytId: 'eMKqoYe8meY'
    },
    {
      title: 'CONCRETE CAVE',
      ytId: 'wRby4-MxPNk'
    },
    {
      title: 'WASHOK',
      ytId: 'U3JTO3Ve-Ag'
    },
    {
      title: 'ROOKHOK',
      ytId: 'ggX-OPwie4A',
      video: {
        src: '/media/ROOKHOK.webm',
        type: 'video/webm'
      }
    },
  ]

</script>

<div id="video">
  <YouTube
    videoId={videos[1].ytId}
    options={options}
    class="video-player"
    bind:player
  />
  <div class="volume-bar"></div>
  <div class="player-controls">
    <ThePlayButton class="player-controls__play-button"/>
  </div>
</div>

<style lang="scss" global>
@import '../src/style/mixins.scss';

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
}

.volume-bar {
  @include box-w-2;
  grid-area: volume;
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