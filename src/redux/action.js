import {PUBLISH_ARTICLE,
        POST_ARTICLE_SUCCESS,
        POST_ARTICLE_FAILED,
        GET_ARTICLE_SUCCESS,
        GET_ARTICLE_FAILED,
         GET_ARTICLE_BYID_SUCCESS,
        GET_ARTICLE_BYID_FAILED} from './types'
import axios from 'axios'
export const publish_article = (articleData)=>{
  
    return dispatch=> {
        dispatch({
            type: PUBLISH_ARTICLE,
            data:articleData
        })
       
    }
}

export const post_article =(articleData)=>async dispatch=>{
      
    const formVal = new FormData()
    formVal.append('title',articleData.title)
    formVal.append('story',articleData.story)
   
    articleData.imgData.map((e,i)=>{
        formVal.append('imagedata'+e.index,e.img_url)

        return null
    })
    formVal.append('textdata',JSON.stringify(articleData.textData))

   const config = {
       headers:{
        'content-Type':'multipart/form-data'
       }
   }

   try{
       const res = await axios.post(`${process.env.REACT_APP_API_URL}/blogapi/`,formVal,config)
     
    
       const blog_id = await res.data.blogId
       const message = await res.data.message
 
       dispatch({
           type : POST_ARTICLE_SUCCESS,
           payload:{blogId:blog_id,message:message}
       })
   }catch(err){
      dispatch({
          type : POST_ARTICLE_FAILED
      })
   }
}

export const get_article= ()=>async dispatch=>{
    try{
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/blogapi/`)
       const data = await res.data
       
       dispatch({
        type : GET_ARTICLE_SUCCESS,
        payload:{article_Data : data}
       
    })
    }catch(err){
       console.log(err);
       dispatch({
        type : GET_ARTICLE_FAILED
    })
    }
}
export const get_article_byid=(id)=>async dispatch=>{
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/blogapi/${id}`)
        const data = await res.data
        
        dispatch({
         type : GET_ARTICLE_BYID_SUCCESS,
         payload:{article_Data : data}
        
     })
     }catch(err){
        console.log(err);
        dispatch({
         type : GET_ARTICLE_BYID_FAILED
     })
     }
}