<script>
import axios from 'axios'
import moment from 'moment'
const calendarId = process.env.GOOGLE_CALENDAR_ID
const calendarKey = process.env.GOOGLE_CALENDAR_KEY

var reqUrl = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + calendarKey
let quarantineStart = '2020-03-15'
let data

async function getCalendar() {
  try {
    let response = await axios.get(reqUrl);
    data = response.data.items.sort(function(a, b) {
      return moment(b.start.dateTime) - moment(a.start.dateTime)
    })
  } catch (error) {
    // throw error
    data = []
  }
}

// init
getCalendar()

function returnStart(str) {
  return moment(str).format('DD-MM-YYYY')
}

function isNow(start, end) {
  let startTime = moment(start).format('X')
  let endTime = end !== undefined ? moment(end).format('X') : startTime
  let now = moment().format('X')
  return now >= startTime && now < endTime ? true : false 
}

</script>

<div class = {"calendar-container"}>
  {#if data === undefined}
    <div>Loading...</div>
  {:else}
    {#await data}
      <div>Loading</div>
      {:then items}
      {#each items as item}
          {#if moment(item.start.dateTime).isAfter(quarantineStart, 'day') && item.start.dateTime !== undefined}
          <div class = {isNow(item.start.dateTime, item.end.dateTime) ? "calendar-container_entry live" : "calendar-container_entry"} >
            <!-- {#if item.location !== undefined} -->
              <!-- todo: check if internal link or not + use router to push if so -->
              <a href = {item.location} >
                <div>{moment(item.start.dateTime).format('DD.MM.YYYY, h:mma')}</div>
                <div>{item.summary}</div>
              </a>
            <!-- {/if} -->
          </div>
          {/if}
        {/each}
    {/await}
  {/if}
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  .calendar-container {
    width: 50%;
    height: 100%;
    border: solid black 1px;
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    background: red;
    overflow: scroll;
    &_entry {
      margin-bottom: 1rem;
      &.live {
        top: 0;
        background: black;
        position: sticky;
      }
    }
  }
</style>