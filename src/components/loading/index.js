import React, { Component } from 'react'
import './index.css'
import { connect } from 'dva';
class Loading extends Component {

  render() {
    let flag= this.props.loading.global;
    console.log(flag)
        return flag?  <div  className="loadingMask" >
        <div className="loadingIcon">
           {
               [1,2,3,4,5,6,7].map((item,i)=>{
                   return <div className={'item-'+i+' item'} key={i}></div>
               })
           }
        </div>
      </div>:''
  }
}

export default connect((state)=>{
    return state
})(Loading)
