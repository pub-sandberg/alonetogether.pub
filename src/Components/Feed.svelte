<script>
  import moment from 'moment'
  // export let url
  // 15-03-2020
  let start = moment("2020-03-15", "YYYY-MM-DD");
  let end = moment()
  let endFormat = end.format('LL')
  let daysPassed = parseInt(moment.duration(end.diff(start)).asDays())
</script>

<div class = {"feed-container"}>
  <div class = "feed-container_inner">
    <!-- <a href = "/..">TEST</a> -->
    <img src = './images/radio.jpeg' />
    <!-- Today is {endFormat}<br/>
    We have passed {daysPassed} days alone together -->
    <!-- <a href='https://blacklivesmatters.carrd.co' target='_blank'>https://blacklivesmatters.carrd.co</a> -->
  </div>
</div>

<!-- <div>JUSTICE FOR GEORGE FLOYD</div> -->
<!-- <div>-</div> -->
<!-- <div>Follow links below to support financially</div> -->
<!-- <div>–</div> -->
<!-- <div><a href="https://minnesotafreedomfund.org/" target="_blank">Minnesota Freedom Fund</a></div> -->
<!-- <div><a href="https://www.gofundme.com/f/georgefloyd" target="_blank">Memorial fund for George Floyd</a></div> -->
<!-- <div><a href="https://www.reclaimtheblock.org/home" target="_blank">Reclaim the Block</a></div> -->
<!-- <div><a href="https://www.blackvisionsmn.org/" target="_blank">Black Visions Collective</a></div> -->
<!-- <div><a href="https://www.northstarhealthcollective.org/" target="_blank">North Star Health Collective</a></div> -->
<!-- <div><a href="https://www.gofundme.com/f/george-floyd-bigfloyd" target="_blank">GoFundMe for George Floyd</a></div> -->
<!-- <div><a href="https://brooklynbailfund.org/" target="_blank">Brooklyn community bail fund</a></div> -->
<!-- <div><a href="https://www.communityjusticeexchange.org/nbfn-directory" target="_blank">Directory of Community bail funds (all states)</a></div> -->
<!-- <div>–</div> -->
<!-- <div>BLACK LIVES MATTER</div> -->

<style lang="scss" global>
  @import "./style/global.scss";
  
  .feed-container {
    width: 50%;
    height: 100%;
    border: solid white 1px;
    border-top: 0;
    border-left: 0;
    border-bottom: 0;
    border-right: 0;
    // color: $lime;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    // background: black;
    overflow: scroll;
    &_inner {
      @include type-sans-lg;
      text-align: center;
      // padding: $padding;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        // filter: greyscale();
      }
      & div {
        margin-bottom: .5rem;
      }
      & div:last-child {
        margin-bottom: 1rem;
      }
      & a {
        color: $lime;
        text-decoration: none;
      }
      & div a {
        text-decoration: none;
        color: white;
        &:hover {
          color: $lime;
        }
      }
    }
  }

</style>