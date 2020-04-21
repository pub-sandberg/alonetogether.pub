<script>
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';

  import Calendar from './Calendar.svelte';
  import InformationDesk from './InformationDesk.svelte';
  import Feed from './Feed.svelte';
  import RadioArchive from './RadioArchive.svelte';
  import { fullScreen } from '../store.js'
  import Loader from './Global/Loader.svelte'

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
    console.log($fullScreen)
    $fullScreen ? fullScreen.set(false) : fullScreen.set(true)
  }
  
</script>

{#if url}
  {#if !loaded}
    <Loader name={name} />
    <!-- <div class = "loader">
      <div class = "loader_inner">
        <span>Loading {name}</span>
      </div>
    </div> -->
  {/if}
  {#if loaded}
    {#if !$fullScreen}
    <div on:click={handleClick} class = "fullscreen-btn">FULLSCREEN</div>
    {/if}
  {/if}
  <iframe class = '{loaded ? "frame" : "frame hidden"}' id = "site" src = '{url}'></iframe>
{:else}
  {#if name === 'information-desk'}
    <InformationDesk />
  {:else if name === 'radio-archive'}
    <RadioArchive />
  {:else if name === 'home'}
    <Calendar />
    <Feed />
  {:else}
    <div class = "coming-soon">
      <div class = "coming-soon_inner">
        <span>Coming Soon</span>
      </div>
    </div>
  {/if}
{/if}



<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";
  
  .frame {
    width: 100%;
    height: 100%;
    border: none;
    opacity: 1;
    transition: opacity 1s ease;
    background: white;
    overflow-y: scroll;
    &.hidden {
      opacity: 0;
    }
  }

  // .loader {
  //   position: absolute;
  //   width: 66.6%;
  //   text-align: center;
  //   text-transform: uppercase;
  //   background: black;
  //   color: white;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   margin-top: -#{$menuHeight};
  //   &_inner {
  //     display: inline-block;
  //     padding: .75rem;
  //     border: solid white 1px;
  //     border-radius: 20px 20px;
  //     @include type-sans-lg;
  //     & span {
  //       animation: live .5s linear infinite;
  //     }
  //   }
  // }

  .coming-soon {
    position: absolute;
    width: 66.6%;
    text-align: center;
    text-transform: uppercase;
    background: black;
    color: white;
    top: 50%;
    transform: translateY(-50%);
    margin-top: -#{$menuHeight};
    &_inner {
      display: inline-block;
      padding: .75rem;
      border: solid white 1px;
      border-radius: 20px 20px;
      @include type-sans-lg;
      & span {
        animation: live .5s linear infinite;
      }
    }
  }

  .fullscreen-btn {
    position: absolute;
    z-index: 2;
    background: black;
    cursor: pointer;
    color: white;
    @include type-sans-md;
    border: solid white 1px;
    margin: $padding 0 0 $padding;
    padding: $padding calc(#{$padding} * 2) $padding calc(#{$padding} * 2);
    border-radius: 10px 10px;
    &:hover {
      color: black;
      background: white;
      border: solid black 1px;
    }
  }

</style>