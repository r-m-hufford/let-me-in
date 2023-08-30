import React, { useState, useEffect, InputHTMLAttributes, ChangeEvent } from "react";
import { updateUser } from "../../api/auth";
import { handleInputChange } from "../../utils/inputChange";

interface EditableFieldProps {
  value: string;
  type: string;
  name: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, type, name }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState<string>('');

  const toggleEditState = () => {
    setEditing(!editing);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const handleUpdate = async () => {
    // track the inputs and send that form onClick
    const response = await updateUser({lastName: input});
    console.log({ response });
  }
  return (
    <div>
      { editing ? 
      <>
        <input type={type} name={name} id={name} placeholder={value} onChange={handleInputChange}/>
        <button type="button" onClick={handleUpdate}>save</button>
        <button type="button" onClick={toggleEditState}>cancel</button>
      </>
      :
      <p>{value} <button type="button" onClick={toggleEditState}>edit</button></p> 
      }
    </div>
  )
}

export default EditableField;