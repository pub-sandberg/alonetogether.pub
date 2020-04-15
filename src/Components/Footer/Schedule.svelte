<script>
  let isOpen = false 
  export let scheduleData
  const schedule = scheduleData.values

  function handleClick() {
    isOpen ? isOpen = false : isOpen = true
  }
  
  function returnClass() {
    let className = isOpen ? "footer-radio-container_schedule open" : "footer-radio-container_schedule closed"
    return className
  }

</script>

<div class={isOpen ? "footer-radio-container_schedule open" : "footer-radio-container_schedule closed"} on:click={handleClick}>
  {#if !isOpen}
    Schedule
  {:else}
    {#each schedule as entry}
      <div class = "footer-radio-container_schedule_entry">
        <div>{entry[0]}</div>
        <div>{entry[2]}</div>
        <div>w/ {entry[3]}</div>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss" global>
  @import "./style/global.scss";
</style>