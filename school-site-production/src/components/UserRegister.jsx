import React, { useState } from 'react'
import { Button, Input, Link } from  '@nextui-org/react'
import BottomSheet from "react-draggable-bottom-sheet";
import NavBar from './NavBar'
import axios from 'axios'
import { api, isAuthentcated, isFinished } from '../models/config.model';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const UserRegister = () => {
  const navigate = useNavigate()
  if (isAuthentcated && isFinished) {
    window.location = '/results'
  }

  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => setIsOpen(true);
  const closeBottomSheet = () => setIsOpen(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const redirect = useNavigate();

  const onRegister = async () => {
    const uuid = uuidv4();;
    axios.post(api + "/students/", { firstName, lastName, uuid })
    localStorage.setItem("success", 1)
    localStorage.setItem("uuid", uuidv4())
    localStorage.setItem("pin", uuidv4())
    localStorage.setItem("me", uuidv4())
    localStorage.setItem("created_id", uuidv4())
    localStorage.setItem("userteam", uuidv4())
    localStorage.setItem("utm_source", uuidv4())
    localStorage.setItem("utc_source", uuidv4())
    localStorage.setItem("iscreated", 1)
    localStorage.setItem("user", 1)
    localStorage.setItem("gaccountid", uuidv4())
    localStorage.setItem("mi", uuid)
    const response = await axios.get(api + "/get-status");
    console.log(response.data);
    if (response.data === true) {
      redirect('/play')
    } else {
      redirect('/wait')
    }
  }

  return (
    <motion.div initial={{
      opacity: 0
    }} animate={{opacity: 1}} exit={{opacity: 0}} transition={3}>
      <NavBar page='reg' title={"Գրանցվել"} />
      <div style={{
        height: "calc(100vh - 115px - 60px)"
      }} className='p-[20px] flex flex-col gap-[10px]'>
        <div className='flex gap-[10px]'>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            isRequired
            type="text"
            label="Անուն"
            className="w-[100%]"
            variant='bordered'
            color='success'
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            isRequired
            type="text"
            label="Ազգանուն"
            className="w-[100%]"
            variant='bordered'
            color='success'
          />
        </div>
        <Button onClick={() => onRegister()} isLoading={false} className='h-[50px] w-[100%] font-[600] text-[#fff] rounded-[15px]' color='success'>Մուտք գործել</Button>
        <div className='flex flex-col'>
          <Link onClick={() => openBottomSheet()} color='success' className='font-semibold text-center flex justify-center mt-[25px]'>Կայքի հետ վարվելու կանոններ</Link>
          <Link href='/signin' color='success' className='font-semibold text-center flex justify-center mt-[10px]'>Արդեն ունեմ հաշիվ</Link>
        </div>
        <BottomSheet isOpen={isOpen} close={closeBottomSheet}>
          <div style={{ textAlign: "left", padding: "0px 16px 16px 16px", height: "600px" }}>
            <h2 className='text-center text-[1.4rem] text-danger font-[600]'>Կանոններ</h2>
            <ul className='flex flex-col gap-5 mt-[40px]'>
              <li>Դուրս չգալ կայքից խաղի ընթացքում, <span className='text-danger'>հետևանք՝</span> խաղը ավտոմատ կկանգնեցվի:</li>
              <li>Չի կարելի օգտվել տեղեկատվական կայքերից, օրինակ՝ <Link href='https://google.com'>https://google.com</Link>, <Link href='https://chat.openai.com'>https://chat.openai.com</Link> և այլն, <span className='text-danger'>հետևանք՝</span> տվյալ աշակերտը կհեռացվի խաղից:</li>
              <li><span className='text-danger'>Զգուշացում`</span> ադմինները հետևում են ամբողջ խաղի ընթացքին</li>
            </ul>
          </div>
        </BottomSheet>
      </div>
    </motion.div>
  )
}

export default UserRegister
