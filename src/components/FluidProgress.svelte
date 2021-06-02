<script>
   import { createEventDispatcher } from 'svelte';

   export let progress;
   export let progressing;

   let barWidth;

   const dispatch = createEventDispatcher();

   $: boxCount = Math.floor(Math.max(20, Math.min(barWidth/20, 100)))
   $: boxCountProgress = Math.floor(boxCount * progress)
   $: barStyle = `grid-template-columns: repeat(${boxCount}, 1fr);`
   $: boxes = [...Array.from({ length: boxCountProgress }, () => ({})), {fluid: true}]

   

	function handleClick(e) {
    const targetProgress = e.layerX / e.srcElement.clientWidth
		dispatch('update:progress', targetProgress);
	}

</script>

<div class="bar {$$props.class}" bind:clientWidth={barWidth} style={barStyle} on:click|self={handleClick}>
   {#each boxes as box}
   <div
      class="box"
      class:box--fluid={box.fluid}
      class:box--fluid--paused={!progressing}
   ></div>
   {/each}
</div>

<style lang="scss">
.bar {
   display: grid;
   grid-auto-flow: column;
   grid-gap: 4px;
   justify-content: start;
   cursor: pointer;
}

.box {
  // width: 1rem;
  line-height: 2rem;
  position: relative;
  overflow: hidden;
  background-color: var(--border-color);
  pointer-events: none;

  &--fluid {
    background-color: unset;

    &:before {
      content: "";
      position: absolute;
      width: 4rem;
      height: 4rem;
      background: var(--border-color);
      left: 50%;
      transform: translateX(-50%) rotate(0deg);
      border-radius: 40%;
      animation: fill 70s ease-in-out forwards;
      animation-play-state: running;
    }

    &--paused {
       &:before {
         animation-play-state: paused;
       }
    }
  }
}


@keyframes fill {
  from {
    top: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    top: 0;
    transform: translateX(-50%) rotate(7turn);
  }
}
</style>