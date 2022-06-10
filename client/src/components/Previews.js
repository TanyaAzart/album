import React, { useState, useEffect } from 'react'

const Previews = (props) => {

    const [pics, setPics ] = useState([])

    useEffect(()=>{
        showPreviews()
    },[pics])   

    const previews = document.getElementById('previews')     
    const fileInput = document.querySelector('input[type="file"]')    

    const handleFiles = ()=> {
        
        const files = fileInput.files 

        const selectedFiles = []
    
        Object.keys(files).map(key => selectedFiles.push(files[key])) 
       
        setPics(selectedFiles)
       
    }     

    const showPreviews =()=>{ 
        if(previews) {
            while(previews.hasChildNodes()){
                previews.removeChild(previews.firstChild)
            }
        }
        for (let i=0; i< pics.length; i++){
            
            const selectedImage = pics[i];
            
            imagePreview(selectedImage)                     
        }        
    }

    const imagePreview = (pic)=> {  
        const preview = document.createElement('div')

        const image = document.createElement('img')
        image.setAttribute('src', '')
        image.setAttribute('width', '100px')

        const button = document.createElement('button')
        button.innerHTML='Remove'
        button.addEventListener('click', ()=>removeFile(pic))

        preview.appendChild(image) 
        preview.appendChild(button)
        previews.appendChild(preview)       
                    
        const reader = new FileReader();   
       
        reader.addEventListener('load', ()=>(
            image.src = reader.result            
        ))
        reader.readAsDataURL(pic)
    }

    const removeFile = (file)=> {
        const update = pics.filter(pic=> pic.name !==file.name)
        setPics(update)
    }    

    const addPictures = (pics)=> {
        props.onAddPictures(pics)
        while(previews.hasChildNodes()){
            previews.removeChild(previews.firstChild)
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
            <button onClick={()=> addPictures(pics)}>Add pictures</button>          
            </div>
    )
}

export default Previews

