import React from 'react'
import { Button } from '@nextui-org/react'
import LernahovitLogo from './LernahovitLogo'

const HomePage = () => {
    return (
        <div className='p-[20px]'>
            <div className="cover relative after:bg-[url('https://lernahovit.schoolsite.am/wp-content/uploads/sites/344/2017/01/SAM_7869.jpg')] after:w-[100%] after:absolute after:bottom-[-15px] after:left-[20px] after:h-[100%] after:blur-[150px]">
                <img className='rounded-[15px] z-[99999] brightness-50 relative' src="https://lernahovit.schoolsite.am/wp-content/uploads/sites/344/2017/01/SAM_7869.jpg" alt="" />
                <div className='absolute top-1/2 bg-white p-[20px] rounded-[16px] w-[110px] h-[110px] flex justify-center items-center aspect-square left-1/2 z-[999999999999]' style={{
                    transform: "translateY(-50%) translateX(-50%)"
                }}>
                    <LernahovitLogo className={"w-[100%] h-auto"} />
                </div>
            </div>
            <Button className='mt-[25px] h-[55px] text-[1.1rem] w-[100%] relative z-[9999] text-white' color='success'>Սկսել</Button>
        </div>
    )
}

export default HomePage
