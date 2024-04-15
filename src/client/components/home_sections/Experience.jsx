import React from 'react'

const Experience = () => {
  return (
    <div className=' flex flex-col flex-wrap md:flex-row gap-8 py-10 md:py-2 md:gap-2 items-center justify-around bg-black text-white min-h-[30vh] w-screen overflow-hidden'>
        <ExperienceItem stat={"4.7/5"} name={"Reviews"}/>
        <ExperienceItem stat={"200+"} name={"happy Customers"}/>
        <ExperienceItem stat={"6+ yrs"} name={"of Experience"}/>
        <ExperienceItem stat={"1K +"} name={"Photos & Videos Taken"}/>
        <ExperienceItem stat={"500+"} name={"Stories Captured"}/>
        
    </div>
  )
}

export default Experience



const ExperienceItem = ({stat , name}) => {
  return (
    <div className="p-2 flex-center flex-col">
        <h1 className='text-3xl font-bold'>
            {stat}
        </h1>
        <h1 className='text-xl trxt-center font-bold'>
            {name}
        </h1>
    </div>
  )
}
