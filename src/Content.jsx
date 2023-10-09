import React from 'react'
import {FaTrashAlt} from "react-icons/fa"

const Content = ({items, setItems, handleCheck, handleDelete}) => {
  
  return (
    <>
      {items.length ? (
        <ul>
          {items.map(item => (
            <li className='item' key={item.id}>
              <input 
                type="checkbox" 
                checked={item.checked}
                onChange={ ()=> handleCheck(item.id)}
              />
              <label
                style={(item.checked) ? {textDecoration: "line-through"} : null} 
                onDoubleClick={ () => handleCheck(item.id) }
              >
                {item.item}
              </label>
              <FaTrashAlt 
                role='button'
                tabIndex='0'
                onClick={ () => handleDelete(item.id) }
              />
            </li>
          ))}
        </ul>
      ) : (
        <h2 style={{
          marginTop: "40px",
          color: "red",
          fontWeight: "bold",
          textAlign: "center"
        }}>
          Your list is Empty!
        </h2>
      )
      }
    </>
  )
}

export default Content
