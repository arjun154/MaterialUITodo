import {ADD_TODO, DELETE_TODO, EDIT_TODO, TOGGLE_TODO} from "./actionTypes";
import { loadData, saveData } from "./localStorage";

const initState = {
    todo:loadData("tasks") || []
};

const reducer = (state=initState, {type, payload}) => {
    switch(type){
        case ADD_TODO:
            let data = [...state.todo, payload];
            saveData("tasks", data);
            return{
                ...state,
                todo:data              
            }
        case DELETE_TODO:
            let item1 = state.todo.filter((item)=>item.id!==payload)
            let todos = [...item1]
            saveData("tasks", todos)
            return{
                ...state,
                todo: todos
            };
        case TOGGLE_TODO:
                let item = state.todo.find((item)=>item.id===payload);
                item.status = !item.status;
                let tasks = state.todo.filter((item) => item.id===payload? item:item)
                let todo = [...tasks]
                saveData("tasks", tasks)
                return{
                    ...state,
                    todo:todo
                };
        case EDIT_TODO:
            let newItem = state.todo.find((item) => item.id === payload.id);
            console.log(payload)
            newItem.title = payload.title
            return{
                ...state,
                todo:state.todo.filter((item)=>item.id===payload.id? item:newItem)
            }
        default:
            return state
    }
}

export default reducer;