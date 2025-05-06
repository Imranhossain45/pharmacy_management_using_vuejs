import { axiosPrivate } from "./axiosInstance";
export default{
  getVendors(){
    return axiosPrivate.get("/private/vendor");
  },
  addVendor(payload){
    return axiosPrivate.post("/private/vendor",payload);
  },
  editVendors(payload){
    return axiosPrivate.put("/private/vendor/" + payload._id, payload);
  },
  deleteVendors(id){
    return axiosPrivate.delete("/private/vendor/" +id);
  },

  // drug instance

  getDrugs(){
    return axiosPrivate.get("/private/drug");
  },
  addDrug(payload){
    return axiosPrivate.post("/private/drug",payload);
  },
  editDrugs(payload){
    return axiosPrivate.put("/private/drug/" + payload._id, payload);
  },
  deleteDrugs(id){
    return axiosPrivate.delete("/private/drug/" +id);
  },
}