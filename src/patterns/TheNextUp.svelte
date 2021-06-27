<script>
import { getVideoId, getVideoImg } from "$lib/ytdata"
import { each } from "svelte/internal";
import { videoList, setActiveVideoId } from "../store/videos"

$: firstNextVideoId   = $videoList && $videoList[0] && getVideoId($videoList[0])
$: firstNextVideoUrl  = $videoList && $videoList[0] && getVideoImg($videoList[0])
$: secondNextVideoId  = $videoList && $videoList[0] && getVideoId($videoList[1])
$: secondNextVideoUrl = $videoList && $videoList[0] && getVideoImg($videoList[1])

</script>

<div id="next">
  <div class="video-scroller">
    {#each $videoList as video}
    <div class="next-video" on:click={setActiveVideoId(getVideoId(video))}>
      <img class="next-video__img" src="{getVideoImg(video)}" alt="thumbnail of next video 1" />
      <div class="next-video__overlay"></div>
    </div>
    {/each}
  </div>
</div>

<style lang="postcss">
@import '../style/mixins.pcss';

#next {
  @include box-w-2;
  grid-area: next;

  position: relative;
}

.video-scroller {
  position: absolute;
  height: 100%;
  overflow-y: scroll;

  scroll-snap-type: y mandatory;

  ::-webkit-scrollbar {
    display: none;
  }
}

.next-video {
  @include box-w-2;
  position: relative;
  height: 50%;

  cursor: pointer;
  scroll-snap-align: start;
  

  &__img {
    @include full-cover;

    filter: sepia(1) hue-rotate(-200deg) grayscale(0.6) contrast(1.5) brightness(.7);
    transition: filter ease-in-out .5s;

    &:hover {
      filter: sepia(1) hue-rotate(-200deg) grayscale(0.2) contrast(1);
    }
  }

  &__overlay {
    @include full-absolute;

    background-image: linear-gradient(90deg, #EEEEEE 0%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.90) 100%);
    pointer-events: none;
  }
}
</style>