<script>
  // export let url
</script>

<div class = "information-container">
  <div>
    <p>Alone Together is an platform initiative by <a href="http://pub.sandberg.nl/" target="_blank">PUB Sandberg</a>. A way to communicate and share during times of isolation. We think we can question our ways of production while we are in quarantine and we are willing to share ways of doing that can make us feel each other, beyond the screen, or melting its surface, just like a bright, silvery mist.</p>
  </div>
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";
  
  .information-container {
    width: 100%;
    // height: 100%;
    display: flex;
    padding: .5rem;
    @include type-serif-lg;
    color: white;
    padding-bottom: calc(#{$footerHeight} * 2);
    & p {
      margin-bottom: 1rem;
      & a {
        text-decoration: none;
        color: $lime;
      }
    }
  }

</style>