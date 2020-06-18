<script>
  // export let url
</script>

<div class = "guidelines-container">
  <div>
    <p>Alone Together community guidelines</p>
  </div>
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";
  
  .guidelines-container {
    width: 100%;
    // height: 100%;
    display: flex;
    padding: .5rem;
    color: white;
    padding-bottom: calc(#{$footerHeight} * 2);
    & p {
      @include type-serif-lg;
      margin-bottom: 1rem;
      &:last-child {
        @include type-serif-md;
      }
      & a {
        text-decoration: none;
        color: $lime;
      }
    }
  }

</style>