<script>
import AppFluidProgress from "../components/FluidProgress.svelte"
import { progress, playing } from "./TheVideoPlayer/state"
import { setProgress } from "./TheVideoPlayer/player"

function handleProgresUpdate (e) {
  setProgress(e.detail)
}
</script>

<footer id="footer">
  <AppFluidProgress class="footer-progress-bar" progress={$progress} progressing={$playing} on:update:progress={handleProgresUpdate}/>
</footer>

<style lang="scss">
@import '../src/style/mixins.scss';

#footer {
  @include box-w-2;
  grid-area: footer;
}

:global(.footer-progress-bar) {
  height: 100%;
  width: 100%;
  padding: 4px;
}
</style>