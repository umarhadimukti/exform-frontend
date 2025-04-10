'use client';

import React from 'react'
import Header from '@/components/header';
import { useState, useEffect } from 'react';

const FormCreate: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('questions');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCurrentTab = (tab: string) => {
    setIsLoading(true);
    setTimeout(() => {
        setCurrentTab(tab);
        setIsLoading(false);
    }, 400);
  }

  return (
    <div className='min-h-[100vh] w-full font-[family-name:var(--font-geist-sans)]'>
        <header>
            <Header/>
        </header>

        <div className="bg-white w-full pb-3 border-b border-gray-100">
            <div className="max-w-8/10 mx-auto">
                <div className="flex justify-center gap-3 items-center">
                    <span
                        onClick={ () => handleCurrentTab('questions') }
                        className={`text-sm tracking-wide cursor-pointer transition-all text-gray-500 hover:text-gray-700 ${currentTab === 'questions' ? 'text-gray-900 underline' : ''}`}>
                        questions
                    </span>
                    <span
                        onClick={ () => handleCurrentTab('responses') }
                        className={`text-sm tracking-wide cursor-pointer transition-all text-gray-500 hover:text-gray-700 ${currentTab === 'responses' ? 'text-gray-900 underline' : ''}`}>
                        responses
                    </span>
                </div>
            </div>
        </div>

        <div className="bg-gray-100 w-full border min-h-screen">
            {isLoading ? (
                <div className='text-center w-full flex justify-center p-5'>
                    <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            ) : currentTab === 'questions' ? (
                <div className="w-5/10 mx-auto bg-white rounded mt-5">
                    <div className="bg-gray-500 rounded-t p-1"></div>
                    <div className="p-5 pb-7 flex flex-col gap-3">
                        <input
                            type="text"
                            className='text-4xl text-gray-800 border-b-1 focus:border-b-2 p-1 border-gray-400 focus:border-gray-800 w-full outline-none ring-none transition-all'
                            defaultValue='untitled form' />
                        <input
                            type="text"
                            className='text-base text-gray-600 border-b-1 focus:border-b-2 p-1 border-gray-400 focus:border-gray-600 w-full outline-none ring-none transition-all'
                            defaultValue='form description' />
                    </div>
                </div>
            ): currentTab === 'responses' && (
                <div className="w-5/10 mx-auto bg-white rounded mt-5">
                    <div className="bg-gray-500 rounded-t p-1"></div>
                    <div className="p-5 pb-7 flex flex-col gap-3">
                        <h5 className='text-lg text-gray-800'>all responses</h5>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default FormCreate;