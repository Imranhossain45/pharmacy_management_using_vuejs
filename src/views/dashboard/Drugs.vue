<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Vendors</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>
  <div class="text-center" v-if="gettingDrugs">Loading...</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Vendor</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="drug in drugs" :key="drug.name">
        <td>{{ drug.name }}</td>
        <td>{{ drug.weight }} Mg</td>
        <td>{{ drug.type }}</td>
        <td>{{ drug.vendor }}</td>
        <td>{{ drug.price }}</td>
        <td>{{ drug.quantity }}</td>
        <td>
          <img
            src="/img/edit.png"
            class="action-icon"
            alt=""
            @click="
              selectedDrug = drug;
              editModal = true;
            "
          />
          <img
            src="/img/trash.png"
            class="action-icon action-icon--delete"
            alt=""
            @click="
              selectedDrug = drug;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
  </table>

  <TheModal v-model="addModal" heading="Add New Drug">
    <form @submit.prevent="addNew">
      <label for="" class="block">Select Drug type</label>
      <div class="mt-2">
        <label for="">
          <input type="radio" name="drugType" value="Tab" v-model="newDrug.type">
          Tab
        </label>
        <label for="">
          <input type="radio" name="drugType" value="Capsule" v-model="newDrug.type">
          Capsule
        </label>
        <label for="">
          <input type="radio" name="drugType" value="Syrup" v-model="newDrug.type">
          Syrup
        </label>
        <label for="">
          <input type="radio" name="drugType" value="Suppository" v-model="newDrug.type">
          Suppository
        </label>
      </div>
      <label for="">Drug Name</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Enter Drug Name"
        class="mt-1 w-100"
        required
        v-model="newDrug.name"
      />
      <label for="">Weight</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Weight in mg"
        class="mt-1 w-100"
        required
        v-model="newDrug.weight"
      />
      <label for="">Vendor</label>
      <select v-model="newDrug.vendor">
        <option value="">Select One</option>
        <option v-for="vendor in vendors" :key="vendor.name" :value="vendor.name">
          {{ vendor.name }}
        </option>
      </select>
      <label for="" class="block mt-3">Price</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Pack Price"
        class="mt-1 w-100"
        required
        v-model="newDrug.price"
      />
      <label for="" class="block mt-3">Quantity</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Pack Quantity"
        class="mt-1 w-100"
        required
        v-model="newDrug.quantity"
      />
      <TheButton :loading="adding" class="w-100 mt-4">Add+</TheButton>
    </form>
  </TheModal>
  <TheModal v-model="editModal" heading="Edit Drug">
    <form @submit.prevent="editDrug">
      <label for="" class="block">Select Drug type</label>
      <div class="mt-2">
        <label for="">
          <input type="radio" name="drugType" value="Tab" v-model="selectedDrug.type">
          Tab
        </label>
        <label for="">
          <input type="radio" name="drugType" value="Capsule" v-model="selectedDrug.type">
          Capsule
        </label>
        <label for="">
          <input type="radio" name="drugType" value="Syrup" v-model="selectedDrug.type">
          Syrup
        </label>
        <label for="">
          <input type="radio" name="drugType" value="Suppository" v-model="selectedDrug.type">
          Suppository
        </label>
      </div>
      <label for="">Drug Name</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Enter Drug Name"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.name"
      />
      <label for="">Weight</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Weight in mg"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.weight"
      />
      <label for="">Vendor</label>
      <select v-model="selectedDrug.vendor">
        <option value="">Select One</option>
        <option v-for="vendor in vendors" :key="vendor.name" :value="vendor.name">
          {{ vendor.name }}
        </option>
      </select>
      <label for="" class="block mt-3">Price</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Pack Price"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.price"
      />
      <label for="" class="block mt-3">Quantity</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Pack Quantity"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.quantity"
      />
     
      <TheButton :loading="editing" class="w-100 mt-4">Save Changes</TheButton>
    </form>
  </TheModal>
  <TheModal v-model="deleteModal" heading="Are you sure?">
    <p>Do you really want to delete?</p>
    <strong>{{ selectedDrug.name }}</strong>
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
import { showErrorMessage, showSuccessMessage } from "../../utils/functions";
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
    newDrug: {
      name: "",
      weight: "",
      type: "",
      vendor: "",
      price: "",
      quantity: "",
    },
    adding: false,
    drugs: [],
    gettingDrugs: false,
    selectedDrug: {},
    deleting: false,
    editing: false,
    vendors:[],
  }),
  mounted() {
    setTimeout(this.getAllDrugs, 100);
    setTimeout(this.getAllVendors, 100);

    // this.getAllDrugs();
  },
  methods: {
    resetForm() {
      this.newDrug = {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
      };
    },
    getAllVendors() {
      privateService
        .getVendors()
        .then((res) => {
          this.vendors = res.data;
          
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          //this.gettingDrugs = false;
        });
    },
    getAllDrugs() {
      this.gettingDrugs = true;
      privateService
        .getDrugs()
        .then((res) => {
          this.drugs = res.data;
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.gettingDrugs = false;
        });
    },
    addNew() {
      this.adding = true;

      privateService
        .addDrug(this.newDrug)
        .then((res) => {
          showSuccessMessage(res);
          this.addModal = false;
          this.resetForm();
          this.getAllDrugs();
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.adding = false;
          this.getAllDrugs();
        });
    },
    deleteDrug() {
      this.deleting = true;
      privateService
        .deleteDrugs(this.selectedDrug._id)
        .then((res) => {
          showSuccessMessage(res);
          this.deleteModal = false;
          this.getAllDrugs();
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.deleting = false;
        });
    },
    editDrug() {
      this.editing = true;
      privateService
        .editDrugs(this.selectedDrug)
        .then((res) => {
          showSuccessMessage(res);
          this.editModal = false;
          this.getAllDrugs();
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.editing = false;
        });
    },
  },
};
</script>
