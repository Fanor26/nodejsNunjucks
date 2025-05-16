// controllers/login.js
import { asyncAuth } from '/js/api/asyncAuth.js'
import { CreateButton } from '/js/components/controls/button.js'
import { CreateInput } from '/js/components/controls/input.js'
import { Form } from '/js/components/controls/form.js'
import { CreateCard } from '/js/components/custom/card.js'
import useForm from '/js/hooks/useForm.js'

export function setupLoginPage () {
  const container = document.getElementById('page-container')

  if (!container) {
    console.warn('No se encontró el contenedor principal')
    return
  }

  const rawData = container.dataset.action

  if (!rawData) {
    console.warn('data-action está vacío o no definido')
    return
  }

  try {
    const actionData = JSON.parse(rawData)
    console.log('Datos cargados:', actionData)

    if (actionData.pageNjk === 'login') {
      renderLogin(container)
    }
  } catch (err) {
    console.error('Error al parsear data-action:', err, rawData)
  }
}
function renderLogin (container) {
  container.innerHTML = '' // Limpiar el contenedor

  const errorMessage = document.createElement('p')
  errorMessage.id = 'errorMessage'
  errorMessage.style.color = 'red'
  errorMessage.style.display = 'none'

  const initialValues = {
    email: '',
    password: ''
  }

  const validate = values => {
    const errors = {}
    if (!values.email) errors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(values.email))
      errors.email = 'El email no es válido'

    if (!values.password) errors.password = 'La contraseña es requerida'
    else if (values.password.length < 6)
      errors.password = 'Debe tener al menos 6 caracteres'

    return errors
  }

  const onSubmit = async values => {
    const result = await asyncAuth(values)
    if (!result.success) {
      errorMessage.textContent = result.error
      errorMessage.style.display = 'block'
    }
  }

  const formState = useForm(initialValues, validate, onSubmit)

  const emailInput = CreateInput(
    'email',
    'email',
    'Email',
    value => formState.handleChange({ target: { name: 'email', value } }),
    formState.errors.email
  )

  const passwordInput = CreateInput(
    'password',
    'password',
    'Contraseña',
    value => formState.handleChange({ target: { name: 'password', value } }),
    formState.errors.password
  )

  formState.subscribeErrors(errors => {
    emailInput.updateError(errors.email || '')
    passwordInput.updateError(errors.password || '')
  })

  const loginButton = CreateButton('Iniciar Sesión', {
    backgroundColor: '#28a745',
    padding: '12px 24px',
    fontSize: '18px'
  })

  const loginForm = Form({
    className: 'login-form',
    onSubmit: formState.handleSubmit,
    children: [emailInput.container, passwordInput.container, loginButton]
  })

  const loginCard = CreateCard(
    {
      cardHeader: 'Iniciar Sesión',
      cardBody: loginForm
    },
    {
      card: { width: '450px' }
    }
  )

  const wrapper = document.createElement('div')
  wrapper.appendChild(loginCard.cardContainer)
  wrapper.appendChild(errorMessage)

  container.appendChild(wrapper)
}
