<template>
	<div
		class="the-button"
		:class="{ 'the-button-block': block, 'the-button--gray': color === 'gray' }"
	>
		<button>
			<slot></slot>
		</button>
		<div class="the-button__loading" v-if="loading">
			<img src="../../public/img/spinner.gif" alt="" />
		</div>
	</div>
</template>
<script>
export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		block: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: "none",
		},
	},
};
</script>

<style>
.the-button {
	position: relative;
	display: inline-block;
}
.the-button-block {
	width: 100%;
}
.the-button__loading {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(48, 15, 15);
}
.the-button button {
	width: 100%;
	border: none;
	background-color: rgb(48, 15, 15);
	color: white;
	border-radius: 5px;
	padding: 10px;
	cursor: pointer;
	box-shadow: 0px 2px 9px 4px #dfdfdf;
}
.the-button button:hover {
	background: #000;
	box-shadow: 0 2px 3px 2px #afafaf;
}
.the-button__loading img {
	width: 25px;
}
.the-button--gray button {
	background-color: #707070;
	border-color: #707070;
}
.the-button--gray button:hover {
	background-color: #4d4d4d;
	border-color: #4d4d4d;
}
</style>
