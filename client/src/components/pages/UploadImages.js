import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'
import AlertContext from '../../context/alert/alertContext'
import Modal from '../layouts/Modal'
import { v4 as uuidv4 } from 'uuid'

const UploadImages = () => {

    const albumContext = useContext(AlbumContext)
    const { albums, addPictures } = albumContext

    const alertContext = useContext(AlertContext)
    const { alert, setAlert, removeAlert } = alertContext

    const navigate = useNavigate()
    const { id } = useParams()
    const inputRef = useRef(null)

    const album = albums.find(album=> album._id=== id)

    const [ pics, setPics ] = useState([] )

    const previews = document.getElementById('previews')    
    
    
    useEffect(()=>{
        showPreviews()
    },[pics])     


    const handleFiles = ()=> {

        const fileInput = document.querySelector('input[type="file"]')  
        
        const files = fileInput.files 

        const picSet = []

        for (let i=0; i < files.length; i++) {

            const reader = new FileReader();   
       
            reader.addEventListener('load', ()=>{
                
                const pic = {
                    name: uuidv4(),
                    title: '',
                    src: reader.result
                }

                picSet.push(pic)   
                setPics(picSet)           
            })
            
            reader.readAsDataURL(files[i])            
        }        
    }     

    const showPreviews =()=>{ 
        
        if(previews) {
            while(previews.hasChildNodes()){
                previews.removeChild(previews.firstChild)
            }
        }
        for (let i=0; i< pics.length; i++){
            
            imagePreview(pics[i])                     
        }        
    }

    const imagePreview = (pic)=> {  

        const preview = document.createElement('div')
        const div = document.createElement('div')
        div.setAttribute('class', 'ui input')

        const image = document.createElement('img')
        image.setAttribute('src', pic.src)
        image.setAttribute('class', 'ui middle aligned small bordered image')

        const input = document.createElement('input')
        input.setAttribute('placeholder', 'Enter title')
        input.setAttribute('value', pic.title)
        input.addEventListener('change', (e)=>onAddTitle(e, pic))

        const removeButton = document.createElement('button')
        removeButton.setAttribute('class', 'ui basic primary button')
        removeButton.innerHTML='Remove'
        removeButton.addEventListener('click', ()=>removePicture(pic))

        const divider = document.createElement('div')
        divider.setAttribute('class', 'ui divider')

        preview.appendChild(image) 
        preview.appendChild(div)
        div.appendChild(input) 
        preview.appendChild(removeButton)
        preview.appendChild(divider)
        previews.appendChild(preview)       

    }

    const onAddTitle = (e, pic) => {        
        const updatedPics = pics.filter(item=> item.name !==pic.name)
        const updatedPic = pics.find(item=> item.name ===pic.name)       
      
        updatedPic.title = e.target.value

        updatedPics.push(updatedPic)   
    
        // setPics(updatedPics.sort((pic1,pic2)=>{
        //     const name1 = pic1.name
        //     const name2 = pic2.name
        //     if (name1 < name2) {
        //         return -1;
        //       }
        //       else {
        //         return 1;
        //       }
        // }))
    }

    const removePicture = (pic)=> {
        setPics(pics.filter(item=> item.name !==pic.name))
    }    

    
    const onAddPictures = (e)=> {
        e.preventDefault()
        
        if(pics.length===0){
           setAlert({
            alert: true,
            text: 'Choose a picture!',
            yesButton: 'OK'
           })
        } else {  
            addPictures(id, pics)
            setAlert({
                alert: true,
                text:'Pictures added!',
                yesButton:'OK'
            })
        }              
    }   
    
    const handleAlert =()=> {
        removeAlert()
        navigate('/admin')
    }

    return (
        <div className='ui center aligned container'>
        { alert && <Modal handleAlert={handleAlert}/>}
        <h3 className='ui blue header'>Add fotos to your album</h3>
            <input 
                type='file'
                style={{display: 'none'}}
                ref={inputRef}
                multiple
                onChange={handleFiles}
            /> 
            <button className='ui basic primary button' onClick={()=>inputRef.current.click()}>Choose Files</button>
            <div id="previews">
            </div> 
            { pics.length>0 &&  (<div style={{'paddingBottom': '20px'}}>
                <button className='ui primary button' onClick={onAddPictures}>Add pictures</button> 
                <button className='ui button' onClick={()=>navigate('/admin')}>Cancel</button>
            </div>)}                   
        </div>
    )
}

export default UploadImages

