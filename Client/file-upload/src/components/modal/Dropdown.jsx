import React, { useState } from 'react';
import '../../assets/css/dropdown.css'; // Optional for custom styling
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';

const Dropdown = ({title, drop}) => {
  const [isOpen, setIsOpen] = useState(false);
  


  const [data, setData] = useState({});
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setData(drop);
    
  };
  
  

 


  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={toggleDropdown}>
        <h3>{title}</h3>

        {isOpen ? (
          <FaAngleRight className="array" />
        ) : (
          <FaAngleDown className="array" />
        )}
      </div>

      {isOpen && (
        <div className={`dropdown-description ${isOpen ? 'open' : ''}`}>
          <p className="data-drop">
            {data.map((work, index) => (
              <div key={index}>
                <h4 className="data-drop-title">{work.option}</h4>
                <p>{work.des}</p>
              </div>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
