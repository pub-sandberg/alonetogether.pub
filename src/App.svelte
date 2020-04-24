<script>
	import View from './views/View.svelte';
	import Footer from './components/Footer.svelte';
	import Map from './components/Map.svelte';
	import Menu from './components/Menu.svelte';
	import { onMount } from 'svelte';
	import { isMobile, hasEntered } from "./store.js";

	function checkWindow(x) {
		x <= 576 ? isMobile.set(true) : isMobile.set(false)
	}

	let resizeTimer
	onMount(() => {
		setTimeout(() => {
			hasEntered.set(true)
		}, 3500)
		checkWindow(window.innerWidth)
		window.addEventListener('resize', (event) => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				checkWindow(window.innerWidth)
			}, 250)
		})
	})

	function handleLogoClick() {
		hasEntered.set(true)
	}
	
</script>

<Menu />
<main class = "page-container">
	{#if !$hasEntered}
		<div on:click={handleLogoClick} class = "logo-wrap">
			<img src = 'images/logo-1.svg' alt="Alone Together" />
		</div>
	{/if}
	<Map  />
	<View />
	<Footer />
</main>

<style lang="scss" global>

@import "./style/global.scss";

	.logo-wrap {
		position: fixed;
		top: 0;
		left: 0;
		color: white;
		font-size: 3rem;
		// value to make above iframe
		z-index: 21474836472;
		background: #000000b5;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		& img {
			max-width: 95%;
			max-height: 95%;
		}

	}

	.page-container {
		width: 100%;
		height: 100%;
		// background: yellow;
		display: flex;
		// padding: $padding;
	}

</style>