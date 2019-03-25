import React, { Component } from 'react'
import { Router, Switch, Route} from 'dva/router'
import mapRouter from './mapRouter'
import routers from './routerList'
const RouterView = ({history})=>{
    return <Router history={history}>
        <Switch>
            {
                mapRouter(routers)
            }
        </Switch>
    </Router>
}

export default RouterView