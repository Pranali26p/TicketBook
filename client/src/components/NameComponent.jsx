import React from 'react'
import Card from './Card'

function NameComponent(props) {


  return (
    <Card 
    style={{
      display:'flex',
      paddingBottom:'10px',
      paddingTop:'2px',
      border: '2px solid black',
      wordWrap:'normal' }} >
       <div id={props.item} className='child' style={{padding:"1px 5px",border:'' ,borderRadius:"5px"}}  >
       {props.item}
       </div>
        
       
    </Card>
  )
}

export default NameComponent;