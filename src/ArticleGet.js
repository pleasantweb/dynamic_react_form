import React,{useState,useEffect} from 'react'
import {RiLeafFill} from 'react-icons/ri'
import {get_article_byid} from './redux/action'
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'

 function ArticleGet({ isArticleGet,match,article_data,get_article_byid}) {
     const [obj,setObj]= useState([])
    useEffect(()=>{
        get_article_byid(match.params.id)
     
    },[match.params.id,get_article_byid])

    useEffect(()=>{
        let demoarr = []
        try{
        article_data.blog_images.map(e=>{
          
            demoarr[e.index]={src: e.img_url,
                type:'image'}
            // setObj(prev=>({
            //  ...prev,
            //  [e.index]:{src: e.img_url,
            //             type:'image'}
            // }) )
             
            return null
         })
         article_data.blog_texts.map(e=>{
           
             demoarr[e.index]=
                {textdata:e.textdata,
                    type:'text'}
                //  setObj(prev=>({
            //      ...prev,
            //      [e.index]:{textdata:e.textdata,
            //                    type:'text'}
                 
            //  }))
             
             return null
         })
         setObj(
            demoarr
         )
        }catch(err){
            console.log(err);
        }
    },[article_data])

    const imageload=(e)=>{
        let width = e.target.naturalWidth 
        let height = e.target.naturalHeight 
     
        if(width/height <1){
          
            e.target.classList.add('vertical')
        }else{
            e.target.classList.add('horizontal')
        }
      }

  
    return (
        <div className='container'>
            <nav>
        <button className='logo'>V</button>
        <div className="siteTitle">
            <Link to='/home' className='bloglink'> 
            <RiLeafFill />
          <h1>blog</h1>
            </Link>
          
        </div>  
        <button className='publish'>LogOut</button>
      </nav> 

      <div className="articleDiv">      
                <div className="titleDiv">
                    <h1>{isArticleGet? article_data.title:('')}</h1>
                </div>

                <div className="descriptionDiv">
                <h4>{isArticleGet? article_data.story:('')}</h4>
                </div>
                <div className="moreContent">
                {obj.map((e,i)=>{
                    return(
                    e.type === 'image' ? (
                        <div key={i} className="imgdiv">
                          <img 
                           src={e.src} 
                           alt="" 
                           onLoad={imageload}
                           className='image' />
                            </div> 
                    ):(<div key={i} className="textDiv">
                        <p>{e.textdata}</p>
                        </div>)
                    )
                })}
                
                </div>
                
                </div>
                <div className="footer"></div>
                </div>
       
    )
}
const mapStateToProps =state=>{
    console.log(state.article_id_data);
    return{
        isArticleGet:state.isArticleGet,
        article_data: state.article_id_data
    }
}
export default withRouter(connect(mapStateToProps,{get_article_byid})(ArticleGet))