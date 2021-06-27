<script context="module">
/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ page, fetch, session, context }) {
  const url = `/api/videos.json`;
  const res = await fetch(url);

  if (res.ok) {
    return {
      props: {
        videos: await res.json()
      }
    };
  }

  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
</script>

<script>
  import { receiveVideos } from "../store/videos"
  import "normalize.css"

  export let videos;

  $: receiveVideos(videos)

  import TheHeader from '../patterns/TheHeader.svelte'
  import TheFooter from '../patterns/TheFooter.svelte'
  import TheNextUp from '../patterns/TheNextUp.svelte'
  import TheSubContent from '../patterns/TheSubContent/TheSubContent.svelte'
  import TheVideoPlayer from '../patterns/TheVideoPlayer/TheVideoPlayer.svelte'
  
</script>

<div id="app">
  <TheHeader />
  <TheVideoPlayer />
  <TheNextUp />
  <TheSubContent />
  <TheFooter />
  <div class="bar"></div>
</div>

<style lang="postcss">
@import '../style/mixins.pcss';

#app {
  @include box-w-2;
  margin: 18px 24px;
  min-height: calc(100vh - 36px);
  display: grid;
  grid-gap: var(--border-width);
  grid-template-rows: repeat(5, minmax(80px, 1fr)) 126px 36px;
  grid-template-columns: 180px repeat(7, minmax(80px, 1fr));
  grid-template-areas:
    "header video  video  video  video  video  next   next   "
    "header video  video  video  video  video  next   next   "
    "header video  video  video  video  video  next   next   "
    "header video  video  video  video  video  next   next   "
    "header video  video  video  video  video  next   next   "
    "sub    sub    sub    sub    sub    sub    sub    sub    "
    "footer footer footer footer footer footer footer footer ";


  @media only screen and (max-width: 600px) {
    grid-template-rows: 100px 360px 180px 240px 36px;
    grid-template-columns: 36px repeat(4, minmax(80px, 1fr)) 36px;
    grid-template-areas:
      "header header header header header header"
      "bar    video  video  video  video  video "
      "bar    next   next   next   next   next  "
      "bar    sub    sub    sub    sub    sub   "
      "footer footer footer footer footer footer";
  }

  @media only screen and (min-width: 600px) and (max-width: 800px) {
    grid-template-rows: repeat(5, minmax(80px, 1fr)) 126px 36px;
    grid-template-columns: 180px repeat(5, minmax(80px, 1fr));
    grid-template-areas:
      "header video  video  video  video  video "
      "header video  video  video  video  video "
      "header video  video  video  video  video "
      "header video  video  video  video  video "
      "header video  video  video  video  video "
      "sub    sub    sub    sub    sub    sub   "
      "footer footer footer footer footer footer";

    :global(#next) {
      display: none;
    }
  }
}

.bar {
  @include box-w-2;
  grid-area: bar;
  display: none;

  @media only screen and (max-width: 600px) {
    display: block;
  }
}
</style>