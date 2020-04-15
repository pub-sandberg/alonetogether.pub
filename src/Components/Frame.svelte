<script>
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';

  import Calendar from './Calendar.svelte';
  import Feed from './Feed.svelte';
  import { fullScreen } from '../store.js'

  // export prop
  export let url
  export let name
  let loaded = false 

	onMount(() => {
		if (url) {
      const iframe = document.querySelector('#site')
      iframe.onload = () => {
        loaded = true
      }
    }
  })

  function handleClick(event) {
    $fullScreen ? fullScreen.set(false) : fullScreen.set(true)
  }
  
</script>

{#if url}
  {#if !loaded}
    <div class = "loader">Loading {name}</div>
  {/if}
  <div on:click={handleClick} class = "fullscreen-btn">FULLSCREEN</div>
  <iframe class = '{loaded ? "frame" : "frame hidden"}' id = "site" src = '{url}'></iframe>
{:else}
  <Calendar />
  <Feed />
{/if}



<style lang="scss" global>
  @import "./style/global.scss";
  
  .frame {
    width: 100%;
    height: 100%;
    border: none;
    opacity: 1;
    transition: opacity 1s ease;
    &.hidden {
      opacity: 0;
    }
  }

  .loader {
    position: absolute;
    width: 66.6%;
    align-self: center;
    text-align: center;
    text-transform: uppercase;
    // kind of strange; height of radio
    // margin-top: -70px;
  }

  .fullscreen-btn {
    position: absolute;
    z-index: 2;
    background: black;
    cursor: pointer;
  }

</style>