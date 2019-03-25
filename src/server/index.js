import http from '@/utils';

export const login = (payload)=>{
    return http.post('/student/login',payload)
}

export const getStudentInfo = ()=>{
    return http.get('/student/info')
}

export const getExam = ()=>{
    return http.get('/exam/unstart/jow62g-l4xmin')
}

export const likeExam = () =>{
    return  http.get('/exam/exam/oyvic-jg3t1l')
}

export const submit = (payload) =>{
    payload.start_time = Number(payload.start_time);
    payload.end_time = Number(payload.end_time);
    return http.post('/exam/student',payload)
}