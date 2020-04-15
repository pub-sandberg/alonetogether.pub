<script>
  import axios from 'axios'
  import moment from 'moment'
  import Radio from './Footer/Radio.svelte'
  
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

<!-- this will be a footer component most likely (with chat) -->
<div class = "footer">
  {#if data === undefined}
    <div>Loading...</div>
  {:else}
    {#await data}
      <div>Loading</div>
      {:then items}
        {#if (isToday(items[0].values[0][0]))}
          <Radio title={items[0].values[0][1]} scheduleData={items[1]} />
        {:else}
          {#if (isFuture(items[0].values[0][0]))}
            <div>Next show is: {items[0].values[0][0]}</div>
          {:else}
            <div>No radio today :(</div>
          {/if}
        {/if}
    {/await}
  {/if}
  <!-- will need to add a class to render style conditionally for chat -->
  <div class = "footer-chat-container">
    <script id="cid0020000247791998510" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 400px;height: 500px;">{"handle":"pubpillowstream","arch":"js","styles":{"a":"000000","b":100,"c":"FFFFFF","d":"FFFFFF","e":"000000","g":"ffffff","h":"000000","j":"ffffff","k":"808080","l":"000000","m":"000000","n":"FFFFFF","p":"12.96","q":"000000","r":100,"t":0,"ab":false,"usricon":0,"pos":"br","cv":1,"cvfnt":"Baskerville, 'Baskerville Old Face', 'Hoefler Text', Garamond, 'Times New Roman', serif, sans-serif","cvfntsz":"14px","cvbg":"000000","cvfg":"ffffff","cvw":250,"cvh":70,"sbc":"ffffff","surl":0,"allowpm":0,"ticker":1,"fwtickm":1}}</script>
  </div>
</div>

<style lang="scss" global>
  @import "./style/global.scss";

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    // should be responsive?
    height: 70px;
    background: white;
    padding: $padding;
    display: flex;
    align-items: center;
    border: solid black 1px;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
  }

  .footer-chat-container {
    // set in embed
    width: 250px;
    display: inline-flex;
  }
</style>