import React, {useState, useEffect, useCallback, useContext} from 'react'

const Context = React.createContext()

const useFormInput = (item, enabled) => {
  const [value, setValue] = useState(localStorage.getItem(item) || '')

  const handlerChange = useCallback((e) => setValue(e.target.value), [])

  const handlerFocus = useCallback(() => setValue(''), [])

  useEffect(() => {
    (enabled) && localStorage.setItem(item, value)
  }, [value, enabled])

  return {
    value,
    onChange: handlerChange,
    onFocus: handlerFocus
  }
}

const useForms = (payload) => {
  const {dispatchLogin, dispatchRooms} = useContext(Context)
  
  const openSignUp = () => dispatchLogin({ type: 'OPEN_SIGNUP', payload: '' })
  const hideSignUp = () => dispatchLogin({ type: 'HIDE_SIGNUP', payload: '' })

  const openFindedRooms = () => dispatchLogin({ type: 'OPEN_FINDEDROOM', payload: '' })
  const hideFindedRooms = () => dispatchLogin({ type: 'HIDE_FINDEDROOM', payload: '' })
  
  const openAddRoom = () => dispatchLogin({ type: 'OPEN_ADDROOM', payload: '' })
  const hideAddRoom = () => dispatchLogin({ type: 'HIDE_ADDROOM', payload: '' })
  
  const hideLogIn = () => dispatchLogin({ type: 'HIDE_LOGIN', payload: '' })

  const getUserRooms = (payload) => dispatchRooms({ type: 'GET_OWNER_ROOMS', payload: payload })
  const getUpdatedUserRooms = (payload) => dispatchRooms({ type: 'GET_UPDATED_OWNER_ROOMS', payload: payload })
  const getAddedUserRooms = (payload) => dispatchRooms({ type: 'GET_ADDED_OWNER_ROOMS', payload: payload })


  return {
    openSignUp,
    hideSignUp,
    openFindedRooms,
    hideFindedRooms,
    openAddRoom,
    hideAddRoom,
    hideLogIn,
    getUserRooms,
    getUpdatedUserRooms,
    getAddedUserRooms
  }
}

export {Context, useFormInput, useForms}