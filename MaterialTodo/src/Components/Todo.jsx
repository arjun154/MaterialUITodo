import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuid} from "uuid";
import { TextField, Checkbox, Container, Box, Typography } from '@material-ui/core';
import {addTodo, toggleTodo} from "../Redux/action";
import {Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

export default function Todo() {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todo);

    const handleSubmit = () => {
        let item = {
            id:uuid(),
            title:task,
            status:false
        };
        setTask("");
        dispatch(addTodo(item));
    };
    
 
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          handleSubmit();
        }
    };

    const handleToggle = (e) => {
        dispatch(toggleTodo(e.target.id));
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
            marginTop:15
        }
      });

    const classes = useStyles();

    return (
        <div>
            <h1>Todo List</h1>
            <TextField 
                id="outlined-basic"
                label="Add Something..." 
                variant="outlined" 
                value={task} 
                onChange={(e)=>setTask(e.target.value)}
                onKeyPress={handleKeyPress}
            />

            <Container>
                {todo && todo.filter((item) => item.status===false).map((item) =>                                            
                        <Box key={item.id} className={classes.root}>
                            <Checkbox checked={item.status} onChange={handleToggle} id={item.id}/>
                            <Link to={`/details/${item.id}`} className={classes.box}>{item.title}</Link>
                            <Typography className={classes.box}>Not Completed</Typography>
                        </Box>                    
                )}
            </Container>

            <h1>Completed Tasks</h1>
            <Container>
                {todo && todo.filter((item) => item.status===true).map((item) => 
                    <Box key={item.id} className={classes.root}>
                        <Checkbox checked={item.status} onChange={handleToggle} id={item.id}/>
                        <div className={classes.box}>{item.title}</div>
                        <Typography className={classes.box}>Completed</Typography>
                    </Box>
                )}
            </Container>
        </div>
    )
}
