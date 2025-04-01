import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
  return (
    <div className='w-full bg-white'>

        <div className="container mx-auto py-2 flex justify-between items-center">
            <div>
                <Image src="/images/transparent_exform_logo.png" className='bg-transparent' alt="logo" width={80} height={80} priority quality={100}/>
            </div>
            <div>
                <div className="w-[400px]">
                    <input type="text" className='w-full py-2 px-3 shadow text-sm tracking-wide outline-none bg-slate-50 rounded-full' placeholder='search form..' />
                </div>
            </div>
            <div>
                <Avatar className='w-10 h-10'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
            </div>
        </div>

    </div>
  )
}

export default Header