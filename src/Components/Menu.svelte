<script>
  import moment from 'moment'
  import { Router, Link, Route } from "svelte-routing";
  import { isMobile } from '../store.js'

  let start = moment("2020-03-15", "YYYY-MM-DD");
  let end = moment()
  let endFormat = end.format('LL')
  let daysPassed = parseInt(moment.duration(end.diff(start)).asDays())

</script>

<nav class = {"menu"}>
  <div class = "menu-left">
    <div class = "menu-left_title">
      <Router>
        <Link to="/">ALONE TOGETHER</Link>
      </Router>
    </div>
    <div class = "menu-left_link">
      {#if $isMobile}
        <div class = "menu-left_link-chat">CHAT</div>
      {:else}
        <Router>
          <Link to="/information-desk">INFORMATION DESK</Link>
        </Router>
      {/if}
    </div>
  </div>
  <div class = "menu-right">{daysPassed} days alone together</div>
</nav>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";
  
  .menu {
    position: sticky;
    top: 0;
    width: 100%;
    height: $menuHeight;
    border: solid white 1px;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    display: flex;
    align-items: center;
    z-index: 3;
    justify-content: space-between;
    &-left {
      display: flex;
      margin-left: calc(#{$padding} / 2);
      // flex
      &_title {
        @include type-sans-md;
        color: $lime;
        padding: $padding calc(#{$padding} * 2) $padding calc(#{$padding} * 2);
        border: solid white 1px;
        display: flex;
        align-items: center;
        border-radius: 10px 10px;
        margin-right: calc(#{$padding} / 2);
        @include bp-xs {
          margin-left: $padding;
        }
        & a {
          color: $lime;
          text-decoration: none;
        }
        @media (hover: hover) {
          &:hover {
            background: white;
            & a {
              color: black;
            }
          }
        }
      }
      &_link {
        @include type-sans-md;
        color: $lime;
        padding: $padding calc(#{$padding} * 2) $padding calc(#{$padding} * 2);
        border: solid white 1px;
        border-radius: 10px 10px;
        display: flex;
        align-items: center;
        @include bp-xs {
          display: none;
        }
        & a {
          color: $lime;
          text-decoration: none;
        }
        @media (hover: hover) {
          &:hover {
            background: white;
            & a {
              color: black;
            }
          }
        }
      }
    }
    &-right {
      color: white;
      margin-right: $padding;
      justify-content: center;
    }
  }

</style>
  

  