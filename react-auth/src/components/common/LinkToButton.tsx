import React from "react";
import { useNavigate } from "react-router-dom";
// create a generic component that takes parameters
// (i.e. route and text) and creates a button that
// goes to another part of the app

interface LinkToButtonProps {
  path: string;
  label: string;
}
const LinkToButton: React.FC<LinkToButtonProps> = ({path, label}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path)
  }
  return (
    <div>
      <button onClick={handleClick}>{label}</button>
    </div>
  )
}

export default LinkToButton;