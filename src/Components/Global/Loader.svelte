<script>
 export let name
</script>

<div class = "loader">
  <div class = "loader_inner">
    <span>Loading {name}</span>
  </div>
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";

  .loader {
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
</style>