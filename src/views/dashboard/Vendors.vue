<template>
	<div class="d-flex jc-between ai-center">
		<h2>All Vendors</h2>
		<TheButton @click="addModal = true">Add New</TheButton>
	</div>
	<div class="text-center" v-if="gettingVendors">Loading...</div>
	<table class="mt-4" v-else>
		<thead>
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="vendor in vendors" :key="vendor.name">
				<td>{{ vendor.name }}</td>
				<td>{{ vendor.description }}</td>
				<td>
					<img src="/img/edit.png" class="action-icon" alt="" @click="
							selectedVendor = vendor;
					editModal = true; "/>
					<img
						src="/img/trash.png"
						class="action-icon action-icon--delete"
						alt=""
						@click="
							selectedVendor = vendor;
							deleteModal = true;
						"
					/>
				</td>
			</tr>
		</tbody>
	</table>

	<TheModal v-model="addModal" heading="Add New Vendor">
		<form @submit.prevent="addNew">
			<label for="" class="block">Vendor Name</label>
			<input
				type="text"
				name=""
				id=""
				placeholder="Enter Vendor Name"
				class="mt-1 w-100"
				required
				v-model="newVendor.name"
			/>
			<label for="" class="block mt-3">Vendor Description</label>
			<input
				type="text"
				name=""
				id=""
				placeholder="Write short Description"
				class="mt-1 w-100"
				required
				v-model="newVendor.description"
			/>
			<TheButton :loading="adding" class="w-100 mt-4">Add+</TheButton>
		</form>
	</TheModal>
	<TheModal v-model="editModal" heading="Edit Vendor">
		<form @submit.prevent="editVendor">
			<label for="" class="block">Vendor Name</label>
			<input
				type="text"
				name=""
				id=""
				placeholder="Enter Vendor Name"
				class="mt-1 w-100"
				required
				v-model="selectedVendor.name"
			/>
			<label for="" class="block mt-3">Vendor Description</label>
			<input
				type="text"
				name=""
				id=""
				placeholder="Write short Description"
				class="mt-1 w-100"
				required
				v-model="selectedVendor.description"
			/>
			<TheButton :loading="editing" class="w-100 mt-4">Save Changes</TheButton>
		</form>
	</TheModal>
	<TheModal v-model="deleteModal" heading="Are you sure?">
		<p>Do you really want to delete?</p>
		<strong>{{ selectedVendor.name }}</strong>
		<div class="d-flex jc-between ai-center">
			<TheButton :loading="deleting" class="w-40 mt-4" @click="deleteVendor"
				>Yes</TheButton
			>
			<TheButton class="w-40 mt-4" color="gray" @click="deleteModal = false"
				>No</TheButton
			>
		</div>
	</TheModal>
</template>
<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import { showErrorMessage,showSuccessMessage } from "../../utils/functions";
import privateService from "../../service/privateService";

export default {
	components: {
		TheButton,
		TheModal,
	},
	data: () => ({
		addModal: false,
		deleteModal: false,
		editModal: false,
		newVendor: {
			name: "",
			description: "",
		},
		adding: false,
		vendors: [],
		gettingVendors: false,
		selectedVendor: {},
		deleting: false,
		editing: false,
	}),
	mounted() {
		setTimeout(this.getAllVendors , 100)
		// this.getAllVendors();
	},
	methods: {
		resetForm() {
			this.newVendor = {
				name: "",
				description: "",
			};
		},
		getAllVendors() {
			this.gettingVendors = true;
		privateService.getVendors()
				.then((res) => {
					this.vendors = res.data;
				})
				.catch((err) => {
					showErrorMessage(err);
				})
				.finally(() => {
					this.gettingVendors = false;
				});
		},
		addNew() {
			this.adding = true;
		
			privateService.addVendor(this.newVendor)
				.then((res) => {
					showSuccessMessage(res);
					this.addModal = false;
					this.resetForm();
					this.getAllVendors();
				})
				.catch((err) => {
					showErrorMessage(err);
				})
				.finally(() => {
					this.adding = false;
					this.getAllVendors();
				});
		},
		deleteVendor() {
			this.deleting = true;
			privateService.deleteVendors(this.selectedVendor._id)
				.then((res) => {
					showSuccessMessage(res);
					this.deleteModal = false;
					this.getAllVendors();
				})
				.catch((err) => {
					showErrorMessage(err);
				})
				.finally(() => {
					this.deleting = false;
				});
		},
		editVendor() {
			this.editing = true;
			privateService.editVendors(
			this.selectedVendor)
				.then((res) => {
					showSuccessMessage(res);
					this.editModal = false;
					this.getAllVendors();
				})
				.catch(err => {
					showErrorMessage(err);
				})
				.finally(() => {
					this.editing = false;
				});
		},
		
	},
};
</script>
