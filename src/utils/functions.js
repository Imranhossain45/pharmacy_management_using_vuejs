import { eventBus } from "./eventBus"

export const showErrorMessage = (error) =>{
  let errorMessage = error || "Something went Wrong!";
  if(error.response){
    errorMessage = error.response.data.message;
  }
  eventBus.emit("toast", {
    type: "Error",
    message: error,
  });
}