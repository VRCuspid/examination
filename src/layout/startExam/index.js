import React, { Component } from 'react'
import './index.css'
import LastTime from '@/components/lastTime';
import EachQuestion from '@/layout/eachQuestion';
import { connect } from 'dva';
import  Loading  from '@/components/loading'
class StartExam extends Component {
  constructor(){
      super()
      this.state = {
          data:{},
          cut:'',
          cutter:0,
          flag: true
      }
  }
  componentDidMount(){
      this.props.getStudentInfo();
  }
  render() {
    let { list } = this.props.login;
    return (
      <div className="startExamContent">
        <div className="examTitle">
     
          <div>
            {list&&list.title}
          </div>
          <LastTime time={list&&list.end_time?list.end_time-list.start_time:4500000}  />
        </div>
        <div className="examBody">
          <EachQuestion />
        </div>
        <Loading />
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return state;
}
const mapDispatchToProps = (dispatch)=>{
  return {
    getStudentInfo(payload){
      dispatch({
        type:'login/getInfo'
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StartExam)