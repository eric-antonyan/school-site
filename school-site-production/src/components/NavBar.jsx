import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShield } from '@fortawesome/free-solid-svg-icons'

const NavBar = ({title, page = "reg", managmentIsOpen, setManagmentIsOpen}) => {
  return (
    <header className='py-[10px] h-[60px] px-[20px] flex justify-between items-center'>
      {page === "reg" ? <FontAwesomeIcon fontSize={"1.4rem"} color='#333' icon={faUser} /> : <FontAwesomeIcon onClick={() => setManagmentIsOpen(!managmentIsOpen)} fontSize={"1.4rem"} icon={faShield} /> }
      <h1 className='text-[#333] text-[1.2rem] font-[700]'>{title}</h1>
      <span className='text-[#fff] select-none'>s</span>
    </header>
  )
}

export default NavBar
