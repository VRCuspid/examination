import React, { Component } from 'react'
import timer from '@/utils/time'
export default class LastTime extends Component {
    state = {
        cut:'',
        time:'',
        timeOut:null,
        timeInter:null,
        flag:true
    }
    componentWillReceiveProps(props,old){
        let time = localStorage.getItem('cur')||props.time;
        this.changeData(time)
    }
    componentWillUnmount(){
      let { timeInter,timeOut } = this.state;
      clearInterval(timeInter);
      clearTimeout(timeOut);
      localStorage.setItem('cur',this.state.cut);
    }
    changeData = (cut) =>{
      if(this.state.flag){
        let { time,timeInter } = this.state;
        timeInter = setInterval(()=>{
          time = timer.toLast(cut)
          cut-=1000;
          this.setState({cut,time});
        },1000);
        
        this.setState({timeInter,flag: false})
      }
     
    }
  render() {
    return (
      <div>
        剩余时间 { this.state.time }
      </div>
    )
  }
}

