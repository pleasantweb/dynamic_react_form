import {PUBLISH_ARTICLE,
        POST_ARTICLE_SUCCESS,
        POST_ARTICLE_FAILED,
        GET_ARTICLE_SUCCESS,
        GET_ARTICLE_FAILED,
       GET_ARTICLE_BYID_SUCCESS,
    GET_ARTICLE_BYID_FAILED} from './types'

const initialState = {
    isDataSent:null,
    article: {},
    message:'',
    article_data:[],
    article_id_data:[],
    isArticleGet:null
}

const article_reducer = (state=initialState,action)=>{
    console.log(action.type);
    switch(action.type){
        case PUBLISH_ARTICLE : return{
            ...state,
            article : action.data,
            isDataSent:true
        }
        case POST_ARTICLE_SUCCESS: return{
           ...state,
           isDataSent:true,
           message : action.payload.message
        }
        case POST_ARTICLE_FAILED: return{
            ...state,
            isDataSent:true,
            message: 'Something went wrong, Article did not posted'
        }
        case GET_ARTICLE_SUCCESS: return{
            ...state,
            article_data : action.payload.article_Data
        }
        case GET_ARTICLE_FAILED:return{
            ...state
        }
        case GET_ARTICLE_BYID_SUCCESS:return{
            ...state,
            article_id_data : action.payload.article_Data,
            isArticleGet:true
        }
        case GET_ARTICLE_BYID_FAILED :return{
            ...state,
            isArticleGet:false
        }
        default : return state
    }
}
export default article_reducer