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
  <div class = "footer-radio-container_logo">
    PUB Radio
  </div>
  <div class = "footer-radio-container_playing">
    NOW PLAYING: {title}
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
  @import "./style/helpers.scss";

  .footer-radio-container {
    // 250px is a fixed width of the chatbox
    // will make it a variable
    width: calc(100% - #{$chatWidth});
    height: 100%;
    align-content: flex-end;
    display: flex;
    padding: calc(#{$padding} / 2);
    border: solid white 1px;
    border-top: 0;
    border-left: 0;
    border-bottom: 0;
    &_logo {
      width: 16.67%;
      // border: solid black 1px;
      // border-radius: 10px 10px;
      margin-right: calc(#{$padding} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: $lime;
      @include type-sans-lg;
    }
    &_playing {
      width: 50%;
      border: solid white 1px;
      background: black;
      color: white;
      border-radius: 20px 20px;
      margin-right: calc(#{$padding} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      @include type-serif-lg;
      color: $teal;
    }
    &_schedule {
      width: 16.67%;
      // background: pink;
      align-self: flex-end;
      overflow: scroll;
      border: solid white 1px;
      border-radius: 20px 20px;
      color: white;
      background: black;
      // margin-right: $padding;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: white;
        color: black;
      }
      &.closed {
        height: 100%;
      }
      &.open {
        height: 400px;
        width: 30%;
        position: fixed;
        // this needs to be variable
        // + will need to account for padding-right of it/by chatbox
        margin-right: $chatWidth;
        right: calc(#{$padding} / 2);
        padding: .25rem;
        display: inline-block;
      }
      &_entry {
        margin-bottom: 1rem;
      }
    }
    &_audio-btn {
      width: 16.67%;
      border: solid white 1px;
      background: black;
      color: white;
      border-radius: 20px 20px;
      margin-right: calc(#{$padding} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: white;
        color: black;
      }
    }
    & audio {
      display: none;
    }
  }

</style>