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
    Today is {endFormat}<br/>
    We have passed {daysPassed} days alone together
  </div>
</div>

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
    color: $lime;
    justify-content: center;
    align-items: center;
    display: flex;
    &_inner {
      @include type-sans-lg;
      text-align: center;
    }
  }

</style>