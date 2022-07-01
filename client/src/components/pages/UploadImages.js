import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'

const UploadImages = () => {

    const albumContext = useContext(AlbumContext)
    const { albums, addPictures } = albumContext

    const navigate = useNavigate()
    const { id } = useParams()

    const album = albums.find(album=> album._id=== id)

    const [pics, setPics ] = useState([] )

    const previews = document.getElementById('previews')    
    
    
    useEffect(()=>{
        showPreviews()
    },[pics])     


    const handleFiles = ()=> {

        const fileInput = document.querySelector('input[type="file"]')  
        
        const files = fileInput.files 

        const names = []

        album.pics.forEach(pic=>
            names.push(pic.name) )

        const updatedPics = []

        for (let i=0; i < files.length; i++) {

            const reader = new FileReader();   
       
            reader.addEventListener('load', ()=>{
                
                const pic = {
                    name: files[i].name,
                    title: '',
                    src: reader.result
                }
            
                if(!names.includes(pic.name)){
                    updatedPics.push(pic)
                }            

                setPics(updatedPics)               
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

        const image = document.createElement('img')
        image.setAttribute('src', pic.src)
        image.setAttribute('width', '100px')

        const input = document.createElement('input')
        input.setAttribute('placeholder', 'Enter title')
        input.setAttribute('value', pic.title)
        input.addEventListener('change', (e)=>onAddTitle(e, pic))

        const removeButton = document.createElement('button')
        removeButton.innerHTML='Remove'
        removeButton.addEventListener('click', ()=>removePicture(pic))

        preview.appendChild(image) 
        preview.appendChild(input) 
        preview.appendChild(removeButton)
        previews.appendChild(preview)       

    }

    const onAddTitle = (e, pic) => {        
        const updatedPics = pics.filter(item=> item.name !==pic.name)
        const updatedPic = pics.find(item=> item.name ===pic.name)       
      
        updatedPic.title = e.target.value

        updatedPics.push(updatedPic)   
    
        setPics(updatedPics.sort((pic1,pic2)=>{
            const name1 = pic1.name
            const name2 = pic2.name
            if (name1 < name2) {
                return -1;
              }
              else {
                return 1;
              }
        }))
    }

    const removePicture = (pic)=> {

        setPics(pics.filter(item=> item.name !==pic.name))

    }    

    
    const onAddPictures = (e)=> {
        e.preventDefault()
        
        if(pics.length===0){
            alert('Choose a picture!')
        } else {  

            addPictures(id, pics)
            navigate('/admin')
        }              
    }    

    return (
        <div>
        <h3>Add fotos to your album</h3>
            <input 
                type='file'
                multiple
                onChange={handleFiles}
            /> 
            <div id="previews">
            </div> 
            <button onClick={onAddPictures}>Add pictures</button>                    
        </div>
    )
}

export default UploadImages

