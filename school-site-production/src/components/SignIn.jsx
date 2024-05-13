import React, { useState } from 'react'
import { Button, Input, Autocomplete, AutocompleteItem, Link, useNavbar } from '@nextui-org/react'
import BottomSheet from "react-draggable-bottom-sheet";
import NavBar from './NavBar'
import { motion } from 'framer-motion';
import axios from 'axios';
import { api } from '../models/config.model';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openBottomSheet = () => setIsOpen(true);
    const closeBottomSheet = () => setIsOpen(false);

    const [uuid, setUUID] = useState("")

    const [user, setUser] = useState([])

    const [message, setMessage] = useState({ message: "", success: 0 })

    const [isLoading, setISLoading] = useState(false)

    const navigate = useNavigate()

    const onLogin = async () => {
        setISLoading(true)
        setMessage({ message: "", success: 0 })
        const response = await axios.get(api + "/students/get/" + uuid);

        if (response.data.uuid) {
            setMessage({ message: "Գտնվել է", success: 1 })
            setISLoading(false)
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
            localStorage.setItem("resultsPage", 1)
            setTimeout(() => {
                navigate('/results')
            }, 1000)
        } else {
            setMessage({ message: "Նման uuid չկա գրանցվածների ցուցակում", success: 0 })
            setISLoading(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={5}>
            <div>
                <NavBar page='reg' title={"Մուտք գործել"} />
                <div style={{
                    height: "calc(100vh - 115px - 60px)"
                }} className='p-[20px] flex flex-col gap-[10px]'>
                    <div className='flex gap-[10px]'>
                        <Input
                            onChange={(e) => setUUID(e.target.value)}
                            value={uuid}
                            isRequired
                            type="text"
                            label="uuid"
                            className="w-[100%]"
                            variant='bordered'
                            color='success'
                        />
                    </div>
                    <Button isDisabled={!uuid ? true : false} onClick={() => onLogin()} isLoading={isLoading} className='h-[50px] w-[100%] font-[600] text-[#fff] rounded-[15px]' color='success'>Մուտք գործել</Button>
                    <p className={`text-center text-sm text-${message.success ? "success" : "danger"}`}>{message.message}</p>
                    <Link onClick={() => openBottomSheet()} color='success' className='font-semibold text-center flex justify-center mt-[25px]'>Որտեղի՞ց վերցնեմ uuid-ն</Link>
                    <BottomSheet isOpen={isOpen} close={closeBottomSheet}>
                        <div style={{ textAlign: "left", padding: "0px 16px 16px 16px", height: "600px" }}>
                            <h2 className='text-center text-[1.4rem] text-danger font-[600]'>Ունենալ իմ uuid-ն</h2>
                            <ul className='flex flex-col gap-5 mt-[40px]'>
                                {localStorage.getItem("mi") ? <li>Դուք դեռ ունեք աուտենտիկացիա ստատուս՝ uuid: {localStorage.getItem("mi")}</li> : ""}
                                <li>Կարող եք հարցնել մոտիկ ուսուցչից և նա կտրամադրի տվյալների uuid-ն, եթե այն հասանելի չէ, հարկավոր է՝ <Link href='/' color='success'>գրանցվել</Link></li>
                            </ul>
                        </div>
                    </BottomSheet>
                </div>
            </div>
        </motion.div>
    )
}

export default SignIn
