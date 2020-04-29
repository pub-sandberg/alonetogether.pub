<script>
  import moment from 'moment'
  import Schedule from './Schedule.svelte'
  import Ticker from 'svelte-ticker';
  export let title
  export let now
  export let future
  export let date
  export let time
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

  function returnFutureDate(str) {
    let current = moment()
    let date = moment(str, 'DD-MM-YYYY')
    if (date.diff(current, 'days') === 0) {
      if (date.isSame(current, 'day')) {
        return 'TODAY'
      }
      else {
        return 'TOMORROW'
      }
    }
    else {
      return 'ON' + ' ' + date.format('DD/MM/YYYY')
    }
  }

</script>

<div class = "footer-radio-container">
  <div class = "footer-radio-container_logo">
    <!-- PUB Radio -->
    <img src = 'images/logo-2.svg' alt="Alone Together Radio" />
  </div>
  {#if now}
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
      <Ticker duration={50}>
        <!-- repeat so anim always kicks off  -->
        {#each Array(10) as _, i}
          <div class = "footer-radio-container_playing_title">
            <span>Playing Now:</span> {title}
          </div>
        {/each}
      </Ticker>
    </div>
    <audio controls id = "audioEl" src = "https://r.0x56.net/live"></audio>
    <Schedule scheduleData={scheduleData} />
  {:else}
    {#if future}
      <div class = "footer-radio-container_message">NO RADIO RIGHT NOW &#x1F61E;NEXT SHOW WILL BE {returnFutureDate(date)} AT {time} &#x1F4E1;</div>
    {:else}
      <div class = "footer-radio-container_message">NO RADIO RIGHT NOW &#x1F61E;</div>
    {/if}
  {/if}

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
    @include bp-xs {
      width: 100%;
      border: none;
    }
    &_logo {
      width: 15%;
      // border: solid black 1px;
      // border-radius: 10px 10px;
      margin-right: calc(#{$padding} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: $lime;
      @include type-serif-lg;
      font-style: italic;
      @include bp-xs {
        display: none;
      }
      & img {
        max-width: 95%;
        max-height: 95%;
      }
    }
    &_message {
      color: white;
      @include type-sans-md;
      align-self: center;
      justify-self: center;
      width: 75%;
      margin-left: 5%;
      padding: 0 1rem 0 1rem;
      text-align: center;
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
      border-radius: 25px 25px;
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
          @include bp-xs {
            @include type-serif-md;
          }
        }
      }
      @include bp-xs {
        @include type-sans-md;
      }
    }
    &_schedule {
      width: calc(25% - (#{$footerHeight} / 2));
      // background: pink;
      align-self: flex-end;
      overflow: scroll;
      border: solid white 1px;
      border-radius: 25px 25px;
      color: white;
      background: black;
      // margin-right: $padding;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      @include type-sans-lg;
      height: 100%;
      text-transform: uppercase;
      @include bp-xs {
        width: 25%;
        @include type-sans-sm;
      }
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