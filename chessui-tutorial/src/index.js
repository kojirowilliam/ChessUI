import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);

root.render(
<React.StrictMode>
  <DndProvider backend={HTML5Backend}>
    <App/>
  </DndProvider>
</React.StrictMode>
  )
