import dva from 'dva'; 
import router from './routers'
import './index.css'; 
import 'antd/dist/antd.css'; 
import models from '@/models';
import loading from 'dva-loading';
const app = dva(); 

app.router(router); 
models(app); 
app.use(loading());
app.start('#root')
