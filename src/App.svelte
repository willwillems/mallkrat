<script>
	import { onMount } from 'svelte'
	
	import { fetchPraatbakText, savePraatbakText, changeFavicon, metaMarquee } from './utils'

  let praatbakTxt = ''
  let videoElement
  let videoCurrentTime = ''
  let videoProgress = 0
  let videoIsPlaying = true
  let videoIsMuted = true
  let videoIsFulscreen = false
  let headerAnimationIsRunning = true
  let constructionAnimationIsRunning = true

  $: scrubberStyle = `clip-path: inset(0 ${100 - videoProgress}% 0 0);`
  $: videoTimeFormated = (new Date(1000 * videoCurrentTime)).toISOString().substr(11, 8)
  $: headerAnimationPlayStateStyle = `animation-play-state: ${headerAnimationIsRunning ? 'running' : 'paused'};`
  $: constructionAnimationPlayStateStyle = `animation-play-state: ${constructionAnimationIsRunning ? 'running' : 'paused'};`
  $: buttonPlayLabel = videoIsPlaying ? 'PAUSE' : 'PLAY'
  $: buttonMuteLabel = videoIsMuted ? 'UNMUTE' : 'MUTE'
  $: buttonGaanLabel = videoIsFulscreen ? 'WEG' : 'GAAN'

  // WATCHERS
  $: videoIsMuted     , videoElement && (videoElement.muted = videoIsMuted)
  $: videoIsPlaying   , videoElement && (videoIsPlaying ? videoElement.play() : videoElement.pause())
  $: videoIsFulscreen , (document.fullscreen !== videoIsFulscreen) && (videoIsFulscreen ? document.body.requestFullscreen() : document.exitFullscreen())

  onMount(() => {
		fetchPraatbakText()
			.then(txt => (praatbakTxt = txt))
    
    videoElement.addEventListener('timeupdate', (event) => {
      videoCurrentTime = event.srcElement.currentTime
      videoProgress = Math.floor((event.srcElement.currentTime / event.srcElement.duration) * 100)
    })

    window.setInterval(metaMarquee, 938)
	})

	const handlePraatbakKeyup = (ev) => {
    if (ev.key === 'Enter') return savePraatbakText(praatbakTxt)
      .then(txt => (praatbakTxt = txt))
  }

  const toggleHeaderAnimation = () => { headerAnimationIsRunning = !headerAnimationIsRunning }
  const toggleConstructionAnimation = () => { constructionAnimationIsRunning = !constructionAnimationIsRunning }

  const play = () => { videoIsPlaying = !videoIsPlaying }
  const mute = () => { videoIsMuted = !videoIsMuted }
	const scrub = (ev) => {
    const fraction = ev.layerX / ev.srcElement.scrollWidth
    videoElement.currentTime = fraction * videoElement.duration
  }
  const fullscreen = () => { videoIsFulscreen = !videoIsFulscreen }
</script>

<div id="app">
  <div class="header">
		<div class="marquee" on:click={toggleHeaderAnimation} style={headerAnimationPlayStateStyle}>
			<h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1>
			<h1 style="color: #f39a2c;">HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN</h1>
			<h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1>
			<h1 style="color: #f39a2c;">HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN</h1>
			<h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1>
		</div>
  </div>
  <div class="main">
    <h2 class="window-header" >PRAATBAK</h2>
    <textarea bind:value={praatbakTxt} on:keyup="{handlePraatbakKeyup}" style="width: 100%; height: 100%; color: inherit; background-color: inherit; padding: 12px; outline: none; text-transform: uppercase;" ></textarea>
  </div>
  <div class="center">
		<iframe title="player" id="ytplayer" type="text/html"
			src="https://www.youtube.com/embed/U3JTO3Ve-Ag?autoplay=1&modestbranding=1&fs=0&disablekb=1&controls=1"
			frameborder="0"></iframe>
		</div>
  <div class="videos" on:click={toggleConstructionAnimation}>
		<h1 style={constructionAnimationPlayStateStyle}> UNDER <span style={'color: #f39a2c; ' + constructionAnimationPlayStateStyle}>DESTRUCTION</span> </h1>
  </div>
  <div class="player">
    <video ref="video-player" bind:this={videoElement} muted autoplay loop src="/video/ROOKHOK-PREVIEW.MP4"></video>
  </div>
  <div class="button">
    <div class="play-status" on:click={scrub} >
      <div class="play-status__content">PREVIEW - {videoTimeFormated}</div>
      <div class="play-status__content play-status__content--invert" style={scrubberStyle}>PREVIEW - {videoTimeFormated}</div>
    </div>
    <button on:click={play} >{buttonPlayLabel}</button>
    <button on:click={mute} >{buttonMuteLabel}</button>
    <button on:click={fullscreen} >{buttonGaanLabel}</button>
  </div>
  <div class="links"></div>
</div>

<style lang="scss">
#app {
  height: 100%;
  min-width: 1200px;
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
    min-width: unset;
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
	.marquee {
		min-width: 200%;
    min-height: 200%;
		padding: 0;
		margin: 0;

		transition: transform 3s linear;
    transform: translate(-50%, -10%);

		animation: weird-marquee 30s linear infinite;

		h1 {
			z-index: 1;
			font-size: 4rem;
			line-height: 1em;
			padding: 0;
			margin: 0;
			text-align: left;
			white-space: nowrap;
		}
	}

  @keyframes weird-marquee {
    0% {
			transform: translate(0%, 0%);
    }

		20% {
      transform: translate(-10%, -20%);
    }

    50% {
      transform: translate(-50%, -50%);
    }

		80% {
      transform: translate(-70%, -30%);
    }

    100% {
			transform: translate(0%, 0%);
    }
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

	iframe {
		min-width: 782px;
		min-height: 100%;
		filter: brightness(1.1) sepia(2) contrast(2.5) hue-rotate(-17deg);
	}
}

.videos {
  grid-area: videos;

	// REMOVE
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

	h1 {
    font-size: 3rem;
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
  border-color: black; // to invert invert
  filter: grayscale(1) brightness(.8) contrast(2) invert(1);
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
}
</style>