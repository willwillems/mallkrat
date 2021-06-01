<script>
import AppFluidProgress from "./components/FluidProgress.svelte"
import { progress } from "./TheVideoPlayer/state"


</script>

<footer id="footer">
  <AppFluidProgress progress={$progress} />
</footer>

<style lang="scss">
@import '../src/style/mixins.scss';

#footer {
  @include box-w-2;
  grid-area: footer;
}
</style>