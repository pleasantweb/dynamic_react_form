import React,{useEffect} from 'react'
import {get_article} from './redux/action'
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {RiLeafFill} from 'react-icons/ri'
 function Home({article_data,get_article}) {
    useEffect(()=>{
        get_article()
        
    },[get_article])
    return (
        <div className='container'>
            <nav>
        <button className='logo'>V</button>
        <div className="siteTitle">
        <div className='bloglink'> 
          <RiLeafFill />
          <h1>blog</h1>
          </div>
        </div>  
        <Link to='/'>
        <button className='publish'>Write</button>
        </Link>
        
      </nav> 
      <div className="articleShow">
          {article_data ? (
              article_data.map((e,i)=>{
                 
                  return(
                      <div key={i} className="articleBox">
                          <div className="details">
                              <Link className='titleLink' to={'/articleget/'+e.id}>
                              <h1>{e.title}</h1>
                              </Link>
                          
                      <h3>{e.story}</h3>
                          </div>
                          <div className="date">
                              {e.date}
                          </div>
                      
                      </div>
                  )
              })
          ):('')}
      </div>
           
        </div>
    )
}
const mapStateToProps = state=>{
    
    return{
        article_data : state.article_data
    }

}
export default withRouter(connect(mapStateToProps,{get_article})(Home))

