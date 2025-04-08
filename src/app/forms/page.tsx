"use client";

import React from 'react'
import Image from 'next/image'
import { MdOutlinePostAdd } from "react-icons/md"
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import { Form, FormsResponse } from '../../types/formsTypes';

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
        <main>
            <div className="p-[30px] bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto flex justify-start items-center">
                    <div className="flex flex-col items-start">
                        <div className="px-8 py-2 rounded-sm shadow outline-2 outline-black hover:bg-black/80 transition-all cursor-pointer text-center text-white tracking-wide group">
                            <MdOutlinePostAdd className='text-2xl text-black group-hover:text-white transition-all'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 mb-6 container mx-auto">
                <div className='flex justify-between items-center'>
                    <h5 className='tracking-wide text-gray-900'>Latest Form</h5>
                </div>
            </div>

            <div className="h-full">
                <div className="wrapper flex justify-start container mx-auto items-center w-full gap-4 mt-5">
                    {forms?.data.map((form: Form, index: number) => (
                        <div key={`${index}-${form?.id}`} className="w-[250px] bg-slate-50 rounded-md overflow-hide shadow">
                            <div className="w-full h-[250px] overflow-hidden border-b">
                                <Image src="/images/form.jpg" className='w-full h-full' alt="logo" width={100} height={100}/>
                            </div>
                            <div className="bg-white w-full h-full mt-3 p-3 py-5 leading-tight">
                                <h3 className='font-medium mb-2 truncate'>Formulir Pendataan Karyawan Pabrik</h3>
                                <p className='text-sm text-gray-600 truncate'> test ini adalah deskripsi dari form diatas</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    </div>
  )
}

export default Forms