import React from 'react'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import App from './App'
// import Checkk from './Checkk'
import Article from './Article'
import {Provider} from 'react-redux'
import store from './redux/store'
import Home from './Home'
import './css/Appp.scss'
import ArticleGet from './ArticleGet'
const Appp = ()=>{
    
 return(   
    <Provider store={store}>
   <Router>
       <Switch>
           <Route exact path='/' component={App} />
           <Route exact path='/home' component={Home} />
           <Route exact path='/articleget/:id' component={ArticleGet}  />
           <Route exact path='/article' component={Article} />
       </Switch>
   </Router>
   </Provider>
 )
}
export default Appp

