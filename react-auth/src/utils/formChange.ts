import { ChangeEvent } from "react";

//change this to handle form change
export const handleFormChange = (e: ChangeEvent<HTMLInputElement>, setData: Function, resetErrors: Function) => {
  const { name, value } = e.target;

  setData((prevData: any) => ({
    ...prevData,
  [name]: value
  }));

  resetErrors([]);
}