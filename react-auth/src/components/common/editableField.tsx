import React, { useState, useEffect, InputHTMLAttributes, ChangeEvent } from "react";
import { handleInputChange } from "../../utils/inputChange";
import { useErrors } from "../../hooks/useErrors";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { updateUser } from "../../api/user";

interface EditableFieldProps {
  initialData: string;
  type: string;
  name: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ initialData, type, name }) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<string>(initialData);
  const { errors, setErrors } = useErrors();
  const { setItem } = useLocalStorage();

  const toggleEditState = () => {
    setEditing(!editing);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  }

  const handleUpdate = async () => {
    try {
      setSaving(true);
      const response = await updateUser({[name]: data.trim()});
      // if response success set item user
      if (response.success) setItem('user', JSON.stringify(response.user));
      // if response error set errors
      if (response.data && response.data.error) setErrors(response.data.error);
      setSaving(false);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
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
      { errors }
    </div>
  )
}

export default EditableField;