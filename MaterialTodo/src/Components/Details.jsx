import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import { TextField, Button, Box, Typography } from '@material-ui/core';
import {deleteTodo, editTodo} from "../Redux/action";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

export default function Details() {    
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todo);
    const param = useParams();
    const history = useHistory();
    var item = todo.find((item) => item.id===param.id);
    const [task, setTask] = useState(item.title || "");
    
    const handleEdit = () => {
        let newItem = {
            id: item.id,
            title:task,
            status:false
        };
        setTask("");
        dispatch(editTodo(newItem));
        history.push("/") 
    };

    const handleDelete = () => {
        dispatch(deleteTodo(item.id))  
        history.push("/")      
    };   

    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          display:'flex',
          justifyContent:'space-between',
          flex:1,
          margin:'auto',
          marginTop:10,
          width:300,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 50,
          padding: '0 30px',
        },
        box:{
            marginTop:15,
            marginLeft:10
        }
      });

    const classes = useStyles();
    return (
        <>
            <div>
                <h1>Task Details</h1>
                <Box className={classes.root}>
                    <Box className={classes.box}>{item.title}</Box>
                    <Typography className={classes.box}>Not Completed</Typography>
                </Box>
                
                <h1>Edit</h1>
                <TextField 
                    id="outlined-basic"
                    label="" 
                    variant="outlined" 
                    value={task} 
                    onChange={(e)=>setTask(e.target.value)}
                />
                <Button 
                    className={classes.box}
                    size="large"
                    variant="contained"
                    color="primany"
                    startIcon={<SaveIcon/>}
                    onClick={handleEdit}>
                    Edit
                </Button>
                <Button
                    className={classes.box}
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </>
    )
}
