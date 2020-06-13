import React from 'react';
import './App.css';
import { Aside } from './pages/aside/index.js'
import { Article } from './pages/article/index.js'
import Header from './pages/header/index.js'
import 'antd/dist/antd.css';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header className="header">
        </Header>
        <div className="content">
          <Aside className="aside-content">
          </Aside>
          <Article className="article-content">
          </Article>
        </div>
      </div>
    );
  }
}

export default App;
