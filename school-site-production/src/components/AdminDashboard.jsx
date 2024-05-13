import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import AdminSideBar from './AdminSideBar'
import UsersTable from './UsersTable'
import { api } from '../models/config.model'
import axios from 'axios'
import ProgressTable from './ProgressTable'
import { Button } from '@nextui-org/react'

const AdminDashboard = () => {

    const [users, setUsers] = useState([]);
    const [managmentIsOpened, setManagmentIsOpened] = useState(false)

    const fetchData = async () => {
        setTimeout(() => {
            try {
                axios.get(api + "/students").then(res => setUsers(res.data));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }, 1000)
    };

    fetchData();

    const onStart = () => {
        axios.patch(api + "/start-status", {
            start: true
        })
    }

    return (
        <div>
            <NavBar setManagmentIsOpen={setManagmentIsOpened} managmentIsOpen={managmentIsOpened} page='adm' title={"Welcome Admin!"} />
            <h1 className='text-center text-[2rem]'>80.86.229.7</h1>
            <h2 className='text-center text-[1.5rem]'>lernahovit.loca.lt</h2>
            <AdminSideBar managmentIsOpened={managmentIsOpened} />
            <div className='px-[20px]'>
                <h1 className='uppercase text-center mt-5 text-[1.7em] font-bold'>Մուտքագրված աշակերտներ</h1>
                <UsersTable users={users} />
            </div>
            <div className='px-[20px] mt-10'>
                <ProgressTable />
            </div>
            <div className='flex justify-center mt-[30px] gap-3'>
                <Button onClick={onStart} color='warning' size='lg' className='text-[#fff] py-[17px] px-[40px]'>Start</Button>
            </div>
        </div>
    )
}

export default AdminDashboard
