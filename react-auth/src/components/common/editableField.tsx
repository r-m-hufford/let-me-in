import React, { useState, useEffect, InputHTMLAttributes, ChangeEvent } from "react";
import { handleInputChange } from "../../utils/inputChange";
import { useAuth } from "../../context/AuthContext";

interface EditableFieldProps {
  initialData: string;
  type: string;
  name: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ initialData, type, name }) => {
  const { update } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<string>(initialData);

  const toggleEditState = () => {
    setEditing(!editing);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  }

  //here is where a useUser hook will be helpful
  //thus user related code does not end up in the
  //useAuth hook or context. Dont optimize to early.
  const handleUpdate = async () => {
    setSaving(true);
    const response = await update({[name]: data});
    setSaving(false);
    setEditing(false);
  }


  return (
    <div>
      { editing ? 
      <>
        <input type={type} name={name} id={name} placeholder={data} onChange={handleInputChange}/>
        <button type="button" onClick={handleUpdate}>{saving ? 'Saving...' : 'save'}</button>
        <button type="button" onClick={toggleEditState}>cancel</button>
      </>
      :
      <p>{data} <button type="button" onClick={toggleEditState}>edit</button></p> 
      }
    </div>
  )
}

export default EditableField;