import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import axios from 'axios';
import { api } from '../models/config.model';

const ProgressTable = () => {
    const [process, setProcess] = useState([]);

    const fetchData = async () => {
        setTimeout(() => {
            try {
                axios.get(api + "/questions").then(res => setProcess(res.data));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }, 1000)
    };

    fetchData();

    const sortData = () => {
        const sortedProcess = [...process].sort((a, b) => b.trueCount - a.trueCount);
        return sortedProcess;
    };

    const sortedProcess = sortData();

    const columns = [
        {
            key: "id",
            label: "#",    
        },
        {
            key: "fistNameLastName",
            label: "Անուն Ազգանուն",    
        },
        {
            key: "uuid",
            label: "Խեշ ID",
        },
        {
            key: "trueCount",
            label: "Ճիշտ պաստախաններ",
        },
        {
            key: "falseCount",
            label: "Սխալ պաստախաններ",
        },
        {
            key: "unansweredCount",
            label: "Առանց պատասխան",
        }
    ];

    return (
        <div>
            <Table className='mt-5' aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent={"Դեռ գրանցվածներ չկան"} items={sortedProcess}>
                    {
                        sortedProcess.map((item, i) => {
                            let rowClassName = "";
                            if (sortedProcess[0].uuid === item.uuid) {
                                rowClassName = "bg-[#FEE101] text-black";
                            } else if (sortedProcess[1].uuid === item.uuid) {
                                rowClassName = "bg-[#D7D7D7] text-black";
                            } else if (sortedProcess[2].uuid === item.uuid) {
                                rowClassName = "bg-[#824A02] text-white";
                            }

                            return <TableRow className={rowClassName} key={i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.user.firstName + " " + item.user.lastName}</TableCell>
                                <TableCell>{item.user.uuid}</TableCell>
                                <TableCell>{item.trueCount}</TableCell>
                                <TableCell>{item.falseCount}</TableCell>
                                <TableCell>{item.unansweredCount}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ProgressTable;
