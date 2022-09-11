import React from 'react'
import '../../src/index.css'

function PageTitle({children, ...props}) {
  return (
    <div className='container'>
          <h1 className='title' {...props} >{children}</h1>
    </div>
  )
}

export default PageTitle