import React,{useRef,useState,useCallback} from 'react'
import './css/Appp.scss'
import {BsPlusCircle,BsChevronBarExpand} from 'react-icons/bs'
import {IoIosArrowDropright} from 'react-icons/io'
import {IoRemoveCircle} from 'react-icons/io5'
import {MdPermMedia} from 'react-icons/md'
import {GrTextAlignLeft} from 'react-icons/gr'
import { Link, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {post_article} from './redux/action'
import {RiLeafFill} from 'react-icons/ri'
// import ReactTooltip from 'react-tooltip';
const App=({isDataSent,post_article,message,history})=>{
 
  const [pText,setPText] = useState({
    title:'',
    story:'',
    imgData: [],
    textData:{}
    // moreData:[]
  })
 
  const [backspacee,setBackspacee] = useState(0)
  const [moreElements,setMoreElements] = useState([])
  const [fileInputKey,setFileInputKey] = useState('')
  const titleSvgRef = useRef()
  const descSvgRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()
  const moreWritingDiv = useRef()
 

// useEffect(()=>{
//   //  console.log(moreElements);
//    console.log(pText);
//   //  console.log(checkref);
//   // console.log(demoP);
//   // console.log(backspacee);
// },[pText])

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
                       // Title story focus blur
 const onTitleBlur =()=>{
     titleSvgRef.current.classList.remove('showSvg')

  }
  const onTitleFocus=()=>{
    titleSvgRef.current.classList.add('showSvg')
  }
const onDescFocus=()=>{
  descSvgRef.current.classList.add('showSvg')

}
const onDescBlur =()=>{
  descSvgRef.current.classList.remove('showSvg')
}
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
             // option button show hide
const optionDiv = useRef()
  const hidebuttons = useRef()

  const expendOptions =()=>{
 
    hidebuttons.current.classList.toggle('openoptions')
    optionDiv.current.classList.toggle('openoptions')
  }
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
                   // title story code
  const onInputPressEnter =(e)=>{
 
    setPText({
      ...pText,
      title:titleRef.current.value
    })
    if(e.keyCode === 13 && titleRef.current.value !== ''){
     descRef.current.focus()
     
    }
  }
  const onDescInputPressEnter = e=>{
    setPText({
      ...pText,
      story:descRef.current.value
    })
   
  }
///////////////////////////////////////////////////////////////////////////
          // p Tag writing code
const optionInpRef = useCallback((e)=>{
    if(e){
      e.focus()
      e.classList.add('itsFocus')  
    }
},[])

const optionPBlur=(e)=>{ 
  if(e.target.classList.contains('itsFocus')){
  e.target.classList.remove('itsFocus')
  }
}
const optionPFocus =(e)=>{ 
  if(!e.target.classList.contains('itsFocus')){
  e.target.classList.add('itsFocus')
  }
}
const optionPKeyPress=(e,j)=>{
  if(e.target.innerText === '' && e.keyCode === 8){
    setBackspacee(prev=>prev+2)
    if(backspacee === 2){
      const oldData = [...moreElements]
      let newData =  oldData.filter(k=>k.key !== j)
      setMoreElements(prev=>newData)
    
    let newState = [...pText.textData]
    newState.splice(newState.findIndex(e=>e.key === j),1)
    
    setPText(prev=>({
        ...pText,
        textData:newState
      }))

      setBackspacee(prev=>0)
     
    }
  }   
}
const pTextChange=(e,i,j)=>{

  let newMoreData = {...pText.textData}
  // newMoreData[] = {textdata: e.target.innerText,
  //                   key:j,
  //                   index:i,
  //                   type:'text'}
  console.log(e.target.getAttribute('name'));
  newMoreData[e.target.getAttribute('name')] = {
    textdata: e.target.innerText,
                    key:j,
                    index:i,
                    type:'text'
  }
  
//  console.log(newMoreData);
 
  setPText(prev=>({
    ...pText,
    textData:
      newMoreData
  })) 
   
  
}
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
            // media option code

const onTextOptionClick =()=>{ 
  let unique = Date.now().toString(36) + Math.random().toString(36).substr(2)                              
  let inputArr = []
  inputArr.push({
   type:'text',
   key:unique
 })
 
  setMoreElements(prev=>(
    [...prev,
    inputArr[0] ]
    ))
   
  hidebuttons.current.classList.remove('openoptions')
  optionDiv.current.classList.remove('openoptions') 
}
//////////////////////////////////////////////////////////////////////

const onOptionFileChange=e=>{
  let unique = Date.now().toString(36) + Math.random().toString(36).substr(2)
  let src
  let inputArr = []
  // console.log(moreElements.length);
  if(e.target.files.length >0){
    src=URL.createObjectURL(e.target.files[0])
  
  // console.log(e.target.files[0]);

    let newMoreData =[...pText.imgData]
    newMoreData.push({img_url:e.target.files[0],
                       type:'image',
                       index:moreElements.length,
                       fileName:e.target.files[0].name,
                      key:unique,
                    })
    setPText(prev=>({
      ...pText,
      imgData:newMoreData
       
    }))

    inputArr.push(  
      {
        type:'figure',
        key:  unique,
        src:src
      }
    )
    setMoreElements(prev=>(
      [...prev,
      inputArr[0] ]
      ))
    
  
  }else{
    src =''
      
}
    hidebuttons.current.classList.remove('openoptions')
    optionDiv.current.classList.remove('openoptions')
    setFileInputKey(unique + 'vish')
}
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
                   // remove image code

const removeImg=(j)=>{
  const oldData = [...moreElements]
  let newData =  oldData.filter(k=>k.key !== j)
  setMoreElements(prev=>newData)

  let newState = [...pText.imgData]
   newState.splice(newState.findIndex(e=>e.key === j),1)

  setPText(prev=>({
    ...pText,
    imgData:newState
  }))
} 
////////////////////////////////////////////////////////////////////////
const checkimgLoad=(e)=>{ 
   let orignalWidth = e.target.naturalWidth
   let orignalHeight = e.target.naturalHeight
   if(orignalWidth/orignalHeight < 1){
     e.target.classList.add('verticleLong') 
   }else{
    e.target.classList.add('horizontalLong')
   }
}

const checkCopy=(e,i,j)=>{
  e.preventDefault()
  let textt = e.clipboardData.getData('text/plain')
  e.target.innerText = textt
  let newMoreData = [...pText.textData]
  newMoreData[i] = {textdata: textt,
                    key:j,
                    type:'text'}
  setPText(prev=>({
    ...pText,
    textData:
      newMoreData
  })) 
 
}

const publishArticle = ()=>{
  post_article(pText)
  if(isDataSent){  
    <Redirect to='/home' />
  }
}

///////////////////////////////////////////////////////////////////////
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
        <button  onClick={publishArticle} className='publish'>Publish</button>
      </nav> 

      <div className="formDiv">
        <form action=""  id='formId'>      
          <div className="titleDiv">
            <div ref={titleSvgRef} className="titleIcon">
              <BsPlusCircle  className='titleSvg' />
            </div>
            <input spellCheck='false' autoFocus ref={titleRef} onKeyUp={onInputPressEnter} onFocus={onTitleFocus} onBlur={onTitleBlur} className='titleinp' type="text"  placeholder='Title' />
          </div>

          <div className="descriptionDiv">
            <div ref={descSvgRef} className="descIcon">
              <BsPlusCircle />
            </div>
            <input spellCheck='false' ref={descRef} onKeyUp={onDescInputPressEnter} onFocus={onDescFocus} onBlur={onDescBlur} placeholder='Tell your story' className='descripton' type="text" />
          </div>

          <div ref={moreWritingDiv} className="moreWriting">        
            {
              moreElements.map((e,i)=>(           
                e.type === 'figure' ? (
                  <div key={e.key} className="newInputDiv">
                    <div className="imgDiv">
                      <div className="removeBtn">
                      
                        <IoRemoveCircle
                       
  
                          type='button'
                          onClick={()=>removeImg(e.key)}
                          className='removeImg' />
                      </div>
                      <figure>
                        <img onLoad={checkimgLoad} src={e.src} alt="" />
                        <figcaption> 
                          <input  
                            type="text" 
                            placeholder='Write CaptoinFor image'/>
                        </figcaption>
                      </figure>
                    </div>
                      <BsPlusCircle  />
                     
                  </div>
            )  :(
                      
                  <div key={e.key} className="newInputDiv">
                    <p 
                      onInput={l=>pTextChange(l,i,e.key)} 
                      onKeyUp={l=>optionPKeyPress(l,e.key)} 
                      onFocus={optionPFocus} 
                      onBlur={optionPBlur} 
                      ref={optionInpRef} 
                      className='yo' 
                      contentEditable='true'  
                      suppressContentEditableWarning={true} 
                      name={'textdata'+i}  
                      onPaste={l=>checkCopy(l,i,e.key)}
                    ></p>
                      <BsPlusCircle  />              
                  </div>
                )    
            )
         )       
        }
      </div>

          <div className="optionsDiv">
            <div ref={optionDiv} className="options">
              <div className="showBtn">
               
              <IoIosArrowDropright  onClick={expendOptions} />
              </div>
              <div ref={hidebuttons} className="hiddenButtons">
             
              <GrTextAlignLeft   onClick={onTextOptionClick} />

              <input key={fileInputKey} onChange={onOptionFileChange} type="file" style={{display:'none'}} name="" id="upload-photo" />
              <label htmlFor="upload-photo">
             
              <MdPermMedia  />
              </label>
             
              <BsChevronBarExpand  className='preCodeSymbol' />
              </div>
              
            </div>
          </div>
          
      </form>
              
    </div>
    <div className="footer"></div>
           
  </div>
 
  )
}
const mapStateToProps = state=>{
 
 return{
  isDataSent : state.isDataSent,
  message : state.message
 }
}

// export default App
export default withRouter(connect(mapStateToProps,{post_article})(App))