import React from 'react'

const NavHeading = ({headingVal}: {headingVal: string}) => {
  return (
    <>
        <span className='ml-2 text-lg font-semibold'>{headingVal}</span>
    </>
  )
}

export default NavHeading