import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cookie from 'js-cookie';
import {
    FormControl, Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";
import {DatePicker,} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import {format} from 'date-fns'

const UserComplaints = (props) => {
    const {isAdmin, user} = props
    const [data, setData] = useState([]);
    const [create, setCreate] = useState(false);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': "Bearer " + cookie.get('token')}
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
            return response.json();
        }).then(data => {
            location.reload();
        });
    }

    function onChangeStatus(id, status) {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + cookie.get('token')},
            body: JSON.stringify({status: status})
        };
        fetch("api/updatecomplaint/" + id, requestOptions).then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                    return {placeholder: "something went wrong!"};
                });
            }
            return response.json();
        }).then(data => {
            location.reload();
        });
    }

    function onClickSignOut() {
        cookie.remove("token");
        location.reload();
    }
    return (
        <div style={{marginLeft: "15%", marginRight: "15%" , padding:5}}>
            <Grid container justifyContent={"space-between"} style={{marginBottom:10}}>
                <Grid item xs={6}>
                    <Typography variant={"h5"}>
                        {user.first_name} {user.last_name}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        onClick={onClickSignOut}
                        variant="contained"
                        fullWidth
                        color="primary">
                        sign out
                    </Button>
                </Grid>
            </Grid>
            <Paper>
                <Grid container justifyContent={"space-between"} style={{padding: 10}}>
                    <Grid item xs={2}>
                        <Typography component="h1" variant="h5">Complaints</Typography>
                    </Grid>
                    {!isAdmin ?
                        <Grid item xs={1}>
                            {create ?
                                <Button
                                    onClick={onClickCreate}
                                    variant="contained"
                                    color="primary">
                                    Add
                                </Button> :
                                <IconButton
                                    onClick={() => setCreate(true)}>
                                    <AddIcon/>
                                </IconButton>
                            }
                        </Grid> : null}
                </Grid>
                <Table size="small">
                    <TableHead>
                        {create ?
                            <TableRow key={"create"}>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        label="description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        fullWidth
                                        autoFocus
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
                            {isAdmin ? <TableCell>Complained By</TableCell> : null}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">{item.description}</TableCell>
                                <TableCell component="th" scope="row">{item.date}</TableCell>
                                <TableCell component="th" scope="row">
                                    <FormControl>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            disabled={!isAdmin}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={item.status}
                                            onChange={e => onChangeStatus(item.id, e.target.value)}
                                        >
                                            <MenuItem value={"p"}>Pending</MenuItem>
                                            <MenuItem value={"r"}>Resolved</MenuItem>
                                            <MenuItem value={"d"}>Dismissed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                {isAdmin ?
                                    <TableCell component="th" scope="row">{item.complained_by}</TableCell> : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
};
export default UserComplaints;
