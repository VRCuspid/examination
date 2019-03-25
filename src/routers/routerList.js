import indexPage from '@/layout/indexPage';
import startExam from '@/layout/startExam';
import eachQuestion from '@/layout/eachQuestion';
const routers = [
    {
        path:'/',
        exact:true,
        component:indexPage
    },
    {
        path:'/startExam',
        component:startExam,
        routers:[
            {
                path:'/startExam/eachQuestion',
                component:eachQuestion
            }
        ]
    }
]

export default routers