import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux'
import logger from 'redux-logger'
// import { createStore } from './createStore'
import thunk from 'redux-thunk'
import { decrement, increment,asyncIncrement, changeTheme } from './redux/ACTIONS.JS'
import { rootReducer } from './redux/rootReducer'
import './styles.css'
import { applyMiddleware, compose } from 'redux'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger (state) {
//   return function(next) {
//     return function(action){
//       console.log('State ',state.getState());
//       console.log('Action ',action);
//       return next(action)
//     }
//   }
// }

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) )
// const store = createStore(rootReducer, 0)




addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})
subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})
themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light'
    store.dispatch(changeTheme(newTheme))
})

store.subscribe(()=>{
  const state = store.getState()
  
  counter.textContent = state.counter
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach( (btn) => {
    btn.disabled = state.theme.disabled 
  })
})

store.dispatch({type: 'INIT_APPLICATION'})

// Итого:
// Редакс не привяза н конкретному фреймворку
// Мы общаемся с контейнером(условно) Редакс и поулчаем его из состояние
// в Редаксе все состояние описывается единым объектом
// В Редаксе компоненты, они же вьюшки, они же html&css общаются со Store  через action
// Actions - обыные объекты которые мы можем distach в store
// в store содержится само состояни, которое мы меняем через redusers
// Правило reduser'ов следующее: всегда должны какой-то state и в случае если action.type совпадет с тем...
// ...что мы меняем в reduder то тогда мы должны вернуть новый объект - это ИММУТАБИЛЬНОСТЬ
// про иммутабильность здесь: https://3-info.ru/post/9471
// если state изменился то наши компоненты получают уведомления от store и нужно сделать перерисовку
// store  реализован по паттерну oserver(наблюдатель)
// Наблюдатель — поведенческий шаблон проектирования. Также известен как «подчинённые». 
// Реализует у класса механизм, который позволяет объекту этого класса получать оповещения 
// об изменении состояния других объектов и тем самым наблюдать за ними.






