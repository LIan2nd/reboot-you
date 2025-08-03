import React, { useEffect, useState } from 'react'
import Input from '../Form/Input';
import saveToLocalStorage from '../../utils/saveToLocalstorage';
import loadFromLocalStorage from '../../utils/loadFromLocalStorage';
import Button from '../Button';
import Card from '../Card';
import ListItem from '../ListItem';
import { BiPlus } from 'react-icons/bi';
import ListContainer from '../ListContainer';
import addSound from '../../assets/sound/add.mp3';
import useSound from 'use-sound';

const RoutineCard = () => {

  const [routineData, setRoutineData] = useState([]);
  const [routineInput, setRoutineInput] = useState('');
  const [playAdd] = useSound(addSound);

  const addRoutine = (e) => {
    e.preventDefault();
    if (!routineInput) return;
    playAdd();
    const routine = {
      id: Date.now().toLocaleString().split(",").join(''),
      name: routineInput,
      completed: false,
    }
    setRoutineInput("");
    setRoutineData(prev => [...prev, routine]);
  }

  useEffect(() => {
    if (loadFromLocalStorage('routine-data')) {
      setRoutineData(loadFromLocalStorage('routine-data'));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      saveToLocalStorage('routine-data', routineData);
    }, 1000);
  }, [routineData]);

  const deleteAllRoutine = () => {
    if (confirm("Are you sure wanna delete all routine?")) {
      setRoutineData([]);
    }
  }

  const completedRoutine = (id) => {
    const updatedRoutineData = routineData.map((item, index) =>
      index === id ? { ...item, completed: !item.completed } : item
    );
    setRoutineData(updatedRoutineData);
  }

  const deleteRoutine = (e, id) => {
    e.stopPropagation();
    const updatedRoutineData = routineData.filter((r) => r.id !== id);
    setRoutineData(updatedRoutineData);
  }

  return (
    <Card title="Everyday Routine">
      <form onSubmit={addRoutine} className='flex flex-wrap gap-4 items-center mb-4'>
        <Input type={'text'} name={'routine'} id={'routine'} value={routineInput} placeholder={"Input Routine"}
          onchange={(e) => setRoutineInput(e.target.value)} />
        <Button type='submit' color="purple"><BiPlus size={24} /></Button>
      </form>
      <ListContainer>
        {routineData.length ? (
          routineData.map((routine, i) => (
            <ListItem
              key={routine.id}
              id={routine.id}
              name={routine.name}
              done={routine.completed}
              checkbox={true}
              deleteClick={(e) => deleteRoutine(e, routine.id)}
              completedClick={() => completedRoutine(i)}
            />
          ))
        ) : (
          <>
            <p>Routine is empty, let's add some routine!</p>
          </>
        )}
      </ListContainer>
      {!!routineData.length && (
        <Button type="button" color="red" onclick={deleteAllRoutine}>Empty Routine</Button>
      )}
    </Card>
  )
}

export default RoutineCard;