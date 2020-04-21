<script>
  import axios from 'axios'
  import moment from 'moment'
  import Radio from './Footer/Radio.svelte'
  import Chat from './Footer/Chat.svelte'
  import { isMobile, isCinema } from '../store.js'
  
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  const spreadsheetKey = process.env.GOOGLE_SPREADSHEET_KEY

  const reqUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values:batchGet?ranges=Sheet1!A2:B2&ranges=Sheet1!A5:E100&key=' + spreadsheetKey
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

  function isToday(str) {
    let dateString = str
    let date = moment(dateString, 'DD-MM-YYYY')
    return moment(date).isSame(moment(), 'day')
  }

  function isFuture(str) {
    let dateString = str
    let date = moment(dateString, 'DD-MM-YYYY')
    return moment(date).isAfter(moment(), 'day')
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
          {#if (isToday(items[0].values[0][0]))}
            <Radio today={true} future{false} title={items[0].values[0][1]} scheduleData={items[1]} date={items[0].values[0][0]} />
          {:else}
            {#if (isFuture(items[0].values[0][0]))}
              <Radio today={false} future={true} date={items[0].values[0][0]} />
            {:else}
              <Radio today={false} future={false} date={items[0].values[0][0]} />
            {/if}
          {/if}
      {/await}
    {/if}
    {#if !$isMobile}
      <div class = "footer-chat-container">
        <Chat type='radio' />
      </div>
    {/if}
  <!-- {/if} -->
</div>

<style lang="scss" global>
  @import "./style/global.scss";

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
    width: 250px;
    display: inline-flex;
    @include bp-xs {
      display: none;
    }
  }
</style>