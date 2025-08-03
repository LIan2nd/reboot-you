import React, { useEffect, useState } from 'react'
import loadFromLocalStorage from '../../utils/loadFromLocalStorage';
import Input from '../Form/Input';
import saveToLocalStorage from '../../utils/saveToLocalstorage';
import Button from '../Button';
import Card from '../Card';
import ListItem from '../ListItem';
import { BiPlus } from 'react-icons/bi';
import ListContainer from '../ListContainer';
import addSound from '../../assets/sound/add.mp3';
import useSound from 'use-sound';

const TaskCard = ({ additionalClass }) => {

  const [taskData, setTaskData] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [playAdd] = useSound(addSound);

  useEffect(() => {
    if (loadFromLocalStorage('task-data')) {
      setTaskData(loadFromLocalStorage('task-data'));
    }
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput) return;
    playAdd();

    const task = {
      id: Date.now().toLocaleString().split(',').join(''),
      name: taskInput,
      completed: false,
    }
    setTaskInput("");
    setTaskData(prev => [...prev, task]);
  }

  useEffect(() => {
    setTimeout(() => {
      saveToLocalStorage('task-data', taskData);
    }, 1000);
  }, [taskData]);

  const deleteAllTask = () => {
    if (confirm("Are u sure wanna delete all task?")) setTaskData([]);
  }

  const completedTask = (id) => {
    const updatedTaskData = taskData.map((item, index) =>
      index === id ? { ...item, completed: !item.completed } : item
    );
    setTaskData(updatedTaskData);
  }

  const deleteTask = (e, id) => {
    e.stopPropagation();
    const updatedTaskData = taskData.filter((r) => r.id !== id);
    setTaskData(updatedTaskData);
  }

  return (
    <Card additionalClass={`${additionalClass}`} title={"To-do List"}>
      <form onSubmit={addTask} className='flex flex-wrap gap-4 items-center mb-4'>
        <Input type={'text'} id="task" name="task" value={taskInput}
          placeholder={"Input what todo"}
          onchange={(e) => setTaskInput(e.target.value)} />
        <Button type="submit" color="purple"><BiPlus size={24} /></Button>
      </form>
      <ListContainer>
        {
          taskData.length ? (
            <>
              <h2>Hei do thesee!</h2>
              {
                taskData.map((task, i) => (
                  <ListItem
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    done={task.completed}
                    checkbox={true}
                    deleteClick={(e) => deleteTask(e, task.id)}
                    completedClick={() => completedTask(i)}
                  />
                ))}
            </>
          ) : (
            <>
              <p>Task is empty, let's add some task!</p>
            </>
          )
        }
      </ListContainer>
      {!!taskData.length && (
        <Button onclick={deleteAllTask} type='button' color="red">Empty Task</Button>
      )}
    </Card>
  )
}

export default TaskCard;