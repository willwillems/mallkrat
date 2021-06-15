<script>
   import { createEventDispatcher } from 'svelte';

   export let volume;

   const dispatch = createEventDispatcher();

   $: barStyle = `height: ${ (1 - volume) * 100}%;`


	function handleClick(e) {
      const targetVolume = 1 - (e.layerY / e.srcElement.clientHeight)
      dispatch('update:volume', targetVolume);
   }

   function handleDoubleClick(e) {
      const targetVolume = 1
      dispatch('update:volume', targetVolume);
   }

</script>

<div class="bar {$$props.class}" on:click|self={handleClick} on:dblclick|self={handleDoubleClick}>
   <div
      class="bar-fill"
      style={barStyle}
   ></div>
</div>

<style lang="postcss">
.bar {
  cursor: pointer;
}

.bar-fill {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--border-color);
  pointer-events: none;
}
</style>