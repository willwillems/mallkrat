<script>
	import { onMount } from 'svelte'
	
  import { fetchPraatbakText, savePraatbakText, changeFavicon, metaMarquee, openFullscreen, openCenterFullscreen, closeFullscreen } from './utils'
  
  const videos = [
    {
      title: 'CONCRETE CAVE',
      ytId: 'wRby4-MxPNk',
      video: {
        src: '/video/CONCRETECAVE.webm',
        type: 'video/webm'
      }
    },
    {
      title: 'GRAAFBAK',
      ytId: '3kbe6ww50UY',
      video: {
        src: '/media/GRAAFBAK.webm',
        type: 'video/webm'
      }
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
    {},
    {},
    {},
    {}
  ]

  let praatbakTxt = ''
  let videoElement
  let videoCurrentTime = ''
  let videoProgress = 0
  let videoIsPlaying = true
  let videoIsMuted = false
  let pageIsFullscreen = false
  let headerAnimationIsRunning = false
  let activeVideoIndex = 0

  // const applyStarSection = tweened(100, {
	// 	duration: 400,
	// 	easing: cubicOut
	// });

  $: scrubberStyle = `transform-origin: left; transform: scaleX(${videoProgress.toFixed(3)});`
  $: videoTimeFormated = (new Date(1000 * videoCurrentTime)).toISOString().substr(11, 8)
  $: headerAnimationPlayStateStyle = `animation-play-state: ${headerAnimationIsRunning ? 'running' : 'paused'};`
  $: buttonPlayLabel = videoIsPlaying ? 'PAUSE' : 'PLAY'
  $: buttonMuteLabel = videoIsMuted ? 'UNMUTE' : 'MUTE'
  $: buttonGaanLabel = pageIsFullscreen ? 'WEG' : 'GAAN'
  $: activeVideo = videos[activeVideoIndex]
  $: youtubeIframeUrl = `https://www.youtube.com/embed/${activeVideo.ytId}?modestbranding=1&fs=0&disablekb=1&controls=1`
  $: autoplayYoutubeIframeUrl = youtubeIframeUrl + '&autoplay=1'

  // WATCHERS
  $: videoIsMuted       , videoElement && (videoElement.muted = videoIsMuted)
  $: videoIsPlaying     , videoElement && (videoIsPlaying ? videoElement.play() : videoElement.pause())
  $: pageIsFullscreen   , (document.fullscreen !== pageIsFullscreen) && (pageIsFullscreen ? openFullscreen() : closeFullscreen())

  onMount(() => {

    window.setInterval(metaMarquee, 938)
  })
  
  const handleVideoProgress = (ev) => {
    videoCurrentTime = event.srcElement.currentTime
    videoProgress = (event.srcElement.currentTime / event.srcElement.duration)
  }

	const handlePraatbakKeyup = (ev) => {
    if (ev.key === 'Enter') return savePraatbakText(praatbakTxt)
      .then(txt => (praatbakTxt = txt))
  }

  const toggleHeaderAnimation = () => { headerAnimationIsRunning = !headerAnimationIsRunning }

  const play = () => { videoIsPlaying = !videoIsPlaying }
  const mute = () => { videoIsMuted = !videoIsMuted }
	const scrub = (ev) => {
    const fraction = ev.layerX / ev.srcElement.scrollWidth
    videoProgress = fraction // adjust visually alreadyso no waiting for buffer
    videoElement.currentTime = fraction * videoElement.duration
  }
  const fullscreen = () => { pageIsFullscreen = !pageIsFullscreen }

  const setActiveVideoByIndex = (i) => { activeVideoIndex = i }
</script>
<div id="app">
  <header class="header">
    <img src="/img/header_wizzard.png" alt="wizzard" class="header__wizzard">
    <img src="/img/header_herres-text.png" alt="" class="header__title">
    <img src="/img/header_diamond.png" alt="diamond" class="header__diamond">
  </header>
  <section class="section video-section">
    <div class="video-section__player">
      <video id="video-player" bind:this={videoElement} on:timeupdate={handleVideoProgress} on:click={play} preload="metadata" autoplay>
        <source {...activeVideo.video}>
        <!-- Fallback for browsers that do not support HTML5 video -->
        <iframe title="fallback-player" type="text/html" src="{youtubeIframeUrl}" frameborder="0"></iframe>
      </video>
    </div>
    <div class="video-section__remote">
    <button on:click={play} class="remote-button">PLAY</button>
    <button on:click={mute} class="remote-button">MUTE</button>
    <button on:click={fullscreen} class="remote-button">GAAN</button>
    </div>
  </section>
  <section class="carousel-section">
    <div></div><div></div><div></div><div></div>
    {#each videos as video, index}
      <video on:click="{() => setActiveVideoByIndex(index)}" src={video.video && video.video.src} class="carousel-item"></video>
    {/each}
    <div></div><div></div><div></div><div></div>
  </section>
  <section class="section apply-section">
    <h1 class="apply-section__title">Join Us</h1>
    <button id="apply-button">
      <svg width="450px" height="141px" viewBox="0 0 450 141" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Desktop-HD-Copy" transform="translate(-496.000000, -334.000000)">
                <g id="Oval-2" transform="translate(496.000000, 334.000000)" fill="currentColor" stroke="#ffffff" stroke-width="4">
                    <path d="M225,3 C278.374658,3 337.561215,19.6911918 381.49842,47.2251739 C418.990244,70.7200502 445.533335,102.135032 446.941168,138 L446.941168,138 L3.05177623,138 C4.35202961,100.408076 30.0230972,69.2042829 66.5923519,46.2875499 C110.717851,18.6355707 170.852256,3 225,3 Z" id="Oval"></path>              </g>
                    
            </g>
            <text id="APPLY" font-family="Arial-Black, Arial Black" font-size="48" font-weight="700" fill="#000000">
              <tspan x="136" y="96">APPLY</tspan>
            </text>
        </g>
      </svg>
    </button>
  </section>
  <!-- <div class="center" id="center">
    {#if activeVideo.ascii}
      <AsciiPlayer bind:videoPlayer={videoElement} on:timeupdate={handleVideoProgress} {...activeVideo.video} noBar={!centerIsFullscreen}/>
    {:else if activeVideo.video}
      <video bind:this={videoElement} on:timeupdate={handleVideoProgress} on:click={play} preload="metadata" autoplay>
        <source {...activeVideo.video}>
        <!-- Fallback for browsers that do not support HTML5 video
        <iframe title="fallback-player" type="text/html" src="{youtubeIframeUrl}" frameborder="0"></iframe>
      </video>
    {:else}
      <iframe title="player" id="ytplayer" type="text/html"
        src="{autoplayYoutubeIframeUrl}"
        frameborder="0">
      </iframe>
    {/if}
  </div> -->
  <!-- <div class="videos">
    <h2 class="window-header" >VIDEOS</h2>
    <ul>
      {#each videos as video, index}
        <li on:click="{() => setActiveVideoByIndex(index)}">{video.title}</li>
      {/each}
    </ul>
  </div> -->
  <!-- <div class="button">
    <div class="play-status" on:click={scrub} >
      <div class="play-status__content">{activeVideo.title} - {videoTimeFormated}</div>
      <div class="play-status__content play-status__content--invert" style={scrubberStyle}></div>
    </div>
    <button on:click={play} >{buttonPlayLabel}</button>
    <button on:click={mute} >{buttonMuteLabel}</button>
    <button on:click={fullscreen} >{buttonGaanLabel}</button>
  </div> -->
</div>

<style lang="scss">
:global(body) {
  background-image: url('/img/stars-background.png');
  background-size: 100%;
  background-position: top;
  background-repeat: repeat;
}
#app {
  max-width: 1200px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --bg-color: black;
  --txt-color: white;
  --border-color: var(--txt-color);
  --accent-color: #FFFF00;
}

.section {

  position: relative;
}

.header {
  position: relative;
  width: 100%;

  padding: 2rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-image: url('/img/header_bg-stars-moon.png');
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;

  &__wizzard {
    position: absolute;
    height: 20rem;
    left: 0;
    bottom: 0;
  }

  &__title {
    height: 6rem;
    margin: 1rem;
  }

  &__diamond {
    position: absolute;
    height: 8rem;
    right: 0;
  }
}

.video-section {
  display: flex;
  flex-direction: row;

  margin: -1rem;

  padding-bottom: 6rem;

  background-image: url('/img/video_bottom-artifacts.png');
  background-size: 100%;
  background-position: calc(100% - 1rem) calc(100% - 1rem + 4px);
  background-repeat: no-repeat;

  &__player {
    position: relative;
    margin: 1rem;

    flex-grow: 1;

    border: 4px solid var(--border-color);
    background-color: var(--bg-color);

    video {
      width: 100%;
      height: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4rem;

      left: -4px;
      bottom: -4rem;

      background-image: url('/img/video_bottom-fluid.png');
      background-size: auto 100%;
      background-position: top left;
      background-repeat: no-repeat;
    }
  }

  &__remote {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 4px solid var(--border-color);
    border-top-right-radius: 26px;
    background-color: var(--bg-color);

    margin: 1rem;
    padding: 1rem;
    margin-bottom: 6rem + 1rem; /* for after img */

    min-width: 8rem;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 6rem;

      left: 0;
      bottom: -6.5rem;

      background-image: url('/img/remote_eye.png');
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.remote-button {
  font-size: 1rem;
  font-weight: bolder;

  color: var(--txt-color);
  background-color: var(--bg-color);
  outline: none;
  border: unset;

  background-image: url('/img/video_remote_button-bg.png');
  background-size:  contain;
  background-position: bottom center;
  background-repeat: no-repeat;

  padding: 2.5rem 2rem;
  margin: 1rem;
  padding-bottom: 3rem;

  &:active {
    background-image: url('/img/video_remote_button-bg--pressed.png');
    padding-bottom: 2.5rem;
    padding-top: 3rem;
    outline: none;
    border: unset;
  }

  &:focus {
    outline: none;
  }
}

.carousel-section {
  width: calc(100% - 8px);

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 3rem auto auto 3rem;
  grid-gap: 4px;
  margin: 4px;

  background-image: url('/img/carousel_bg.png');
  background-size: 100%;
  background-position: top;
  background-repeat: no-repeat;

  & > * {
    width: 100%;

    box-shadow: 0 0 0 4px white;
    background-color: black;
    z-index: 1;

    filter: grayscale(1);

    transition: .3s all ease-out;

    @for $i from 0 through 3 {
      &:nth-child(4n+#{$i + 1}) {
        transform: skewY(9deg - 6 * $i);

        &:hover {
          z-index: 10;
          transform: skewY(9deg - 6 * $i) scale(1.15) translateY(-10px);
          filter: grayscale(0);
        }
      }
    }
    &:nth-child(4n+1) {
      position: relative;
      top: 1.6rem
    }

    &:nth-child(4n+2) {
      position: relative;
      top: 3.6rem;
    }

    &:nth-child(4n+3) {
      position: relative;
      top: 3.6rem;
    }

    &:nth-child(4n+4) {
      position: relative;
      top: 1.6rem
    }
  }
}

.carousel-item {
  height: 11rem;
  object-fit: cover;

  background-image: url('/img/carousel_eye.svg');
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
}

.apply-section {
  width: 100vw;
  margin: 0 calc(-1 * ((100vw - 1200px) / 2));
  height: 68rem;
  padding-top: 20rem;

  background-image: url('/img/apply_header.png'), url('/img/disolve.png'), url('/img/join-main.png'), url('/img/stars-bg.png');
  background-size: 980px, 1440px, 100%, cover;
  background-position: top, bottom, bottom, top;
  background-repeat: no-repeat;


  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 300px;
    top: 14rem;

    background-image: url('/img/apply_stars.png');
    background-size: 100%;
    background-repeat: no-repeat;

    animation: move-in 1s ease-in-out;
    animation-delay: .2s;
    animation-fill-mode: backwards;

    @media (max-width: 600px) {
      background-size: 200%;
    }
  }
  
  @media (max-width: 600px) {
    background-size: 720px, 220%, cover;
  }

}

.apply-section__title {
  font-size: 4.5rem;
  text-align: center;
  text-transform: uppercase;

  margin: 0;
  padding-top: 8vh;
}

#apply-button {
  position: absolute;
  width: 36vw;
  left: calc(50% - 18vw);
  bottom: 8.2vw;

  background-color: transparent;
  outline: none;
  border: none;

  color: white;

  &:hover {
    color: var(--accent-color);

    &::after {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    width: 70vw;
    left: calc(50% - 35vw);
  }

  &::after {
    content: "";
    position: absolute;
    width: 80px;
    height: 80px;

    left: calc(50% - 40px);
    bottom: 37vh;

    background-image: url('/img/eye.png');
    background-size: 100%;

    z-index: -1;
    
    transition: all .3s ease-out;
    transform: translateY(140px);
    opacity: .3;
  }

  svg {
    width: 100%;
  }
}

@keyframes move-in {
  from { transform: translateY(60%); opacity: .3; }
  to { transform: translateY(0%); opacity: 1; }
}

@keyframes move-in-fast {
  from { transform: translateY(60%); opacity: .3; }
  to { transform: translateY(0%); opacity: 1; }
}

@keyframes text-flicker {
  0% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  
  2% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  8% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  9% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  12% {
    opacity:0.1;
    text-shadow: 0px 0px rgba(242, 22, 22, 1);
  }
  20% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  25% {
    opacity:0.3;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  30% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  
  70% {
    opacity:0.7;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  
  72% {
    opacity:0.2;
    text-shadow:0px 0px 29px rgba(242, 22, 22, 1)
  }
  
  77% {
    opacity:.9;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  100% {
    opacity:.9;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
}

</style>