import React, { useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from '@nextui-org/react'

const UsersTable = ({ users = [] }) => {
    
    const rows = users;

    console.log(users);
    
    const columns = [
        {
            key: "firstName",
            label: "Անուն",
        },
        {
            key: "lastName",
            label: "Ազգանուն",
        },
        {
            key: "uuid",
            label: "Խեշ ID",
        }
    ];
    
    return (
        <Table className='mt-5' aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent={"Դեռ գրանցվածներ չկան"} items={rows}>
                {(item, i) => (
                    <TableRow key={item.firstName}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default UsersTable
