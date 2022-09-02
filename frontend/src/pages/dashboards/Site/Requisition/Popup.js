import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(mname, mcode, mdescription, mquantity) {
    return { mname, mcode, mdescription, mquantity };
}

function Popup({ tableValues }) {
    const rows = [
        tableValues.map((value) => createData(value.mname, value.mcode, value.mdescription, value.mquantity))
    ];

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: "2em" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Material Name</TableCell>
                            <TableCell align="center">Material Code</TableCell>
                            <TableCell align="center">Material Description</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.mname}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.mname}</TableCell>
                                <TableCell align="center">{row.mcode}</TableCell>
                                <TableCell align="center">{row.mdescription}</TableCell>
                                <TableCell align="center">{row.mquantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

// const Popup = ({ submitHandler, tableValues }) => {
//     return (
//         <div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//             <div>Popup</div>
//         </div>
//     )
// }

export default Popup;
