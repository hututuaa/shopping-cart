import React from 'react';
import './choose-size.css'
export class ChooseSize extends React.Component {
    chooseSize=async()=>{

    }
    render() {
        return (
            <div className="sizeBox">
                <h1>Sizes:</h1>
                <ul >
                    <li onClick={this.select}>XS</li>
                    <li onClick={this.select}>S</li>
                    <li onClick={this.select}>M</li>
                    <li onClick={this.select}>ML</li>
                    <li onClick={this.select}>L</li>
                    <li onClick={this.select}>XL</li>
                    <li onClick={this.select}>XXL</li>
                </ul>
            </div>
        )
    }
}