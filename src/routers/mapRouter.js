import React, { Component } from 'react';
import { Route } from 'dva/router';
const mapRouter = (routers)=>{
    return routers.map((item,i)=>{
        return <Route exact={item.exact} key={i} path={ item.path } render={ (match)=>{
            return <item.component  { ...match } routers={ item.routers }></item.component>
        } }></Route>
    })
}

export default mapRouter