import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import {getTodosLoading, getCompletedTodos, getIncompleteTodos} from './selectors';
import {loadTodos, removeTodoRequest, markCompleteRequest} from './thunks';
import styled from 'styled-components';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;


const TodoList = ({completedTodos, inCompleteTodos, isLoading, onRemovePressed, onMarkCompletePressed, startLoadingTodos}) => {

    useEffect(() =>{
        startLoadingTodos();
    }, [])
    const loadingMessage = <div>Loading todos...</div>;
    const content = (
    <ListWrapper>
        <NewTodoForm/>
        <h3>Incomplete:</h3>
        {inCompleteTodos.map((todo, idx) => 
            <TodoListItem 
                key={idx} 
                todo={todo} 
                onRemovePressed={onRemovePressed}
                onMarkCompletePressed={onMarkCompletePressed}
            />)}
        <h3>Ccomplete:</h3>
        {completedTodos.map((todo, idx) => 
            <TodoListItem 
                key={idx} 
                todo={todo} 
                onRemovePressed={onRemovePressed}
                onMarkCompletePressed={onMarkCompletePressed}
            />)}
    </ListWrapper>
    )

    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    inCompleteTodos: getIncompleteTodos(state)
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onMarkCompletePressed: id => dispatch(markCompleteRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos())

})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);