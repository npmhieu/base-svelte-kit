<script lang="ts">
    export let zoomLevel;
    export let maxLevel = 1.6;
    export let minLevel = 0.6;
    export let step = 0.2;

    function zoomIn() {
        if (zoomLevel >= maxLevel) {
            return;
        }
        zoomLevel += step;
    }

    function zoomOut() {
        if (zoomLevel <= minLevel) {
            return;
        }
        zoomLevel -= step;
    }
</script>

<section>
    <div class="zoom-in" on:click={zoomIn}></div>
    <!--    <input type="range" min={0.5} max={2.5} step={0.5} class="slider" bind:value={zoomLevel}>-->
    <div class="zoom-out mt-3" on:click={zoomOut}></div>
</section>

<style lang="scss">

  section {
    transition: .1s all ease-in;
    height: 26px;
    width: 26px;
    overflow: hidden;

    .slider {
      transform: rotate(-90deg);
      width: 0;
      opacity: 0;
      display: none;
      height: 0;
      transition: .5s all ease-in;
    }

    .zoom-in {
      width: 26px;
      height: 26px;
      background-color: grey;
      -webkit-mask: url('/images/search-zoom-in.svg') center center/ 20px no-repeat;
      mask: url('/images/search-zoom-in.svg') center center / 20px no-repeat;

    }

    .zoom-out {
      width: 26px;
      height: 26px;
      background-color: grey;
      -webkit-mask: url('/images/search-zoom-out-1.svg') center center/ 20px no-repeat;
      mask: url('/images/search-zoom-out-1.svg') center center/ 20px no-repeat;

    }

    &:hover, &:active {
      height: 64px;
      cursor: pointer;

      .slider {
        width: 50px;
        display: inline-block;
        opacity: 1;
        height: 5px;
      }
    }
  }
</style>
