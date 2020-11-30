<script>
  import Draggable from 'Draggable'
  import { onMount } from 'svelte';
  let isOpen = false 
  export let scheduleData
  const schedule = scheduleData.values

  setTimeout(function() {
    console.log('schedule data', schedule)
  }, 1000)

  function handleClick() {
    // isOpen ? isOpen = false : isOpen = true
    if (isOpen) {
      isOpen = false 
    }
    else {
      isOpen = true
      // timeout waits for box to load
      setTimeout(() => {
        makeDraggable()
      }, 1000)
    }
  }

  function handleClose() {
    isOpen = false
  }

  function makeDraggable() {
    let scheduleBox = document.getElementsByClassName('radio-schedule-box')[0]
    let scheduleBoxWidth = scheduleBox.clientWidth
    let scheduleBoxHeight = scheduleBox.clientHeight
    let limitXLeft = 0
    let limitXRight = (window.innerWidth - scheduleBoxWidth)
    let limitYTop = 0
    let limitYBottom = (window.innerHeight - scheduleBoxHeight)
    let options = {
      setPosition: false,
      limit: {
        x: [limitXLeft, limitXRight],
        // y: [limitYTop, limitYBottom],
      }
    }
    new Draggable(scheduleBox, options)
  }

  function returnArtist(str) {
    return typeof(str) !== 'undefined' ? 'w/' + ' ' + str : ''
  }

</script>

{#if isOpen}
<div class = "radio-schedule-box">
  <div class = "radio-schedule-box_close" on:click={handleClose}>CLOSE</div>
  {#if scheduleData !== false}
    {#each schedule as entry}
      {#if entry[2] !== undefined}
      <div class = "radio-schedule-box_entry">
        <div class = "radio-schedule-box_entry_time">{entry[0]}</div>
        <div class = "radio-schedule-box_entry_title">{entry[2]}</div>
        <div class = "radio-schedule-box_entry_title">{returnArtist(entry[3])}</div>
      </div>
      {/if}
    {/each}
  {:else}
    <div class = "radio-schedule-box_entry">PUB Radio is off air right now, check the calendar for other events</div>
  {/if}
</div>
{/if}

<div class={"footer-radio-container_schedule"} on:click={handleClick}>
  Schedule
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";

  .radio-schedule-box {
    position: fixed;
    bottom: calc(#{$footerHeight} + 2rem);
    right: 25vw;
    width: 25vw;
    height: 50vh;
    background: black;
    color: white;
    border: solid white 1px;
    display: flex;
    flex-flow: column;
    overflow: scroll;
    padding: calc(#{$padding} / 2);
    min-width: 250px;
    cursor: move;
    &_close {
      @include type-sans-sm;
      align-self: flex-end;
      margin-bottom: .5rem;
      padding: $padding $padding 0 0;
      cursor: pointer;
    }
    &_entry {
      border: solid white 1px;
      border-radius: 15px 15px;
      padding: .5rem;
      margin-bottom: calc(#{$padding} / 2);
      &_time {
        @include type-serif-sm;
      }
      &_title {
        @include type-sans-md;
        color: $lime;
      }
    }
    @include bp-xs {
      width: 75vw;
      top: $menuHeight;
      left: 0;
      margin: 1rem 0 0 1rem;
      height: 65vh;
    }
  }

</style>