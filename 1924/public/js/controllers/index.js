import { setupHomePage } from './home.js'
import { setupLoginPage } from './login.js'

// Centralizamos los controladores en un objeto
export const controllers = {
  '/about': setupHomePage,
  '/login': setupLoginPage
}
