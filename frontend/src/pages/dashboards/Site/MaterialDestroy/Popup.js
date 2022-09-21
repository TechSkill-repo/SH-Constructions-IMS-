import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(mcode, mquantity, remark) {
    return { mcode, mquantity, remark };
}

function Popup({ tableValues }) {
    const rows = [];

    tableValues.map((value) => rows.push(createData(value.mcode, value.empId, value.remark)));

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: "2em" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Material Code</TableCell>
                            <TableCell align="center">Quantity Requested</TableCell>
                            <TableCell align="center">Remark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.mcode}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.mcode}</TableCell>
                                <TableCell align="center">{row.mquantity}</TableCell>
                                <TableCell align="center">{row.remark}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Popup;
