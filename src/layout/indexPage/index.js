import React, { Component } from 'react';
import './index.css'
import { connect } from 'dva';
import Loading from '@/components/loading';
class IndexPage extends Component {
  constructor(){
    super();
    this.state = {
      info:{
        student_id:'162601000144',
        student_pwd:'Wang1997*'
      }
    }
  }
  keyon = (e,type)=>{
    let { info } = this.state;
    info[type] = e.target.value;
    this.setState({
      info
    })
  }
  login = ()=>{
    let { info } = this.state;
    if(info.student_id&&info.student_pwd){
      this.props.userLogin({...info,history:this.props.history})
    }else{
      alert('请将信息填写完整')
    }
  }
  componentWillReceiveProps(props){
    console.log(props)
  }
  render() {
    const { info } = this.state;
    return (
      <div className="container">
      <Loading />
          <div className="loginMask">
            <div className="inputContent">
            <span className="inputTitle">学号</span>
              <input refs="id"  type="text" onChange={(e)=>{
                this.keyon(e,'student_id');
              }} />
            </div>
            <div className="inputContent">
            <span className="inputTitle">密码</span>
              <input refs="pwd" type="password"  onChange={(e)=>{
                this.keyon(e,'student_pwd');
              }}  />
            </div>
            <div>
              <button className="button" onClick={this.login}>登录</button>
              <button className="button">重置</button>
            </div>
          </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return state
}
const mapDispatchToProps = (dispatch)=>{
  return {
    userLogin(payload){
      dispatch({
        type:'login/save',
        payload
      })
    }
  }
}
export default  connect(mapStateToProps,mapDispatchToProps)(IndexPage)