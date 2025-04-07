<template>
	<div class="login-page">
		<div class="login-card">
			<!-- <div class="box" :class="{ 'box--right': movedToRight }"></div>
			<button @click="movedToRight = false">Move Left</button>
			<button class="ml-4" @click="movedToRight = true">Move Right</button>
			<hr class="mt-4" />
			<Transition name="showhide">
				<div class="box1 mt-4" v-if="showing"></div>
			</Transition>
			<button @click="showing = !showing">Show/Hide</button> -->

			<div class="text-center">
				<img src="/img/lock.png" class="login-card__icon" alt="" />
				<h2>User Login</h2>
			</div>
			<form action="#" @submit.prevent="handleSubmit">
				<label class="block">Username</label>
				<input
					type="text"
					class="w-100"
					placeholder="Enter username"
					v-model="formData.username"
					required
				/>

				<label class="block mt-3">Password</label>
				<input
					type="password"
					placeholder="Enter Password"
					v-model="formData.password"
					required
				/>
				<div class="d-flex jc-between mt-3">
					<div>
						<label for="">
							<input type="checkbox" name="" id="" />
							Remember Me
						</label>
					</div>
					<div>
						<a href="#">Forgot Password?</a>
					</div>
				</div>
				
				
				<TheButton :block="true" :loading="loggingIn" class="mt-3">Login</TheButton>
			</form>
		</div>
	</div>
</template>
<script>

import axios from 'axios';
import TheButton from '../components/TheButton.vue';
import { eventBus } from '../utils/eventBus';
export default {
	components: {
		TheButton
	},
	data: () => ({
		formData: {
			username: "",
			password: "",
		},

		loggingIn:false,
		movedToRight: false,
		showing: false,
	}),
	methods: {
		handleSubmit() {
			console.log(this.formData);
			if (!this.formData.username) {
				eventBus.emit("toast", {
					type: "Error",
					message: "Username can't be empty",
				});

				return;
			}
			if (this.formData.password.length < 6) {
				eventBus.emit("toast", {
					type: "Error",
					message: "Password must be at least 6 characters",
				});

				this.$refs.password.focus();

				return;
			}
			/* todo: call api */
			this.loggingIn = true;
			axios.post("https://api.rimoned.com/api/pharmacy-management/v1/login", this.formData).then(res => {
				console.log(res.data);
				eventBus.emit("toast", {
					type: "Success",
					message: res.data.message,
				});
				localStorage.setItem('accessToken', res.data.accessToken);
				this.$router.push("/dashboard");
			}).catch(err => {
				let errorMessage = "Something went wrong!";
				if (err.response) {
					errorMessage = err.response.data.message;
				}
				eventBus.emit("toast", {
					type: "Error",
					message: errorMessage,
				});
			}).finally(() => {
				this.loggingIn = false;
			});
			
			
		},
	},
};
</script>
<style>
.box {
	width: 55px;
	height: 55px;
	background-color: greenyellow;
	margin-bottom: 22px;
	transition: all 0.5s;
}

.box--right {
	margin-left: 222px;
}

.box1 {
	width: 55px;
	height: 55px;
	background-color: greenyellow;
	margin-bottom: 22px;
	/* animation: showhide 1s ease-in-out; */
}

.login-page {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(235, 235, 235);
}

.login-card {
	width: 400px;
	/* border: 1px solid gray; */
	min-height: 193px;
	box-shadow: 0px 2px 9px 4px #dfdfdf;
	background-color: #fff;
	border-radius: 5px;
	padding: 44px 33px;
}

.login-card input[type="text"],
.login-card input[type="password"] {
	width: 100%;
}

.login-card__icon {
	max-width: 77px;
}


@keyframes showhide {
	0% {
		opacity: 0;
		transform: scale(0.5);
	}

	50% {
		opacity: 0.5;
		transform: scale(1.2);
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
}

.showhide-enter-active {
	animation: showhide 1s ease-in;
	transition: all 0.5s;
}
.showhide-enter-from {
	opacity: 0;
  transform: scale(0.5);
}

.showhide-enter-to {
	opacity: 1;
  transform: scale(1);
}

.showhide-leave-active {
	animation: showhide 1s ease-in reverse;
	/* transition: all 0.5s; */
}
.showhide-leave-from {
	/* opacity: 1;
  transform: scale(1); */
}

.showhide-leave-to {
	/* opacity: 0;
  transform: scale(0.5); */
}
</style>
