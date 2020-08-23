<script>
	import { onMount } from 'svelte'
	
  import { fetchPraatbakText, savePraatbakText, changeFavicon, metaMarquee, openFullscreen, openCenterFullscreen, closeFullscreen } from './utils'
  
  const videos = [
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
    {
      title: '40401',
      ytId: '',
      ascii: true,
      video: {
        src: '/media/40401.webm',
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
    }
  ]

  let praatbakTxt = ''
  let videoElement
  let videoCurrentTime = ''
  let videoProgress = 0
  let videoIsPlaying = true
  let videoIsMuted = false
  let pageIsFullscreen = false
  let centerIsFullscreen = false
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
  $: centerIsFullscreen  , (document.fullscreen !== centerIsFullscreen) && (centerIsFullscreen ? openCenterFullscreen() : closeFullscreen())

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
  const centerFullscreen = () => { centerIsFullscreen = !centerIsFullscreen }

  const setActiveVideoByIndex = (i) => { activeVideoIndex = i }
</script>
<div id="app">
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
#app {
  min-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-image: url('/img/disolve.png'), url('/img/join-main.png'), url('/img/stars-bg.png');
  background-size: 1440px, 100%, cover;
  background-position: bottom, bottom, top;
  background-repeat: no-repeat;


  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 300px;

    background-image: url('/img/stars.png');
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
    color: red;

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