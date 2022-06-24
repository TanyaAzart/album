import React from 'react'
import Pic from './math.png'

const Picture = ({ album }) => {

    return (<div>
        {album.pics.map(pic =>(
            <div key={pic.name}>
            <p>{pic.title}</p>
            
            <img src = {Pic} style={{"width": "200px"}}/>
            </div>
        ))}
        
        </div>)

}

export default Picture