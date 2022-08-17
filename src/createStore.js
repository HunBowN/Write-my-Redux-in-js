export function createStore(rootReducer, initialState) {

  let state = rootReducer(initialState, {type: '__INIT__'})
  const subscribers = []

  return {
    // action ={type: 'INCREMENT'} type -обязательно
    dispatch(action) {
     state = rootReducer(state, action)
     subscribers.forEach(sub => sub())
     // дальше нужно уведомить наших слушаиелелей что состояние изменилось
    },
    sabscribe(callback) {
      subscribers.push(callback)
    },
    getState() {
      return state
    },

  }
}

// когда прилетает action мы меняем state но сделать это нужно через reducer
// reducer должен быть для каждого приложения свой, мы его принимаем как параметр в ф-ю createStore
// правило reducer - мы на выходе поулчаем объект