<script>

</script>

<div id="next">
  <!-- <div class="next-video next-video__1"> -->
    <iframe class="next-video next-video__1" src="https://www.youtube.com/embed/ggX-OPwie4A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <!-- </div> -->
  <!-- <div class="next-video next-video__2"> -->
    <iframe class="next-video next-video__2" src="https://www.youtube.com/embed/U3JTO3Ve-Ag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <!-- </div> -->
</div>

<style lang="scss">
@import '../src/style/mixins.scss';

#next {
  @include box-w-2;
  grid-area: next;

  display: grid;
  grid-gap: 2px;
  grid-template-rows: 6fr 4fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "video-1"
    "video-2";
}

.next-video {
  @include box-w-2;
  @include full-cover;

  filter: sepia(1) hue-rotate(160deg) grayscale(0.6) contrast(1.5);
  transition: filter ease-in-out .12s;

  &:hover {
    filter: sepia(0) hue-rotate(0deg) grayscale(0);
  }
  
  &__1 {
    grid-area: video-1;
  }

  &__2 {
    grid-area: video-2;
  }
}
</style>