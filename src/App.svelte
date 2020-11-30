<script>
	import View from './views/View.svelte';
	import Footer from './components/Footer.svelte';
	import Map from './components/Map.svelte';
	import Menu from './components/Menu.svelte';
	import { onMount } from 'svelte';
	import { isMobile, hasEntered } from "./store.js";

	function checkWindow(x) {
		console.log(x)
		x <= 576 ? isMobile.set(true) : isMobile.set(false)
	}
	
	// don't wait for mount
	checkWindow(window.innerWidth)


	let resizeTimer
	onMount(() => {
		setTimeout(() => {
			hasEntered.set(true)
		}, 3500)
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
<!-- <div class = "background-image">
	<img src = 'images/background.jpg'/>
</div> -->

<style lang="scss" global>

@import "./style/global.scss";

	.background-image {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		// opacity: .;
		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			opacity: .5;
		}
	}

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
		z-index: 3;
		position: relative;
		// padding: $padding;
	}

</style>