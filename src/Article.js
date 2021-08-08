import React from 'react'
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'
import {RiLeafFill} from 'react-icons/ri'
function Article(props) {

    let data= props.dataComing
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
        <>
        { props.isArticlePublished ? (

            <div className='container'>     
            <nav>
            <button className='logo'>V</button>
            
            <div className="siteTitle">
       <RiLeafFill />
       <h1>blog</h1>
     </div>

       <button className='publish'>LogOut</button>
            </nav> 
            <div className="articleDiv">      
                <div className="titleDiv">
                    <h1>{data.title}</h1>
                </div>

                <div className="descriptionDiv">
                <h4>{data.story}</h4>
                </div>
                <div className="moreContent">
                {data.moreData.map((e)=>{
                    
                    return(
                    e.type === 'image' ? (   
                            <div key={e.key} className="imgdiv">
                            <img
                               className='image'
                               src={e.img_url} 
                               alt="" 
                               onLoad={imageload}/>
                        </div>
                        
                    )  : (
                        <div key={e.key} className="textDiv">
                            <p>{e.textdata}</p>
                        </div>
                    ))
                   
                })}
                </div>
                
                </div>
                <div className="footer"></div>
                </div>

        ) : (<h1>data not coming</h1>) }

        
        
        </>
    )
}
const mapStateToProps=state=>{
   
 return{   isArticlePublished : state.isArticlePublished,
           dataComing : state.article}
}
export default withRouter(connect(mapStateToProps,null)(Article))