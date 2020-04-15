<script>
  import Schedule from './Schedule.svelte'
  import Ticker from 'svelte-ticker';
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
  <div class = "footer-radio-container_audio-btn" on:click={handleClick}>
    {#if isPlaying}
      <!-- PAUSE -->
      <img src = 'images/pause.svg' alt="PAUSE" />
    {:else}
      <!-- PLAY -->
      <img src = 'images/play.svg'alt="PLAY" /> 
    {/if}
  </div>
  <div class = "footer-radio-container_playing">
    <Ticker duration={450}>
      <!-- repeat so anim always kicks off  -->
      {#each Array(100) as _, i}
        <div class = "footer-radio-container_playing_title">
          <span>Playing Now:</span> {title}
        </div>
      {/each}
    </Ticker>
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
      width: 15%;
      // border: solid black 1px;
      // border-radius: 10px 10px;
      margin-right: calc(#{$padding} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: $teal;
      @include type-serif-lg;
      font-style: italic;
    }
    &_audio-btn {
      // width: 16.67%;
      width: $footerHeight;
      height: calc(#{$footerHeight} - .25rem);
      border: solid white 1px;
      background: black;
      color: white;
      border-radius: 50% 50%;
      margin-right: calc(#{$padding} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      @include type-sans-md;
      & img {
        max-width: 50%;
        max-height: 50%;
      }
      &:hover {
        // background: white;
        color: black;
      }
    }
    &_playing {
      width: calc(65% - (#{$footerHeight} / 2));
      border: solid white 1px;
      background: black;
      color: white;
      border-radius: 20px 20px;
      margin-right: calc(#{$padding} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      @include type-sans-lg;
      &_title {
        margin-right: 2rem;
        & span {
          @include type-serif-lg;
          color: $lime;
        }
      }
    }
    &_schedule {
      width: calc(25% - (#{$footerHeight} / 2));
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
      @include type-sans-md;
      &:hover {
        background: white;
        color: black;
      }
      &.closed {
        height: 100%;
        text-transform: uppercase;
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
    & audio {
      display: none;
    }
  }

</style>