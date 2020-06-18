<script>
  import Draggable from 'Draggable'
  import { onMount } from 'svelte';
  import { Router, Link, Route } from "svelte-routing";
  import { chatOpen } from '../../store.js'
  // export let type
  
  function handleClose() {
    chatOpen.set(false)
  }

  onMount(() => {
    let chatBox = document.getElementsByClassName('chat-box-wrapper')[0]
    let chatBoxWidth = chatBox.clientWidth
    let chatBoxHeight = chatBox.clientHeight
    let limitXLeft = 0
    let limitXRight = (window.innerWidth - chatBoxWidth)
    let limitYTop = 0
    let limitYBottom = (window.innerHeight - chatBoxHeight)
    let options = {
      setPosition: false,
      limit: {
        x: [limitXLeft, limitXRight],
        // y: [limitYTop, limitYBottom],
      }
    }
    new Draggable(chatBox, options)
  })

</script>
<!-- <svelte:head>
  {#if type === 'cinema'}
    <!-- <div>Another Chat iframe here</div> -->
  <!-- {:else} -->
    <!-- height (74) is 1px less than $footerHeights -->
    <!-- <script id="cid0020000247979030978" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 400px;height: 450px;">{"handle":"alonetogetherradio","arch":"js","styles":{"a":"000000","b":100,"c":"FFFFFF","d":"FFFFFF","e":"000000","g":"ffffff","h":"000000","j":"ffffff","k":"ffffff","l":"000000","m":"000000","n":"FFFFFF","p":"12.42","q":"ffffff","r":100,"t":0,"usricon":0,"pos":"br","cv":1,"cvfnt":"Baskerville, 'Baskerville Old Face', 'Hoefler Text', Garamond, 'Times New Roman', serif, sans-serif","cvfntsz":"16px","cvfntw":"lighter","cvbg":"000000","cvw":350,"cvh":54,"sbc":"ffffff","surl":0,"allowpm":0,"cnrs":"0.66","ticker":1,"fwtickm":1}}</script> -->
  <!-- {/if} -->
<!-- </svelte:head> -->

<div class = "chat-box-wrapper">
  <div class = "chat-box-wrapper-header">
    <div class = "chat-box-wrapper-header-top">
      <div class="chat-box-wrapper-header-top_title">CHAT</div>
      <div class="chat-box-wrapper-header-top_close" on:click={handleClose}>CLOSE</div>
    </div>
    <div class = "chat-box-wrapper-header-bottom">
      <div class="chat-box-wrapper-header-bottom_message">Please observe our <Router><Link to="/community-guidelines">community guidelines</Link></Router> and happy chatting!</div>
    </div>
  </div>
  <div class = "chat-box-wrapper-chat">
    <iframe src='https://alonetogether.pub/chat' frameBorder="0"></iframe>
    <!-- <script id="cid0020000253485217675" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 100%;height: 100%;">{"handle":"alonetogetherradio","arch":"js","styles":{"a":"000000","b":100,"c":"FFFFFF","d":"FFFFFF","f":0,"g":"ffffff","i":0,"j":"ffffff","k":"c5df02","l":"000000","m":"000000","n":"FFFFFF","p":"11.61","q":"000000","r":100,"usricon":0,"sbc":"ffffff","fwtickm":1}}</script> -->
  </div>
</div>

<style lang="scss" global>

  @import "./style/global.scss";
  @import "./style/helpers.scss";

  .chat-box-wrapper {
    position: fixed;
    top: 3rem;
    right: 3rem;
    border: solid white 1px;
    width: 25vw;
    min-width: 400px;
    // added 1vh because it shows full border :/
    height: 71vh;
    display: inline-block;
    background: black;
    &-header {
      background: black;
      padding: calc(#{$padding} / 2);
      border: solid white 1px;
      border-right: 0;
      border-left: 0;
      border-top: 0;
      display: flex;
      flex-flow: column;
      color: white;
      @include type-sans-sm;
      cursor: move;
      height: 2.85rem;
      user-select: none;
      justify-content: space-between;
      &-top {
        display: flex;
        justify-content: space-between;
        &_title {
          @include type-sans-lg;
          color: $lime;
        }
        &_close {
          cursor: pointer;
          padding: calc(#{$padding} / 2);
        }
      }
      &-bottom {
        &_message {
          & a {
            text-decoration: none;
            color: white;
            &:hover {
              color: $lime;
            }
          }
        }
      }
    }
    &-chat {
      height: calc(100% - 2.85rem);
      & iframe {
        height: 100%;
        width: 100%;
      }
      // width: 100%;
    }
  }

</style>