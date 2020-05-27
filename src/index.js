import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dva from 'dva';
// ReactDOM.render(
 
//     <App />,

//   document.getElementById('root')
// );

const app = dva();
// app.model(products);
// app.model(cart);
// app.model(select);
// app.use(createLoading());
app.router(() => <App />);
app.start('#root');