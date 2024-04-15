'use client'


const ProgressPopUp = ({percentage,show,setShow}) => {

  return (
    <div className={`fixed h-screen w-screen flex flex-col items-center justify-center top-0\
        left-0 pointer-events-none z-[100] ${(show)?" block" : " hidden" }`}>
        <div className='flex flex-col items-center justify-center gap-4 h-1/3 w-1/3 p-4 shadow-around rounded-xl bg-slate-100'>
            <div className='w-max my-4 ml-auto pointer-events-auto'>
                <button 
                    onClick={()=>setShow(false)}
                    className='ml-auto text-white bg-red-500 px-4 py-2 rounded-xl'>
                    Close
                </button>
            </div>
            <h1> Uploading Data to Cloudinary And Server...</h1>
            <div className='my-8 w-full flex items-center justify-center flex-wrap'>
                <div className='progressbar relative w-full h-4 rounded-xl bg-gray-500 p-2'>
                    <div className={`z-50 progress absolute top-0 left-0 h-full bg-blue-500`} style={{ width: `${percentage}%` }}>
                    </div>
                    <h1 className="m-2 p-2">{percentage}%</h1>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ProgressPopUp