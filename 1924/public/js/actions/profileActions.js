import { filterItemData } from '../utils/filterUtils.js'

export async function loadProfile (dispatch) {
  try {
    const response = await fetch('/api/profile')
    const data = await response.json()
    localStorage.setItem('userProfile', JSON.stringify(data.user))
    dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: data.user })
  } catch (error) {
    dispatch({ type: 'LOAD_PROFILE_ERROR', payload: error.message })
  }
}

export async function updateProfile (dispatch) {
  const user = JSON.parse(localStorage.getItem('userProfile'))
  const updatedData = {}
  filterItemData(user, ['_id', 'id', 'cuentas', 'especialidades']).forEach(
    key => {
      updatedData[key] = document.getElementById(`edit-${key}`).value
    }
  )

  try {
    const response = await fetch('/api/updateProfile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })

    const data = await response.json()
    alert(data.message)
    localStorage.setItem('userProfile', JSON.stringify(updatedData))
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: updatedData })
  } catch (err) {
    alert(err.message)
  }
}
