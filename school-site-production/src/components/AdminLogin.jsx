import React, { useState } from 'react'
import { Button, Input, Link } from '@nextui-org/react'
import BottomSheet from "react-draggable-bottom-sheet";
import NavBar from './NavBar'
import axios from 'axios'
import { api } from '../models/config.model';

const AdminLogin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => setIsOpen(true);
  const closeBottomSheet = () => setIsOpen(false);

  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState([])

  const isInvalidEmail = !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

  const validated = !isInvalidEmail && password

  const checkAdmin = () => {
    setLoading(!loading)
    axios.post(api + "/adm", {email, password}).then(res => {
      setMsg(res.data)

      if (res.data.success) {
        localStorage.setItem("astatus", 1)
      }
      setLoading(false)
      window.location = './adm'
    })
  }
  
  return (
    <div>
      <NavBar page='adm' title={"Admin Panel"} />
      <div style={{
        height: "calc(100vh - 115px - 60px)"
      }} className='p-[20px] flex flex-col gap-[10px]'>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          isRequired
          type="email"
          label="Էլ. հասցե"
          isInvalid={isInvalidEmail}
          errorMessage={isInvalidEmail && "Գրեք ճիշտ էլ․հասցե՝ example@gmail.com"}
          className="w-[100%]"
          variant='bordered'
          color='success'
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          isRequired
          type="email"
          label="Գաղտնաբառ"
          isInvalid={!password}
          errorMessage={!password && "Լրացնել դաշտը"}
          className="w-[100%]"
          variant='bordered'
          color='success'
        />
        <p className={`text-${msg.success ? "success" : "danger"} text-center my-[15px]`}>{msg.message}</p>
        <Button onClick={() => checkAdmin()} isDisabled={!validated ? true : false} isLoading={loading ? true : false} className='h-[50px] w-[100%] font-[600] text-[#fff] rounded-[15px]' color='success'>Մուտք գործել</Button>
        <Link onClick={() => openBottomSheet()} color='success' className='font-semibold text-center flex justify-center mt-[25px]'>Կայքի հետ վարվելու կանոններ</Link>
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
    </div>
  )
}

export default AdminLogin