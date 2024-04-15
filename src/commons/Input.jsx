import React from 'react'

const Input = ({name,labelText,className,backgroundColor,...props}) => {
  backgroundColor = backgroundColor?backgroundColor:"white";
  return (
    <div className='input-wrapper h-full w-full flex items-center justify-center bg-transparent relative'>
        <input 
            {...props}
            className={'input ' + className}
            name={name?name:"default_name"}
        />
        <label 
            style={{backgroundColor: backgroundColor}}
            htmlFor={name?name:"default_name"} 
            className='input-wrapper-label absolute left-[20px] text-xl text-slate-400 px-2'>
            {(labelText)?labelText:""}
        </label>
    </div>
  )
}

export default Input