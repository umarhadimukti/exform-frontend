'use client';

import React from 'react'
import Header from '@/components/header';
import { useState, useEffect } from 'react';

const FormCreate: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('questions');

  const handleCurrentTab = (tab: string) => {
    setCurrentTab(tab);
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
        </div>
    </div>
  )
}

export default FormCreate;