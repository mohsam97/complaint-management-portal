import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cookie from 'js-cookie';
import {
    FormControl,
    Icon,
    IconButton, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {
    DatePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import {format} from 'date-fns'

const UserComplaints = (props) => {
    const [data, setData] = useState([]);
    const [create, setCreate] = useState(false);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': "Bearer " +  cookie.get('token')}
        };
        fetch("api/complaints", requestOptions).then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                    return {placeholder: "something went wrong!"};
                });
            }
            return response.json()
        }).then(data => {
            setData(data)
        });

    }, [])

    function onClickCreate() {
        console.log(cookie.get('token'))
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + cookie.get('token')},
            body: JSON.stringify({description: description, date: date, status: "p"})
        };
        fetch("api/createcomplaint", requestOptions).then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                    return {placeholder: "something went wrong!"};
                });
            }
            return response.json()
        }).then(data => {
            location.reload();
        });
    }


    return (<>
            <TableContainer component={Paper}>
                <IconButton onClick={() => !create ? setCreate(true) : onClickCreate()}><AddIcon/></IconButton>
                <Table>
                    <TableHead>
                        {create ?
                            <TableRow key={"create"}>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        label="description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <DatePicker
                                        variant="inline"
                                        label="Date"
                                        format="yyyy-MM-dd"
                                        onChange={(e) => setDate(format(e, 'yyyy-MM-dd'))}
                                        value={date}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <FormControl>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={"p"}
                                            // onChange={handleChange}
                                        >
                                            <MenuItem value={"p"}>Pending</MenuItem>
                                            <MenuItem value={"r"}>Resolved</MenuItem>
                                            <MenuItem value={"d"}>Dismissed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow> :
                            null
                        }
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">{item.description}</TableCell>
                                <TableCell component="th" scope="row">{item.date}</TableCell>
                                <TableCell component="th" scope="row">{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};
export default UserComplaints;
