<script>
  // export let url
</script>

<div class = "information-container">
  <div>
    <p><a href="http://pub.sandberg.nl/" target="_blank">PUB Sandberg</a> initiated an online platform that serves as a channel for the Sandberg community to share and communicate during times of isolation.</p>
    <p>While separated, we want to feel each other, beyond the screen or melting its surface to bring us closer, just like a bright, silvery mist. Chatting in the cantine, reading sessions in the library, radio streamings for withdrawal, and monologues for learning about togetherness will happen.</p>
    <p>For more info, email us at <a href = "mailto:pub.sandberg@gmail.com">pub.sandberg@gmail.com</a></p>
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