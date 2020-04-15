<script>
  import Schedule from './Schedule.svelte'
  export let title
  export let scheduleData
  let isPlaying = false 

  function handleClick() {
    if (isPlaying) {
      document.getElementById('audioEl').pause()
      isPlaying = false
    }
    else {
      document.getElementById('audioEl').play()
      isPlaying = true
    }
  }

</script>

<div class = "footer-radio-container">
  <div class = "footer-radio-container_title">
    Now Playing:<br/>
    {title}
  </div>
  <div class = "footer-radio-container_audio-btn" on:click={handleClick}>
    {#if isPlaying}
      PAUSE
    {:else}
      PLAY
    {/if}
  </div>
  <audio controls id = "audioEl" src = "https://r.0x56.net/live"></audio>
  <Schedule scheduleData={scheduleData} />
</div>

<style lang="scss" global>

  @import "./style/global.scss";

  .footer-radio-container {
    // 250px is a fixed width of the chatbox
    // will make it a variable
    width: calc(100% - 250px);
    height: 100%;
    align-content: flex-end;
    display: flex;
    &_title {
      width: 25%;
      background: green;
    }
    &_schedule {
      width: 25%;
      background: pink;
      align-self: flex-end;
      overflow: scroll;
      &.closed {
        height: 100%;
      }
      &.open {
        height: 400px;
        width: 30%;
        position: fixed;
        // this needs to be variable
        // + will need to account for padding-right of it/by chatbox
        margin-right: 250px;
        right: 0;
        padding: .25rem;
      }
      &_entry {
        margin-bottom: 1rem;
      }
    }
    &_audio-btn {
      width: 50%;
    }
    & audio {
      display: none;
    }
  }

</style>