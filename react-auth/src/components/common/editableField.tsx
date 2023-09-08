import React, { useState, useEffect, InputHTMLAttributes, ChangeEvent } from "react";
import { updateUser, whoami } from "../../api/auth";
import { handleInputChange } from "../../utils/inputChange";

interface EditableFieldProps {
  initialData: string;
  type: string;
  name: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ initialData, type, name }) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<string>(initialData);

  const toggleEditState = () => {
    setEditing(!editing);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  }

  const handleUpdate = async () => {
    setSaving(true);
    const response = await updateUser({[name]: data});
    setData(response[name]);
    setSaving(false);
    setEditing(false);
  }
  
  useEffect(() => {
    const fetchUser = async () => {
      console.log('useEffect')
      await whoami();
    }
    fetchUser();
  }, [])

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