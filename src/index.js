import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dva from 'dva';
import select from './model/Select'

// ReactDOM.render(
 
//     <App />,

//   document.getElementById('root')
// );

const app = dva();
app.model(require('./model/Products').default);
// app.model(cart);
app.model(select);
// app.use(createLoading());
app.router(() => <App />);
app.start('#root');