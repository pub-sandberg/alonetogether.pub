<script>
	import View from './views/View.svelte';
	import Footer from './components/Footer.svelte';
	import Map from './components/Map.svelte';

</script>

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