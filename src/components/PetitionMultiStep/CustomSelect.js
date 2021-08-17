import React, {useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncCreatableSelect from 'react-select/async-creatable';


const CustomSelect = (props) => {

    const [petitionRecipients, setPetitionRecipients] = useState([]);
    
    const filterOptions = (inputValue) => {
      return props.options.filter(i =>
                 i.label.toLowerCase().includes(inputValue.toLowerCase())
              );
    };

    const loadOptions = (inputValue, callback) => {
      setTimeout(() => {
        callback(filterOptions(inputValue));
      }, 800);
    };

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid lightgrey',
          color: state.isSelected ? 'red' : 'darkgray',
          padding: 20,
          textAlign: "left"
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: "100%",
          height: "100%",
          fontSize: "larger",
          margin: "5px auto",
          display: "flex",
          flexDirection: "row"
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
    }
    
    return (
      <AsyncCreatableSelect
        isMulti={props.isMulti}
        styles={customStyles}
        placeholder={props.placeholder}
        cacheOptions
        defaultOptions={props.options}
        onChange={props.handleChange}
        loadOptions={loadOptions}
      />
    
    );
  }

  export default CustomSelect;