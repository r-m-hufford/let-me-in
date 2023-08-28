import { ChangeEvent } from "react";

export const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setData: Function) => {
  const { name, value } = e.target;

  setData((prevData: any) => ({
    ...prevData,
  [name]: value
  }));
}