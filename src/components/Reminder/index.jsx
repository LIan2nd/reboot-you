import React, { useEffect, useState } from 'react'
import Card from '../Card';
import Input from '../Form/Input';
import Button from '../Button';
import loadFromLocalStorage from '../../utils/loadFromLocalStorage';
import saveToLocalStorage from '../../utils/saveToLocalstorage';
import ListItem from '../ListItem';
import { BiPlus } from 'react-icons/bi';
import ListContainer from '../ListContainer';
import addSound from '../../assets/sound/add.mp3';
import useSound from 'use-sound';

const Reminder = () => {
  const [reminderData, setReminderData] = useState([]);
  const [reminderInput, setReminderInput] = useState('');
  const [playAdd] = useSound(addSound);

  const addReminder = (e) => {
    e.preventDefault();
    if (!reminderInput) return;
    playAdd();
    const reminder = {
      id: Date.now().toLocaleString().split(",").join(''),
      name: reminderInput
    }
    setReminderInput("");
    setReminderData(prev => [...prev, reminder]);
  }

  useEffect(() => {
    if (loadFromLocalStorage('reminder-data')) {
      setReminderData(loadFromLocalStorage('reminder-data'));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      saveToLocalStorage('reminder-data', reminderData);
    }, 1000);
  }, [reminderData]);

  const deleteAllReminder = () => {
    if (confirm("Are you sure wanna delete all reminder?")) {
      setReminderData([]);
    }
  }

  const deleteReminder = (e, id) => {
    e.stopPropagation();
    const updatedReminderData = reminderData.filter((r) => r.id !== id);
    setReminderData(updatedReminderData);
  }

  return (
    <Card title="Reminder">
      <form onSubmit={addReminder} className='flex flex-wrap gap-4 items-center mb-4'>
        <Input type={'text'} name={'reminder'} id={'reminder'} value={reminderInput}
          onchange={(e) => setReminderInput(e.target.value)} placeholder={"Input Reminder"} />
        <Button type='submit' color="purple"><BiPlus size={24} /></Button>
      </form>
      <ListContainer>
        {reminderData.length ? (
          reminderData.map((reminder, i) => (
            <ListItem
              key={reminder.id}
              id={reminder.id}
              name={reminder.name}
              done={reminder.completed}
              deleteClick={(e) => deleteReminder(e, reminder.id)}
            />
          ))
        ) : (
          <>
            <p>Reminder is empty, let's add some reminder!</p>
          </>
        )}
      </ListContainer>
      {!!reminderData.length && (
        <Button type="button" color="red" onclick={deleteAllReminder}>Empty Reminder</Button>
      )}
    </Card>
  )
}

export default Reminder;