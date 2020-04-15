<script>
  import { Router, Link, Route } from "svelte-routing";
  import Frame from "../components/Frame.svelte";
	import { fullScreen } from '../store.js'

</script>


<div class = '{$fullScreen ? "view-container fullwidth" : "view-container"}'>
  <Router location={location}>
    <Route path="canteen" component="{Frame}" name="Canteen" url="https://saschakrischock.com/atomchat" />
    <Route path="library" component="{Frame}" name="Library" url="https://www.are.na/pub/library-2uw05wda6ro" />
    <Route path="cinema" component="{Frame}" name="Cinema" url="https://pub.sandberg.nl/quarantine/auditorium" />
    <Route path="/" component="{Frame}" />
  </Router>
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  
  .view-container {
    width: 66.6%;
    height: 100%;
    display: flex;
    border: solid black 1px;
    border-right: 0;
    border-top: 0;
    border-bottom: 0;
    // transition: width .5s ease;
    &.fullwidth {
      width: calc(100% - 2rem);
    }
  }

</style>

