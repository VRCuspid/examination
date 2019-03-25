import React, { Component } from 'react';
import ReactCodeMirror from 'react-codemirror';
import { connect } from 'dva';
import './index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/seti.css';
import "codemirror/mode/sql/sql";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/sql-hint.js";
import "codemirror/theme/blackboard.css";
// import md from 'markdown-it';
class EachQusetion extends Component {
  state = {
    student_answer:'',
    timer:null
  }
  goNext = ()=>{
    let { activeIndex } = this.props;

    if(activeIndex == this.props.length-1 ){
      return;
    }
    this.props.typingTest({
      judge:1,
    })
   
  }
  setAns = (e)=>{
    let { timer } = this.state;
    clearTimeout(timer);
    timer = setTimeout(()=>{
      this.setState({
        student_answer:e
      });
      this.props.setTheValue({
        student_answer:e,
        activeIndex:this.props.activeIndex
      })
    },1000)
    this.setState({
      timer
    })
    
  }
  componentWillReceiveProps(props,state){
    let defaultValue = props.question.student_answer;
    this.refs.editor.getCodeMirror().setValue(defaultValue||'');
  }
  shouldComponentUpdate(props,state){
    if(state.student_answer===this.state.student_answer&&props===this.props){
      return false
    }
    return true
  }
  goBack=()=>{
    let { activeIndex } = this.props;
    if(activeIndex == 0 ){
      return;
    }
    this.props.typingTest({
      judge:-1,
    });
    
  }
  submit=()=>{
    let { activeIndex } = this.props;
    if(activeIndex == this.props.length-1 ){
      this.props.submitData()
      return;
    }
  }
  render() {
    let { question={},activeIndex } = this.props;
    return (
      <div className="eachQusetion">
          <div style={{flex:1,display:'flex',paddingBottom:'20px'}}>
          <div className="questionSem"> 
            <div className="questionIndexTitle">
             <div style={{paddingRight:'20px'}}>第{activeIndex*1+1}题</div>
             <div> { question.title }</div>
            </div>
            <div className="questionInfo">
              { question.questions_stem }
            </div>
          </div>
          <div className="questionAns">
            <div>{question.questions_type_text}</div>
            <div className="questionAnsContent" >
              <ReactCodeMirror
              ref="editor"
              onChange={this.setAns}
              options={{
                  lineNumbers: true,                     //显示行号
                  mode: {name: "text/html"},          //定义mode
                  extraKeys: {"Ctrl": "autocomplete"},   //自动提示配置
                  theme: "blackboard"    
              }} />
            </div>
          </div>
          
          </div>
          <div className="examFooter">
              <button className={this.props.activeIndex==0?'button button-disable':'button'} onClick={this.goBack}>上一题</button>
              <button className={this.props.activeIndex==this.props.length-1?'button button-disable':'button'} onClick={this.goNext}>下一题</button>
              <button className={this.props.activeIndex!=this.props.length-1?'button button-disable':'button'} onClick={this.submit} >提交</button>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  let arr = state.login.list.questions&&state.login.list.questions;
  let { activeIndex } = state.login;
  let length = arr&&arr.length;
  return {
    question: arr&&arr[activeIndex],
    activeIndex,
    defaultValue:arr&&arr[activeIndex]&&arr[activeIndex].student_answer,
    length
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    typingTest(payload){
      dispatch({
        type:'login/changeTest',
        payload
      })
    },
    setTheValue(payload){
      dispatch({
        type:'login/setValue',
        payload
      })
    },
    submitData(){
      dispatch({type:'login/submit'})
    }
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(EachQusetion)
