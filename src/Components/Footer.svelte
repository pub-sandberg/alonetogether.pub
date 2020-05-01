<script>
  import axios from 'axios'
  // import moment from 'moment'
  import moment from 'moment-timezone'
  // import 'moment-timezone';
  import Radio from './Footer/Radio.svelte'
  import Chat from './Footer/Chat.svelte'
  import { onMount } from 'svelte';

  moment.tz.setDefault("Europe/Amsterdam");

  import { isMobile, isCinema } from '../store.js'

  console.log('is mobile?', $isMobile)
  
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  const spreadsheetKey = process.env.GOOGLE_SPREADSHEET_KEY

  const reqUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values:batchGet?ranges=Sheet1!A2:D2&ranges=Sheet1!A5:E100&key=' + spreadsheetKey
  let data

  async function getData() {
    try {
      let response = await axios.get(reqUrl);
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

</script>


<div class = "footer">
  <!-- {#if $isCinema} -->
    <!-- <div>Cinema footer</div> -->
    <!-- <Chat type='cinema' /> -->
  <!-- {:else} -->
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
              <Radio now={false} future={true} date={items[0].values[0][0]} time={items[0].values[0][2]} />
            {:else}
              <Radio now={false} future={false} date={items[0].values[0][0]} time={items[0].values[0][2]} />
            {/if}
          {/if}
      {/await}
    {/if}
    {#if !$isMobile}
      <div class = "footer-chat-container">
        {#if data !== undefined}
          <div class = "footer-chat-container_label">CHAT</div>
        {/if}
        <Chat type='radio' />
      </div>
    {/if}
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
    background: black;
  }

  .footer-chat-container {
    // set in embed
    width: $chatWidth;
    display: flex;
    height: 100%;
    &_label {
      height: 20px;
      border: solid white 1px;
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