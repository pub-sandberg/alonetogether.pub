<script>
  // export let url
</script>

<div class = "information-container">
  <div>
    <p><a href="http://pub.sandberg.nl/" target="_blank">PUB Sandberg</a> initiated an online platform that serves as a channel for the Sandberg community to share and communicate during times of isolation.</p>
    <p>While separated, we want to feel each other, beyond the screen or melting its surface to bring us closer, just like a bright, silvery mist. Chatting in the canteen, reading sessions in the library, radio streamings for withdrawal, and monologues for learning about togetherness will happen.</p>
    <p>For more info, email us at <a href = "mailto:pub.sandberg@gmail.com">pub.sandberg@gmail.com</a></p>
    <p>Website by <a href="https://www.zelda.fi/" target="_blank">Hanna</a>, <a href="http://leithbenkhedda.com/" target="_blank">Leith</a>, <a href="http://an-area.site/" target="_blank">Nick</a> and <a href="https://saschakrischock.com/" target="_blank">Sascha</a>.</p>
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