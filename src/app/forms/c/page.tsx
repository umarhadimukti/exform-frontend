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

        </div>
    </div>
  )
}

export default FormCreate;