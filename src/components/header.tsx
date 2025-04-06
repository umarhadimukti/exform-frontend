"use client";

import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth();
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
            <Popover>
                <PopoverTrigger>
                    <Avatar className='w-8 h-8 cursor-pointer transition-all duration-500 hover:scale-105 hover:brightness-90'>
                        <AvatarImage src="/images/user.png" />
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="border border-black flex flex-col gap-1">
                        <h6>{ user?.fullName }</h6>
                    </div>
                </PopoverContent>
            </Popover>
                
            </div>
        </div>

    </div>
  )
}

export default Header