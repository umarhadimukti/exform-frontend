"use client";

import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import LogoutButton from './button/logout-button';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const Header = () => {
  const router: AppRouterInstance = useRouter();

  const { user, loading } = useAuth();
  const fullName: string = !loading && user ? (`${user?.first_name} ${user?.last_name}`.trim()) : '';

  const pathname: string = usePathname();
  const isFormsPage: boolean = pathname === '/forms';

  return (
    <div className='w-full bg-white'>

        <div className="container mx-auto py-2 flex justify-between items-center">
            <div className='cursor-pointer' onClick={() => router.push('/forms')}>
                <Image src="/images/transparent_exform_logo.png" className='bg-transparent' alt="logo" width={80} height={80} priority quality={100}/>
            </div>
            {isFormsPage && (
                <div>
                    <div className="w-[400px]">
                        <input type="text" className='w-full py-2 px-3 shadow text-sm tracking-wide outline-none bg-slate-50 rounded-full' placeholder='search form..' />
                    </div>
                </div>
            )}
            <div>
                <Popover>
                    <PopoverTrigger>
                        <Avatar className='w-8 h-8 cursor-pointer transition-all duration-500 hover:scale-105 hover:brightness-90'>
                            <AvatarImage src="/images/user.png" />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='flex flex-col gap-4'>
                            { loading ?
                                <div className='text-xs tracking-wide animate-pulse text-gray-800'>loading user..</div>
                                :
                                <div>
                                    <h5 className='text-sm tracking-wide font-medium text-gray-800'>{ fullName }</h5>
                                    <h5 className='text-xs tracking-wide text-gray-700'>{ user?.email || '' }</h5>
                                </div>
                            }
                            <LogoutButton />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>

    </div>
  )
}

export default Header