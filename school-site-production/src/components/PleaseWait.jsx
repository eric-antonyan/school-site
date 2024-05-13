import { Button } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../models/config.model'

const PleaseWait = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const redirect = useNavigate();

    useEffect(() => {
        const fetchData =  () => {
            setInterval(async () => {
                const response = await axios.get(api + "/get-status");
                if (response.data === true) {
                    setIsDisabled(false);
                } else {
                    setIsDisabled(true);
                }
            }, 1000)
        };

        fetchData();
    }, []);

    const onStart = async () => {
        redirect('/play')
    }
    return (
        <div className='p-[50px] flex flex-col justify-center gap-5'>
            <h1 className='text-center font-extrabold'>Խնդրում ենք սպասել մինչ կստանաք ադմինի թույտվություն խաղը սկսելու համար</h1>
            <Button onPress={onStart} size='lg' className='text-white font-bold' color='success' isDisabled={isDisabled}>Start</Button>
        </div>
    )
}

export default PleaseWait
