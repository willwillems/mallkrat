<script>
import { videoList } from "../store/videos"

$: firstNextVideoUrl  = $videoList && $videoList[0] && $videoList[0].thumbnails.maxres.url
$: secondNextVideoUrl = $videoList && $videoList[1] && $videoList[1].thumbnails.maxres.url

</script>

<div id="next">
  <div class="next-video next-video--1">
    <img class="next-video__img" src="{firstNextVideoUrl}" alt="thumbnail of next video 1" />
    <div class="next-video__overlay"></div>
  </div>
  <div class="next-video next-video--2">
    <img class="next-video__img" src="{secondNextVideoUrl}" alt="thumbnail of next video 2" />
    <div class="next-video__overlay"></div>
  </div>
</div>

<style lang="postcss">
@import '../style/mixins.pcss';

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
  position: relative;
  
  &--1 {
    grid-area: video-1;
  }

  &--2 {
    grid-area: video-2;
  }

  &__img {
    @include full-cover;

    filter: sepia(1) hue-rotate(-200deg) grayscale(0.6) contrast(1.5) brightness(.7);
    transition: filter ease-in-out .5s;

    &:hover {
      filter: sepia(0) hue-rotate(0deg) grayscale(0) contrast(1);
    }
  }

  &__overlay {
    @include full-absolute;

    background-image: linear-gradient(90deg, #EEEEEE 0%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.90) 100%);
    pointer-events: none;
  }
}
</style>