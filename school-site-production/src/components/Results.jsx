import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api } from '../models/config.model'
import { tasks } from '../models/tasks.model'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from '@nextui-org/react'

const Results = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const [data, setData] = useState([]);

    axios.get(api + "/questions/" + localStorage.getItem("mi"))
        .then(response => setData(response.data))
        .catch(error => console.error("Error occurred during question data request:", error));


    return (
        <div className='p-[20px]'>
            {data.trueAnswers && data.trueAnswers.length ? <>
                <h2 className='font-bold text-[1.5rem] text-success text-center mt-[40px]'>{data.trueAnswers.length} ճիշտ պատասխան</h2>
                <ul className='flex mt-[20px] bg-success flex-col rounded-[20px] justify-center gap-[10px] w-[100%]i p-[10px]'>
                    {data.trueAnswers && data.trueAnswers.map((item, i) => (
                        <li className='text-white text-center' key={i}>{i + 1}) {tasks[item].task}</li>
                    ))}
                </ul>
            </> : ""}
            {data.falseAnswers && data.falseAnswers.length ? <>
                <h2 className='font-bold text-[1.5rem] text-danger text-center mt-[40px]'>{data.falseAnswers.length} սխալ պատասխան</h2>
                <ul className='flex mt-[20px] bg-danger flex-col rounded-[20px] justify-center gap-[10px] w-[100%]i p-[10px]'>
                    {data.falseAnswers && data.falseAnswers.map((item, i) => (
                        <li className='text-white text-center' key={i}>{i + 1}) {tasks[item.id].task}</li>
                    ))}
                </ul>
            </> : ""}
            {data.unansweredQuestions && data.unansweredQuestions.length ? <>
                <h2 className='font-bold text-[1.5rem] text-warning text-center mt-[40px]'>{data.unansweredQuestions.length} Անպատասխան</h2>
                <ul className='flex mt-[20px] bg-warning flex-col rounded-[20px] justify-center gap-[10px] w-[100%] p-[10px]'>
                    {data.unansweredQuestions && data.unansweredQuestions.map((item, i) => (
                        <li className='text-white text-center' key={i}>{i + 1}) {tasks[item].task}</li>
                    ))}
                </ul>
            </> : ""}

            <h2 className='font-bold text-[1.5rem] text-success text-center mt-[40px]'>Դիագրամ "%"</h2>

            <div className='overflow-hidden rounded-lg flex h-[40px] mt-5'>
                <Tooltip color='success' content={data.trueAnswers && ((data.trueAnswers.length / tasks.length) * 100).toFixed(2) + "% " + `(${data.trueAnswers.length}) հատ`}>
                    <div style={{
                        width: data.trueAnswers && ((data.trueAnswers.length / tasks.length) * 100).toFixed(2) + "%"
                    }} className='text-white overflow-hidden bg-success h-[100%] flex justify-center items-center'>{data.trueAnswers && ((data.trueAnswers.length / tasks.length) * 100).toFixed(2)}%</div>
                </Tooltip>
                <Tooltip color='danger' content={data.falseAnswers && ((data.falseAnswers.length / tasks.length) * 100).toFixed(2) + "% " + `(${data.falseAnswers.length} հատ)`}>
                    <div style={{
                        width: data.falseAnswers && ((data.falseAnswers.length / tasks.length) * 100).toFixed(2) + "%"
                    }} className='text-white overflow-hidden bg-danger flex justify-center items-center'>{data.falseAnswers && ((data.falseAnswers.length / tasks.length) * 100).toFixed(2)}%</div>
                </Tooltip>
                <Tooltip color='warning' content={data.unansweredQuestions && ((data.unansweredQuestions.length / tasks.length) * 100).toFixed(2) + "% " + `(${data.unansweredQuestions.length} հատ)`}>
                    <div style={{
                        width: data.unansweredQuestions && ((data.unansweredQuestions.length / tasks.length) * 100).toFixed(2) + "%"
                    }} className='text-white overflow-hidden bg-warning flex justify-center items-center'>{data.unansweredQuestions && ((data.unansweredQuestions.length / tasks.length) * 100).toFixed(2)}%</div>
                </Tooltip>
            </div>

            <p className='text-[#333] text-sm mt-5 text-center'>Հարցերին պատասխանեց` {localStorage.getItem("mi")} [{data.user && data.user.firstName + " " + data.user.lastName.trim()}]</p>
        </div>
    )
}

export default Results
