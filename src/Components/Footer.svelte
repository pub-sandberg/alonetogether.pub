<script>
  import axios from 'axios'
  // import moment from 'moment'
  import moment from 'moment-timezone'
  // import 'moment-timezone';
  import Radio from './Footer/Radio.svelte'
  import Chat from './Footer/Chat.svelte'
  import { onMount } from 'svelte';

  moment.tz.setDefault("Europe/Amsterdam");

  import { isMobile, isCinema, chatOpen } from '../store.js'

  console.log('is mobile?', $isMobile)
  
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  const spreadsheetKey = process.env.GOOGLE_SPREADSHEET_KEY

  const reqUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values:batchGet?ranges=Sheet1!A2:D2&ranges=Sheet1!A5:E100&key=' + spreadsheetKey
  let data

  async function getData() {
    try {
      let response = await axios.get(reqUrl);
      console.log('response?', response)
      data = response.data.valueRanges
    } catch (error) {
      // throw error
      data = []
    }
  }

  // init
  getData()

  const format = 'DD-MM-YYYY hh:mm:ss'   

  function isNow(data) {
    // set timezone
    let dateString = data[0]
    let today = moment(dateString, 'DD-MM-YYYY')
    let tomorrow = moment(today).add(1, 'days')

    let current = moment()
    let startTime = moment(dateString + ' ' + data[2], format)
    let end = data[3] !== undefined ? moment(dateString + ' ' + data[3], format) : startTime.add(8, 'hours')
    let endTime = startTime.isAfter(end) ? end.add(1, 'days') : end

    return current.isBetween(startTime, endTime)
  }
  
  function isFuture(data) {
    let dateString = data[0] 
    let date = moment(dateString, 'DD-MM-YYYY')
    let current = moment()
    let startTime = moment(dateString + ' ' + data[2], format)
    return moment(startTime).isAfter(current)
  }

  function returnTime(time) {
    return moment(time, "h:mm:ss A").format("HH:mm")
  }

  function handleChatClick() {
    $chatOpen ? chatOpen.set(false) : chatOpen.set(true)
  }

</script>


<div class = "footer">
    {#if data === undefined}
      <div>Loading...</div>
    {:else}
      {#await data}
        <div>Loading</div>
        {:then items}
          <!-- {#if (isToday(items[0].values[0][0], items))} -->
          {#if (isNow(items[0].values[0]))}
            <Radio now={true} future{false} title={items[0].values[0][1]} scheduleData={items[1]} date={items[0].values[0][0]} />
          {:else}
            {#if (isFuture(items[0].values[0]))}
              <Radio now={false} future={true} date={items[0].values[0][0]} scheduleData={items[1]} time={returnTime(items[0].values[0][2])} />
            {:else}
              <Radio now={false} future={false} date={items[0].values[0][0]} scheduleData={false} time={returnTime(items[0].values[0][2])} />
            {/if}
          {/if}
      {/await}
    {/if}
    <!-- {#if !$isMobile} -->
      <div class = "footer-chat-container">
        {#if data !== undefined}
          <div class = "footer-chat-container_btn" on:click={handleChatClick}>CHATROOM</div>
        {/if}
        {#if $chatOpen}
          <Chat type='radio' />
        {/if}
      </div>
    <!-- {/if} -->
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: $footerHeight;
    // background: black;
    // padding: $padding;
    display: flex;
    align-items: center;
    border: solid white 1px;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    // background: black;
    // ... 
  }


  .footer-chat-container {
    // set in embed
    // width: $chatWidth;
    width: 25%;
    display: flex;
    height: 100%;
    // ...
    padding: calc(#{$padding} / 2) calc(#{$padding} / 2) calc(#{$padding} / 2) 0;
    &_btn {
      color: $lime;
      @include type-sans-lg;
      border: solid white 1px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 25px 25px;
      cursor: pointer;
      &:hover {
        background: white;
        color: black;
      }
      @include bp-xs {
        @include type-sans-sm;
      }
    }
    &_label {
      height: 20px;
      // border: solid white 1px;
      border-right: 0;
      border-top: 0;
      border-left: 0;
      display: flex;
      align-items: center;
      padding-left: calc(#{$padding} / 2);
      width: 100%;
      background: black;
      @include type-sans-sm;
      color: $lime;
    }
    @include bp-xs {
      display: none;
    }
  }
</style>