import React from 'react';
import './choose-size.css'
import { connect } from 'dva'
class ChooseSize extends React.Component {
    state = {
        flag: false
    };
    select = (e) => {
        let { flag } = this.state;
        const { dispatch } = this.props
        const chooseStyle = e.target.style
        const chooseSize = e.target.innerText;
        console.log(e.target.innerText, "我选择了")
        if (chooseStyle.color !== "black") {
            chooseStyle.background = '#ccc';
            chooseStyle.color = 'black';
            flag = true;

        } else {
            chooseStyle.background = '#1a94bc';
            chooseStyle.color = 'white';
            flag = false;
        }
        dispatch({
            type: 'sortProducts/sort',
            payload: { chooseSize: chooseSize, flag: flag },

        })

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
const mapStateToProps = state => state
export default connect(mapStateToProps)(ChooseSize);