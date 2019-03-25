import { login,getStudentInfo,getExam,likeExam,submit } from '@/server';
import Cookie from '@/utils/utils';
let ls = localStorage;
export default {
    namespace:'login', 
    state: {
        userInfo: {},
        list:{},
        testingExam:{},
        activeIndex:ls.getItem('activeIndex')||0
    }, 
    reducers: {
        token(state, payload) {
            return state
        },
        getList(state,{payload}){
            console.log(payload)
            return {
                ...state,
                list:payload
            }
        },
        changeTest(state,{payload}){
            let { activeIndex } = state;
            activeIndex=activeIndex*1+payload.judge;
            ls.setItem('activeIndex',activeIndex)
            return {...state,activeIndex};
        },
        setValue(state,{payload}){
            let { list } = state;
            list.questions[payload.activeIndex].student_answer = payload.student_answer;
            return state
        },
        submit(state,{}){
            let { list } = state;
            let obj = {
                exam_exam_id:list.exam_exam_id,
                questions: list.questions,
                start_time: list.start_time,
                end_time: list.end_time
            }
           submit(obj).then(res=>{
                if(res.code==1){
                    alert(res.msg)
                }
            })

            return state;
        }
    }, 
    effects: { 
        *save( {payload},  {put, call}) {
            try{
                let res = yield call(login,payload);
                console.log(res)
                if(res.code===1){
                    Cookie.set('student_token',res.token);
                    payload.history.push('/startExam')
                }else{
                    console.log(res.msg)
                    alert(res.msg.message||res.msg||'something wrong with your compouter please try later')
                }
            } catch(err){
                alert(err)
            }
        },
        *getInfo({},{put,call}){
            let res = yield call(likeExam);
            console.log(res)
            yield put({type:'getList',payload:res.data})
        },
    }
   
}