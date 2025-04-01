import React from 'react'
import Image from 'next/image'

const Forms = () => {
  return (
    <div className='min-h-[100vh] w-full font-[family-name:var(--font-geist-sans)]'>
        <main>
            <div className="p-[20px] bg-slate-100 border-b border-slate-200">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <Image src="/images/transparent_exform_logo.png" className='bg-transparent' alt="logo" width={100} height={100} priority quality={100}/>
                    </div>
                    <div className="flex flex-col">
                        <div className="p-4 rounded-md shadow bg-black hover:bg-black/80 transition-all cursor-pointer text-center text-white tracking-wide">
                            + empty form
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-full">
                <div className="wrapper flex justify-start container mx-auto items-center w-full gap-4 mt-5">
                    <div className="w-[250px] bg-slate-50 rounded-md overflow-hide shadow">
                        <div className="w-full h-[250px] overflow-hidden border-b">
                            <Image src="/images/form.jpg" className='w-full h-full' alt="logo" width={100} height={100}/>
                            
                        </div>
                        <div className="bg-white w-full h-full mt-3 p-3 py-5 leading-tight">
                            <h3 className='font-medium mb-2 truncate'>Formulir Pendataan Karyawan Pabrik</h3>
                            <p className='text-sm text-gray-600 truncate'> test ini adalah deskripsi dari form diatas</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Forms