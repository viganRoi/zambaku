import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './utils/store'
import './utils/i18n';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
