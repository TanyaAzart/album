import React from 'react'

const play = ()=> {

    const handleFiles = ()=> {
        const fileInput = document.querySelector('input[type="file"]')  

        const files = fileInput.files 
    
        const reader = new FileReader();   
           
        reader.addEventListener('load', ()=>(
           
            console.log(files[0].name, reader.result)   
        ))
        
        reader.readAsDataURL(files[0])
    }

    

    return (<div>
        <input  type='file'  multiple onChange={handleFiles}/>
        </div>)
}

export default play

