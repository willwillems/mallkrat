<template>
  <div id="app">
    <div class="header">
      <marquee behavior="" direction=""><h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1></marquee>
      <marquee behavior="" direction="" style="color: #f39a2c;"><h1>HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN</h1></marquee>
      <marquee behavior="" direction=""><h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1></marquee>
    </div>
    <div class="main">
      <h2 class="window-header" >PRAATBAK</h2>
      <textarea v-model="praatbak" @keyup.enter="savePraatbak" style="width: 100%; height: 100%; color: inherit; background-color: inherit; padding: 12px; outline: none; text-transform: uppercase;" ></textarea>
    </div>
    <div class="center"> <h1> UNDER <span style="color: #f39a2c;">DESTRUCTION</span> </h1> </div>
    <div class="videos">
    </div>
    <div class="player">
      <video ref="video-player" autoplay muted loop src="ROOKHOK-PREVIEW.MP4"></video>
    </div>
    <div class="button">
      <div class="play-status">
        <div class="play-status__content">ROOKHOK - 00:0{{videoDuration}}</div>
        <div class="play-status__progress" :style="`width: ${videoProgress}%;`">
          <div class="play-status__content play-status__content--invert">ROOKHOK - 00:0{{videoDuration}}</div>
        </div>
      </div>
      <button @click="play" >PLAY</button>
      <button @click="mute" >MUTE</button>
      <button @click="fullscreen" >GAAN</button>
    </div>
    <div class="links"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoDuration: 0,
      videoProgress: 0,
      praatbak: ''
    }
  },
  mounted () {
    this.$refs['video-player'].addEventListener('loadeddata', (event) => {
      this.videoDuration = Math.floor(event.srcElement.duration)
    })
    this.$refs['video-player'].addEventListener('timeupdate', (event) => {
      this.videoProgress = Math.floor((event.srcElement.currentTime / event.srcElement.duration) * 100)
    })
    this.fetchPraatbak()
  },
  methods: {
    play () {
      this.$refs['video-player'].paused ? this.$refs['video-player'].play() : this.$refs['video-player'].pause()
    },
    mute () {
      this.$refs['video-player'].muted = !this.$refs['video-player'].muted
    },
    fullscreen () {
      document.body.requestFullscreen()
    },
    fetchPraatbak () {
      fetch('https://api.jsonbin.io/b/5e37f9cc50a7fe418c58c024/latest')
        .then(resp => resp.json())
        .then(json => json
          .messages
          .join('\n')
        )
        .then(txt => (this.praatbak = txt))
    },
    savePraatbak () {
      const messages = this.praatbak.split('\n')
      fetch('https://api.jsonbin.io/b/5e37f9cc50a7fe418c58c024', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'versioning': false
        },
        body: JSON.stringify({ messages })
      })
        .then(resp => resp.json())
        .then(json => json.data
          .messages
          .join('\n')
        )
        .then(txt => (this.praatbak = txt))
    }
  }
}
</script>

<style lang="scss">

:root {
  --bg-color: black;
  --txt-color: white;
  --border-color: var(--txt-color);
}

html, body {
  background-color: var(--bg-color);
  color: var(--txt-color);
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-family: 'Arial', Helvetica, Arial, sans-serif;
  letter-spacing: 1px;
  font-weight: 800;
  height: 100%;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Arial Black', Arial, sans-serif;
  text-align: center;
}

#app {
  height: 100%;
  border: 1px solid var(--border-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: repeat(9, minmax(80px, 1fr));
  grid-template-columns: repeat(10, minmax(120px, 1fr));
  grid-template-areas:
    "header header header header header header header header main   main "
    "header header header header header header header header main   main "
    "videos videos videos center center center center center main   main "
    "videos videos videos center center center center center main   main "
    "videos videos videos center center center center center main   main "
    "videos videos videos center center center center center main   main "
    "player player player center center center center center main   main "
    "player player player button button button links  links  links  links"
    "player player player button button button links  links  links  links";

  & > * {
    overflow: hidden;
    border: 1px solid var(--border-color);
  }

  @media (max-width: 600px) {
    height: auto;
    grid-template-rows: repeat(10, 80px); // repeat(12, 80px);
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      "header header header header ."
      "header header header header ."
      // "videos videos center center center"
      // "videos videos center center center"
      "videos videos center center center"
      "player player player button button"
      "player player player button button"
      "player player player button button"
      ".      main   main   main   main"
      ".      main   main   main   main"
      "links  links  links  links  ."
      "links  links  links  links  .";
  }
}

.header {
  grid-area: header;

  // background-image: url("https://media.giphy.com/media/3o6fITYA9xn4MCWEGA/source.gif");
  // background-position: center;
  // filter: grayscale(1) brightness(.5) contrast(1.6);

  h1 {
    z-index: 1;
    font-size: 4rem;
    line-height: 1em;
    padding: 0;
    margin: 0;
  }
}

.main {
  grid-area: main;
  // background-image: url("https://media.giphy.com/media/3oEdv67AXWYsTqrnbi/giphy.gif");
  // background-position: center;
}

.center {
  grid-area: center;

  // REMOVE
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 4rem;
    animation: flash-text 1.5s step-end infinite;

    & > * {
      animation: flash-text 1.5s step-end infinite;
    }
  }

  @keyframes flash-text {
    0% {

    }

    50% {
      color: transparent;
    }

    100% {

    }
  }
}

.videos {
  grid-area: videos;
}

.player {
  grid-area: player;

  video {
    object-fit: cover;
    height: 100%;
    width: 100%;
    filter: grayscale(1) brightness(1.1) sepia(2) contrast(2.5) hue-rotate(-17deg);
  }
}

.button {
  grid-area: button;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);

  border: none !important;

  button {
    color: inherit;
    background-color: inherit;
    border: 1px solid var(--border-color);
    font-weight: inherit;

    &:hover {
      color: var(--bg-color);
      background-color: var(--txt-color);
    }
  }
}

.links {
  grid-area: links;
  background-image: url("https://media.giphy.com/media/4m77PaZIsglUs/giphy.gif"); // "https://media.giphy.com/media/3oEdv67AXWYsTqrnbi/giphy.gif"
  background-position: 10%;
  filter: grayscale(1) brightness(.8) contrast(2);
}

.window-header {
  border-bottom: 2px solid var(--border-color);
  margin: 0;
  padding: .3em;
  position: relative;
  font-size: 1.2rem;
  line-height: 1em;

  &::before {
    content: "";
    position: absolute;
    top: calc(50% - 6px - 2px);
    left: 12px;
    height: 12px;
    width: 12px;
    border: 2px solid var(--border-color);

  }
}

.play-status {
  grid-column: 1 / 4;
  position: relative;
  border: 1px solid var(--border-color);

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 100%;

    // QUICKFIX
    @media (max-width: 600px) {
      width: 40vw;
    }

    &--invert {
      background-color: var(--bg-color);
      filter: invert(1);
    }
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
  }
}
</style>
