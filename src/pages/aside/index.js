import React from 'react';
import './index.css'
import { ChooseSize } from './chooseSize/choose-size'
export class Aside extends React.Component {

  render() {
    return (
      <div className="aside">
        <ChooseSize />
      </div>
    );
  }
}
