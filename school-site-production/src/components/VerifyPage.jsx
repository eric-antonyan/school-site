import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { api } from '../models/config.model'
import { Student } from '../models/students.model'

const VerifyPage = ({ email, verifyCode, fathername, uuid, firstName, lastName, studentClass, studentSchool }) => {

    const [opt, setOpt] = useState("");
    const [isClicked, setIsClicked] = useState(true)

    const [msg, setMsg] = useState({
        message: "",
        success: 0
    });

    const isInvalidOpt = opt.length !== 6;

    const verify = async (e) => {
        console.log(verifyCode, opt);
        if (parseInt(opt) === verifyCode) {
            console.log(api);
            const newStudent = new Student(firstName, lastName, uuid, studentClass, studentSchool, email, fathername)
            newStudent.create()
            setMsg({
                message: "Դուք հաջողությամբ մուտք գործեծիք",
                success: 1
            })
            setIsClicked(false)
            if (localStorage.getItem("mi")) {
                window.location = "/play"
            }
        } else {
            setMsg({
                message: "Սխալ Վերֆիկացման կոդ",
                success: 0
            })
        }
    }

    return (
        <div className='px-[20px]'>
            <p className='text-center mt-5'>Հարգելի <span className='text-success'>{firstName}</span> նամակը հաջողությամբ ուղարկվեց՝ <span className="text-success">{email}</span> էլ․ հասցեյին</p>
            <div action='#' className='mt-5'>
                <Input
                    onChange={(e) => setOpt(e.target.value)}
                    value={opt}
                    isInvalid={isInvalidOpt}
                    errorMessage={isInvalidOpt && "Վերիկ․ կոդը պետք է պարունակի 6 նիշ"}
                    maxLength={6}
                    max={6}
                    label='Verification code'
                    color='success'
                    type='number'
                />
                <p className={`text-${msg.success === 1 ? "success" : "danger"} text-center mt-5`}>{msg.message}</p>
                <Button isDisabled={isInvalidOpt || !isClicked ? true : false} onClick={() => verify()} type='submit' className='h-[55px] w-[100%] mt-5 text-white' color='success'>Առաջ</Button>
            </div>
        </div>
    )
}

export default VerifyPage
