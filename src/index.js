import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dva from 'dva';
// import Select from './model/select'
import Cart from './model/cart'
// ReactDOM.render(
 
//     <App />,

//   document.getElementById('root')
// );

const app = dva();
app.model(require('./model/products').default);
app.model(Cart);
// app.model(Select);
// app.use(createLoading());
app.router(() => <App />);
app.start('#root');