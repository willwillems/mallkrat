<script>
   import { createEventDispatcher } from 'svelte';

   export let volume;

   const dispatch = createEventDispatcher();

   $: barStyle = `height: ${ (volume) * 100}%;`


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
  position: relative;
  cursor: pointer;
}

.bar-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background-color: var(--border-color);
  /* border: var(--border-width) solid var(--border-color); */
  pointer-events: none;
}
</style>