<script>
	import View from './views/View.svelte';
	import Footer from './components/Footer.svelte';
	import Map from './components/Map.svelte';
	import Menu from './components/Menu.svelte';
	import { onMount } from 'svelte';
	import { isMobile } from "./store.js";

	function checkWindow(x) {
		x <= 576 ? isMobile.set(true) : isMobile.set(false)
	}

	let resizeTimer
	onMount(() => {
		checkWindow(window.innerWidth)
		window.addEventListener('resize', (event) => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				checkWindow(window.innerWidth)
			}, 250)
		})
	})
	
</script>

<Menu />
<main class = "page-container">
	<Map  />
	<View />
	<Footer />
</main>

<style lang="scss" global>

@import "./style/global.scss";

	.page-container {
		width: 100%;
		height: 100%;
		// background: yellow;
		display: flex;
		// padding: $padding;
	}

</style>