<script>
  let isOpen = false 
  export let scheduleData
  const schedule = scheduleData.values

  function handleClick() {
    isOpen ? isOpen = false : isOpen = true
  }

  function handleClose() {
    isOpen = false
  }

</script>

{#if isOpen}
<div class = "radio-schedule-box">
  <div class = "radio-schedule-box_close" on:click={handleClose}>CLOSE</div>
  {#each schedule as entry}
    {#if entry[2] !== undefined}
    <div class = "radio-schedule-box_entry">
      <div class = "radio-schedule-box_entry_time">{entry[0]}</div>
      <div class = "radio-schedule-box_entry_title">{entry[2]}</div>
      <div class = "radio-schedule-box_entry_title">w/ {entry[3]}</div>
    </div>
    {/if}
  {/each}
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