<script setup>
</script>

<template>
	<header class="app-header">
		<div class="header-inner">
			<h1>毎日の作業を減らす業務効率化サポート</h1>
			<nav>
				<a href="#top">トップ</a>
				<a href="#services">サービス</a>
				<a href="#flow">流れ</a>
				<a href="#pricing">料金</a>
				<a href="#cases">事例</a>
				<a href="#contact" class="cta">相談</a>
			</nav>
		</div>
	</header>
	<RouterView/>
</template>

<style scoped lang="scss">
.app-header {
	height: 64px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
	background: rgba(255, 255, 255, 0.92);
	backdrop-filter: blur(12px);
	border-bottom: 1px solid #e5e7eb;
}

.header-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	margin: 0 auto;
	padding: 12px 20px;
	max-width: 1200px;
}

h1 {
	margin: 0;
	font-size: 18px;
	font-weight: 700;
	color: #111827;
	font-family: "Shippori Mincho B1", "Hiragino Mincho ProN", serif;
}

nav {
	display: flex;
	gap: 14px;
	flex-wrap: wrap;
	align-items: center;
}

nav a {
	text-decoration: none;
	color: #4b5563;
	font-size: 13px;
	padding: 6px 10px;
	border-radius: 999px;
}

nav a:hover {
	background: #fef3c7;
	color: #92400e;
}

nav .cta {
	background: #f59e0b;
	color: #1f1300;
	font-weight: 600;
}

@media (max-width: 800px) {
	.app-header {
		height: auto;
	}

	.header-inner {
		flex-direction: column;
		align-items: flex-start;
	}

	nav {
		gap: 8px;
	}
}
</style>
