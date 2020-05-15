<script>
  // export let url
  import { Router, Link, Route } from "svelte-routing";
  import { isMobile } from '../store.js'

  // w.i.p
  function handleChatClick() {
    console.log('show chat on mobile')
  }
</script>

<nav class = {"menu"}>
  <div class = "menu_title">
    <Router>
      <Link to="/">ALONE TOGETHER</Link>
    </Router>
  </div>
  <div class = "menu_link">
    {#if $isMobile}
      <div class = "menu_link-chat" on:click={() => handleChatClick()}>CHAT</div>
    {:else}
      <Router>
        <Link to="/information-desk">INFORMATION DESK</Link>
      </Router>
    {/if}
  </div>
</nav>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";
  
  .menu {
    position: sticky;
    top: 0;
    width: 100%;
    height: $menuHeight;
    // background: black;
    border: solid white 1px;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    display: flex;
    align-items: center;
    z-index: 3;
    &_title {
      @include type-sans-md;
      color: white;
      padding: $padding calc(#{$padding} * 2) $padding calc(#{$padding} * 2);
      border: solid white 1px;
      // border-top: 0;
      // border-left: 0;
      // border-bottom: 0;
      // height: 100%;
      display: flex;
      align-items: center;
      border-radius: 10px 10px;
      margin-right: $padding;
      @include bp-xs {
        margin-left: $padding;
      }
      & a {
        color: white;
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
      color: white;
      padding: $padding calc(#{$padding} * 2) $padding calc(#{$padding} * 2);
      border: solid white 1px;
      border-radius: 10px 10px;
      // border-top: 0;
      // border-left: 0;
      // border-bottom: 0;
      // height: 100%;
      display: flex;
      align-items: center;
      // align-self: flex-end;

      // temp
      @include bp-xs {
        display: none;
      }
      & a {
        color: white;
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

</style>
  

  