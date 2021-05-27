<script>
  import TheHeader from './TheHeader.svelte'
  import TheFooter from './TheFooter.svelte'
  import TheNextUp from './TheNextUp.svelte'
  import TheSubContent from './TheSubContent/TheSubContent.svelte'
  import TheVideoPlayer from './TheVideoPlayer/TheVideoPlayer.svelte'
  
</script>

<div id="app">
  <TheHeader />
  <TheVideoPlayer />
  <TheNextUp />
  <TheSubContent />
  <TheFooter />
</div>

<style lang="scss">
@import '../src/style/mixins.scss';

#app {
  @include box-w-2;
  margin: 18px 24px;
  max-height: calc(100vh - 36px);
  display: grid;
  grid-gap: 2px;
  grid-template-rows: repeat(6, minmax(80px, 1fr)) 36px;
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
    max-height: unset;
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
    grid-template-rows: repeat(6, minmax(80px, 1fr)) 36px;
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
</style>