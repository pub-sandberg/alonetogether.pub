<script>
  import axios from 'axios'
  import moment from 'moment'
  import Loader from './Global/Loader.svelte'
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ARCHIVE_ID
  const spreadsheetKey = process.env.GOOGLE_SPREADSHEET_KEY

  const reqUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values:batchGet?ranges=Sheet1!A2:D1000&key=' + spreadsheetKey
  let data

  console.log('radio archive')

  async function getData() {
    try {
      let response = await axios.get(reqUrl);
      data = response.data.valueRanges[0].values
      console.log('data', data)
      console.log('...', data[0][0])
      data.sort((a, b) => moment(b[0], 'DD-MM-YYYY') - moment(a[0], 'DD-MM-YYYY'))
      // SORT DATA IN ORDER
    } catch (error) {
      // throw error
      data = []
    }
  }

  // init
  getData()
</script>

<div class = "archive-container">
  {#if data === undefined}
    <Loader name='Radio Archive' />
  {:else}
    {#each data as entry}
      <div class = "archive-container_entry">
        <a class = "archive-container_entry_link" href="{entry[3]}" target="_blank">
          <div class = "rarchive-container_entry__date">{entry[0]}</div>
          <div class = "archive-container_entry_title">{entry[1]} w/ {entry[2]}</div>
        </a>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";
  
  .archive-container {
    width: 100%;
    // height: 100%;
    // display: flex;
    padding: $padding;
    color: white;
    padding-bottom: calc(#{$footerHeight} * 2);
    &_entry {
      width: 65%;
      background: black;
      border: solid white 1px;
      margin-bottom: calc(#{$padding} / 2);
      border-radius: 25px 25px;
      padding: .5rem;
      display: flex;
      height: auto;
      max-width: 700px;
      @include bp-xs {
        width: 100%;
      }
      &:hover {
        background: white;
        & * {
          color: black;
        }
      }
      &_link {
        color: white;
        text-decoration: none;
        @include type-serif-md;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
      }
      &_name {
        color: $lime !important;
        @include type-sans-lg;
      }
      &_title {
        color: $lime;
        @include type-sans-lg;
      }
    }
  }

</style>