<script>
  import TheJoinButton from "./components/TheJoinButton.svelte"
  // https://media.giphy.com/media/h76r04w8cYic7T2BHG/giphy.mp4
</script>

<div id="sub">
  <div class="box box__1"></div>
  <video src="https://media.giphy.com/media/KDyFTBPbfg5CuTCIbh/giphy.mp4" autoplay muted loop class="box box__2" />
  <div class="box box__3"></div>
  <div class="join-button-container"><TheJoinButton class="join-button"/></div>
</div>

<style lang="postcss">
@import '../../style/mixins.pcss';

#sub {
  @include box-w-2;
  grid-area: sub;

  display: grid;
  grid-gap: var(--border-width);
  grid-template-rows: 1fr 54px;
  grid-template-columns: 180px minmax(360px, 4fr) 5fr auto;
  grid-template-areas:
    ".     box-1   box-3  join  "
    ".     box-2   box-3  join  ";

  overflow: visible;
}

.box {
  @include box-w-2;

  &__1 {
    grid-area: box-1;
  }

  &__2 {
    @include full-cover;
    grid-area: box-2;

    filter: contrast(1.75);
  }

  &__3 {
    grid-area: box-3;
  }

}

.join-button-container {
  grid-area: join;
  width: 126px;
}

:global(.join-button) {
  
  position: relative;
  bottom: 0;
  right: 0;
}
</style>