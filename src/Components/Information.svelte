<script>
  // export let url
</script>

<div class = "information-container">
  <div>
    <p>Alone Together is an platform initiave by PUB Sandberg.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et orci eu nibh sodales semper vitae non eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis pellentesque diam non feugiat.</p> 
    <p>Aenean et mauris ut urna posuere viverra. Etiam lorem eros, congue a sollicitudin et, condimentum et magna. Praesent porttitor sapien sed dolor interdum laoreet quis ut ante. Curabitur pretium finibus accumsan. Ut non dolor vitae magna aliquam suscipit sed at nisi.</p>
    <p>Nunc dapibus varius odio, quis sagittis est vestibulum nec. Donec dapibus risus sit amet orci pretium hendrerit. Vivamus neque eros, accumsan quis quam in, tempor rhoncus nunc. Aenean aliquam justo non libero bibendum sollicitudin. Phasellus aliquet dolor vel venenatis eleifend. 
    <p>Pellentesque vestibulum imperdiet tortor, nec vehicula erat cursus a. Maecenas viverra, mi quis malesuada maximus, sem turpis mollis sapien, vitae consectetur nisi diam a leo. In nec ligula non leo dapibus mattis vel nec erat.</p>
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
    }
  }

</style>