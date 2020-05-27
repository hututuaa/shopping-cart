import React from 'react'
import './index.css'
import {SelectContent} from './select/select.js'
import ProductList from './product/productList'
export class Article extends React.Component{
    render(){
        return(
            <div className="article">
               <SelectContent/>
               <ProductList/>
            </div>
        )
    }
}
