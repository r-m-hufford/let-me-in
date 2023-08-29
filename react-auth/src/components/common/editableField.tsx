import React, { useState, useEffect } from "react";
import { updateUser } from "../../api/auth";

interface EditableFieldProps {
  value: string;
  type: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, type }) => {
  const [editing, setEditing] = useState(false);

  const toggleEditState = () => {
    setEditing(!editing);
  }

  const handleUpdate = async () => {
    const response = await updateUser({lastName: "grok"});
    console.log({ response });
  }
  return (
    <div>
      { editing ? 
      <>
        <input type={type} name="" id="" placeholder={value}/>
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