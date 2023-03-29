import React from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'
import { Providers } from './Providers'
import './index.css'
import { setupStore } from './store/rootConfig'

export const store = setupStore()
const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <Providers store={store}>
      <App />
    </Providers>
  </React.StrictMode>,
)
