import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app';
import './index.css';
import {Provider} from "react-redux";
import store from './services/store';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
    <Router>
          <App />
    </Router>
        </DndProvider>
      </Provider>
  </StrictMode>,
)
