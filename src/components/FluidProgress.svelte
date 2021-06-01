<script>
   export let progress;

   let barWidth;

   $: boxCount = Math.floor(Math.max(20, Math.min(barWidth/20, 100)))
   $: boxCountProgress = Math.floor(boxCount * progress)
   $: barStyle = `grid-template-columns: repeat(${boxCount}, 1fr);`
   $: boxes = [...Array.from({ length: boxCountProgress }, () => ({})), {fluid: true}]

</script>

<div class="bar" bind:clientWidth={barWidth} style={barStyle}>
   {#each boxes as box}
   <div
      class="box"
      class:box--fluid={box.fluid}
   ></div>
   {/each}
</div>

<style lang="scss">
.bar {
   margin: 4px;
   display: grid;
   grid-auto-flow: column;
   grid-gap: 4px;
   justify-content: start;

   height: calc(100% - 8px); // TEMP bas height on grid in parent
}

.box {
  // width: 1rem;
  line-height: 2rem;
  position: relative;
  overflow: hidden;
  background-color: white;

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
      animation: fill 20s ease-in-out infinite;
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
    transform: translateX(-50%) rotate(360deg);
  }
}
</style>