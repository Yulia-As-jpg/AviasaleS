import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from '../src/components/App/App'
import './index.scss'
import store from './store/store.js'


const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);

