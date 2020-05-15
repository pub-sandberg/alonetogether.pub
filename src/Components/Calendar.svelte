<script>
import axios from 'axios'
// import moment from 'moment'
import moment from 'moment-timezone'
import { navigate } from "svelte-routing"
const calendarId = process.env.GOOGLE_CALENDAR_ID
const calendarKey = process.env.GOOGLE_CALENDAR_KEY

moment.tz.setDefault("Europe/Amsterdam");


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

function isInternal(loc) {
  let internalPages = ['cinema', 'library', 'canteen', 'radio']
  return internalPages.includes(loc.toLowerCase()) ? true : false
}

function handleLinkClick(loc) {
  let page = loc.toLowerCase()
  navigate(page, { replace: false })
}

</script>

<div class = {"calendar-container"}>
  {#if data === undefined}
    <div>Loading...</div>
  {:else}
    {#await data}
      <div>Loading</div>
      {:then items}
      <div class = "calendar-container_title">EVENT CALENDAR</div>
      {#each items as item}
          {#if moment(item.start.dateTime).isAfter(quarantineStart, 'day') && item.start.dateTime !== undefined}
            {#if item.location !== undefined}
              {#if isInternal(item.location)}
                <div class = {isNow(item.start.dateTime, item.end.dateTime) ? "calendar-container_entry live link" : "calendar-container_entry link"} >
                  <!-- todo: check if internal link or not + use router to push if so -->
                  <div on:click={() => handleLinkClick(item.location)}>
                    {#if isNow(item.start.dateTime, item.end.dateTime)}
                      <div class = "calendar-container_entry_live">LIVE NOW</div>
                      <div class = "calendar-container_entry_title live">{item.summary}</div>
                    {:else}
                      <div class = "calendar-container_entry_date">{moment(item.start.dateTime).format('DD.MM.YYYY')}</div>
                      <div class = "calendar-container_entry_time">{moment(item.start.dateTime).format('h:mma')}</div>
                      <div class = "calendar-container_entry_title">{item.summary}</div>
                    {/if}
                  </div>
                </div>
              {:else}
                <div class = {isNow(item.start.dateTime, item.end.dateTime) ? "calendar-container_entry live link" : "calendar-container_entry link"} >
                  <!-- todo: check if internal link or not + use router to push if so -->
                  <a href = {item.location} target="_blank">
                    {#if isNow(item.start.dateTime, item.end.dateTime)}
                      <div class = "calendar-container_entry_live">LIVE NOW</div>
                      <div class = "calendar-container_entry_title live">{item.summary}</div>
                    {:else}
                      <div class = "calendar-container_entry_date">{moment(item.start.dateTime).format('DD.MM.YYYY')}</div>
                      <div class = "calendar-container_entry_time">{moment(item.start.dateTime).format('h:mma')}</div>
                      <div class = "calendar-container_entry_title">{item.summary}</div>
                    {/if}
                  </a>
                </div>
              {/if}
            {:else}
              <div class = {isNow(item.start.dateTime, item.end.dateTime) ? "calendar-container_entry live" : "calendar-container_entry"} >
                {#if isNow(item.start.dateTime, item.end.dateTime)}
                  <div class = "calendar-container_entry_live">LIVE NOW</div>
                  <div class = "calendar-container_entry_title live">{item.summary}</div>
                {:else}
                  <div class = "calendar-container_entry_date">{moment(item.start.dateTime).format('DD.MM.YYYY')}</div>
                  <div class = "calendar-container_entry_time">{moment(item.start.dateTime).format('h:mma')}</div>
                  <div class = "calendar-container_entry_title">{item.summary}</div>
                {/if}
              </div>
            {/if}
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
    border: solid white 1px;
    // background: black;
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    overflow: scroll;
    padding: calc(#{$padding} / 2);
    display: flex;
    flex-flow: column;
    &::-webkit-scrollbar {
      display: none;
    }
    &_title {
      color: black;
      background: white;
      @include type-sans-lg;
      border: solid white 1px;
      border-radius: 25px 25px;
      padding: .5rem;
      margin-bottom: calc(#{$padding} / 2);
    }
    &_entry {
      margin-bottom: calc(#{$padding} / 2);
      border: solid white 1px;
      // border-left: 0;
      // border-right: 0;
      border-radius: 25px 25px;
      // width: calc(100% - 2px);
      padding: .5rem;
      order: 2;
      // background: black;
      &:last-child {
        // margin-bottom: 1rem;
      }
      &_live {
        color: $lime;
        @include type-sans-lg;
        animation: live 1s linear infinite;
      }
      &_date {
        @include type-serif-md;
        color: white;
      }
      &_time {
        @include type-serif-md;
        color: white;
      }
      &_title {
        @include type-sans-lg;
        color: $lime;
        &.live {
          color: white;
        }
      }
      & a {
        text-decoration: none;
      }
      &.link {
        cursor: pointer;
        &:hover {
          background: white;
          & .calendar-container_entry_date {
            color: black;
          }
          & .calendar-container_entry_time {
            color: black;
          }
          & .calendar-container_entry_title {
            color: black;
          }
        }
      }
      &.live {
        top: 0;
        background: black;
        position: sticky;
        order: 1;
      }
    }
  }
</style>