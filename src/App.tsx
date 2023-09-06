import React from 'react'
import './App.css'
import TodosStore from './store/TodosStore'
import { observer } from 'mobx-react-lite';
import { CheckboxList } from './components/CheckboxList';

const App = observer(() => {

  const { getTodosAction, todos } = TodosStore;

  React.useEffect(() => {
    getTodosAction()
  }, [getTodosAction]);

  if(!todos){
    return null
  }

  return todos.case({
    pending: () => <div>Loading...</div>,
    rejected: () => <div>Error</div>,
    fulfilled: (value) => <CheckboxList todos={value} />
  })
})

export default App
