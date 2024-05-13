import React from 'react'
import { Avatar, Button, Link } from '@nextui-org/react'

const AdminSideBar = ({managmentIsOpened = false}) => {
    return (
        <div onClick={(e) => {
            e.currentTarget.classList.remove("opacity-1")
            e.currentTarget.classList.add("opacity-0")
            document.querySelector(".sidebar-content").classList.remove("translate-x-[0px]")
            document.querySelector(".sidebar-content").classList.add("translate-x-[-300px]")
            e.currentTarget.classList.add("pointer-events-none")
            e.currentTarget.classList.add("pointer-events-all")
        }} className={`first-letter:w-[100%] transition duration-1000 bg-[#00000050] w-[100%] fixed left-0 ${managmentIsOpened ? "opacity-1 pointer-events-all" : "opacity-0 pointer-events-none"}`} style={{
            height: "calc(100vh - 60px)",
            zIndex: "99999999999999999999999999999999999"
        }}>
            <div onClick={(e) => e.stopPropagation()} className={`w-[300px] sidebar-content transition duration-1000 ${managmentIsOpened ? "translate-x-[0px]" : "translate-x-[-300px]"} absolute top-0 left-0 h-[100%] bg-white`}>
                <div className="flex justify-center mt-5">
                    <Avatar isBordered color='success' className='w-[130px] h-[130px]' src='https://lernahovit.schoolsite.am/wp-content/uploads/sites/344/2017/01/SAM_7869.jpg' />
                </div>
                <div className='p-[20px] mt-5 flex flex-col gap-3'>
                    <Button className='w-[100%] h-[50px]' color='default'>Աշակերտներ</Button>
                    <Button className='w-[100%] h-[50px]' color='default'>Արդյունքներ</Button>
                    <Button className='w-[100%] h-[50px]' color='default'>Ավտոհաշվիչ</Button>
                    <Button as={Link} href='/adm/managment' className='w-[100%] h-[50px]' color='default'>Կառավարում</Button>
                </div>
            </div>
        </div>
    )
}

export default AdminSideBar
