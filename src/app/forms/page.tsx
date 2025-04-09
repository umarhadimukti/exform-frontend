"use client";

import React from 'react'
import { MdOutlinePostAdd } from "react-icons/md"
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import { Form, FormsResponse } from '../../types/formsTypes';
import Image from 'next/image';

const Forms: React.FC = () => {
  const [ forms, setForms ] = useState<FormsResponse | null>(null);
  const [ currentPage, setCurrentPage ] = useState<number>(1);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {

    const fetchFormsData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/source/v1/forms?page=${currentPage}`, {
                method: 'GET',
                credentials: 'include',
            });
    
            if (!response.ok) throw new Error('error while fetching forms data.');

            const forms = await response.json();
            console.log(forms)
    
            setForms(forms);
        } catch (error) {
            setLoading(true);
            const errorMessage: string = `failed to fetch forms data: ${error instanceof Error ? error.message : error}`;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    fetchFormsData();

  }, [ currentPage ]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  }

  return (
    <div className='min-h-[100vh] w-full font-[family-name:var(--font-geist-sans)]'>
        <header>
            <Header/>
        </header>

        <main className='pb-10'>
            <div className="py-[25px] bg-slate-50 border-b border-slate-100">
                <div className="max-w-8/10 mx-auto flex justify-start items-center">
                    <div className="flex flex-col items-start">
                        <div className="px-8 py-2 rounded-sm shadow outline-2 outline-black hover:bg-black/80 transition-all cursor-pointer text-center text-white tracking-wide group">
                            <MdOutlinePostAdd className='text-2xl text-black group-hover:text-white transition-all'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-8/10 mx-auto">
                <div className="mt-5 mb-3">
                    <div className='flex justify-between items-center'>
                        <h5 className='tracking-wide text-gray-900'>Latest Form</h5>
                    </div>
                </div>

                <div className="h-full">
                    {error && (
                        <div className="w-full text-sm text-center flex items-center justify-center text-red-600 tracking-wide">
                            { error }
                        </div>
                    )}
                    {loading && (
                        <div className="w-full text-sm text-center flex items-center justify-center text-red-600 tracking-wide">
                            <span>
                                <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </span>
                        </div>
                    )}
                    
                    <div className="wrapper grid grid-cols-10 items-start w-full space-x-3 space-y-4 mt-5">
                        {forms?.data.map((form: Form, index: number) => (
                            <div key={`${index}-${form?.id}`} className="col-span-2 bg-slate-50 overflow-hide border max-h-max hover:border-gray-400 transition-all duration-200 cursor-pointer">
                                <div className="relative w-full h-[200px] border-b">
                                    <Image
                                        src='/images/form.jpg'
                                        alt='image'
                                        fill
                                        priority
                                        className='object-cover'
                                    />
                                </div>
                                <div className="bg-white w-full h-full mt-3 p-3 py-5 leading-tight">
                                    <h3 className='font-medium mb-2 truncate'>{ form.title ?? '' }</h3>
                                    <p className='text-sm text-gray-600 truncate'>{ form.description ?? 'empty description' }</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-3 w-full py-2'>
                        <div className="grid grid-cols-10 gap-2">
                            <div className='col-span-3 border'>
                                <span className='text-sm text-gray-800 tracking-wide'>
                                    showing <span className='font-medium'>1 </span>
                                    to <span className='font-medium'>5 </span>
                                    of <span className="font-medium">65 </span>
                                    results
                                </span>
                            </div>
                            <div className='col-span-7 border flex justify-end'>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`text-gray-800 hover:text-gray-900 hover:bg-gray-100 p-2 cursor-pointer transition-all ${!forms?.hasPrevPage ? 'opacity-50 text-gray-600 hover:text-gray-600 hover:bg-white' : ''}`}
                                    disabled={!forms?.hasPrevPage}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>
                                    </span>
                                </button>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`text-gray-800 hover:text-gray-900 hover:bg-gray-100 p-2 cursor-pointer transition-all ${!forms?.hasNextPage ? 'opacity-50 text-gray-600 hover:text-gray-600 hover:bg-white' : ''}`}
                                    disabled={!forms?.hasNextPage}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>
  )
}

export default Forms