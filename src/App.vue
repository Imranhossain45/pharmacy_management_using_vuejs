<template>
	<router-view></router-view>
	<!-- <div class="toasts"> -->
		<TransitionGroup name="slide-left" tag="div" class="toasts">
			<TheToast
				v-for="(toast, i) in toasts"
				:key="i"
				:toastType="toast.type"
				:message="toast.message"
			></TheToast>
		</TransitionGroup>
	<!-- </div> -->
</template>
<script>
/* import Login from "./components/Login.vue"; */
import TheToast from "./components/TheToast.vue";
import { eventBus} from "./utils/eventBus"
export default {
	components: {
	/* 	Login, */
		TheToast,
	},
	data: () => ({
		toasts: [],
	}),
	mounted() {
		eventBus.on("toast", (data) => {
			this.toasts.push(data);
			this.removeOneToast();
			console.log(data);
		});
	},
	methods: {
		removeOneToast() {
			setTimeout(() => {
				this.toasts.shift();
			}, 2000);
		},
	},
};
</script>

<style scoped>

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
