import React, { useEffect, useState } from 'react'
import Task from '../Task/Task'
import './TaskList.css'
import ListAltIcon from '@mui/icons-material/ListAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

function TaskList({ todolist, addFav, removeTask }) {
	const [localTaskList, setLocalTaskList] = useState([...todolist]);
	useEffect(() => {
		if (todolist) {
			setLocalTaskList(todolist);
		}
	}, [todolist])

	const onTaskSearch = e => {
		if (e.target.value && e.target.value.length > 3) {
			let tempList = [...todolist.filter(task => (task && task.value && task.value.includes(e.target.value)))];
			setLocalTaskList(tempList);
		}
		if(!e.target.value) {
			setLocalTaskList([...todolist]);
		}
	}

	const filterFavTask = e => {
		setLocalTaskList([...localTaskList.filter(task => task?.isFav )]);
	}

	const removeFilter = e => {
		setLocalTaskList([...todolist]);
	}
	return (
		<div className='tasklist'>
			<div className="tasklist__header">
				<div className="tasklist__header-left">
					<input type="text" className='task-search-bar' onKeyUp={onTaskSearch} />
				</div>
				<div className="tasklist__header-right">
					<button onClick={filterFavTask}> <ListAltIcon   className='star-filter'/></button>
					<button onClick={removeFilter}><FilterAltOffIcon /></button>
				</div>
			</div>
			<div className="tasklist__body">
				{
					localTaskList?.map(task => (
						<Task task={task} key={task.id} addFav={addFav} removeTask={removeTask} />
					))
				}
			</div>
		</div>
	)
}

export default TaskList