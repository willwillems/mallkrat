<script>
import { tweened } from 'svelte/motion';
import { linear } from 'svelte/easing';

const initialSize = 128
const duration = 1000

const height = tweened(initialSize, {
    duration,
    easing: linear
})

const width = tweened(initialSize, {
    duration,
    easing: linear
})

function join () {
    const { clientHeight: appHeight, clientWidth: appWidth } = document.getElementById('app')
    const { clientHeight: footerHeight                     } = document.getElementById('footer')

    const calcHeight = appHeight - footerHeight + 2
    const calcWidth = appWidth + 2

    height.set(calcHeight, { duration: (duration * calcHeight / calcWidth)})
    width.set(calcWidth)
  // alert("no")
}
</script>

<!-- This one is a bit tricky to do with a native button? -->
<svg on:click={join} class="{$$props.class}" style=" transform: translate(calc(-100% + 127px), calc(-100% + 127px));" width="{$width}" height="{$height}" viewBox="0 0 {$width} {$height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="#000" fill-rule="evenodd">
        <rect id="Rectangle-Copy-22" stroke="#FFFFFF" stroke-width="1" x="1" y="1" width="{$width - 2}" height="{$height - 2}"></rect>
        <line x1="0" y2="0" y1="{initialSize}" x2="{initialSize}" id="Line-3" stroke="#FFFFFF" stroke-width="1" stroke-linecap="square"></line>
        <text id="JOIN" transform="translate(45.031223, 47.031223) rotate(-45.000000) translate(-45.031223, -47.031223) " font-family="HelveticaNeue-Bold, Helvetica Neue" font-size="14" font-weight="bold" fill="#FFFFFF">
            <tspan x="28.0312229" y="52.5312229">JOIN</tspan>
        </text>
    </g>
</svg>