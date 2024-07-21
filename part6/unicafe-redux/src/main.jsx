import ReactDOM from 'react-dom/client'
import store from './store.js'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
const render = (component) => root.render(component)
store.subscribe(() => render(<App />))

render(<App />)
