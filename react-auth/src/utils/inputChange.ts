import { ChangeEvent } from "react";

//change this to handle form change
export const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setData: Function) => {
  const { name, value } = e.target;

  setData((prevData: any) => ({
    ...prevData,
  [name]: value
  }));
}