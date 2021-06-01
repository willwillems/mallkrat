<script>
  import { toggle } from '../player'
  import { playing } from '../state'
</script>

<button on:click={toggle} class="{$$props.class}" style="padding: 2rem;">
  {#if $playing}
  <svg viewBox="0 0 66 64">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect id="Rectangle" stroke="#FFFFFF" stroke-width="3" x="2" y="4" width="18" height="56"></rect>
      <rect id="Rectangle-Copy" stroke="#FFFFFF" stroke-width="3" x="46" y="4" width="18" height="56"></rect>
    </g>
  </svg>
  {:else}
  <svg viewBox="0 0 64 64">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <polygon stroke="#FFFFFF" stroke-width="3" points="16 9 16 55 56 30"></polygon>
      <rect x="0" y="0" width="64" height="64"></rect>
    </g>
  </svg>
  {/if}
</button>