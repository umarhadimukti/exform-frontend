'use client';

import React, { useRef, useState } from 'react';
import { QuestionItem as QuestionItemProps } from '@/types/formQuestionTypes';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select';
import { IoText } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { IoMdRadioButtonOn } from "react-icons/io";
import { PiTrashLight } from "react-icons/pi";


const QuestionItem: React.FC<QuestionItemProps> = ({ question, index, isLast, onAdd, onDelete, onChange }) => {
    const [ selectedType, setSelectedType ] = useState<string>('text');
    const [ options, setOptions ] = useState<string[]>([]);

    const handleAddOption = (): void => {
        const newOption = '';
        setOptions([...options, newOption]);
    }
    const handleDeleteOption = (index: number): void => {
        setOptions((options: string[]) => options.filter((option: string, i: number) => i !== index));
    }

    // text area extend height
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleInput = (): void => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

  return (
    <div className='relative'>
        {question.type === 'first' ? (
            <div className="p-5 pb-7 flex flex-col gap-3">
                <input
                    type="text"
                    className='text-4xl text-gray-800 border-b-1 focus:border-b-2 p-1 border-gray-400 focus:border-gray-800 w-full outline-none ring-none transition-all'
                    defaultValue={question.value ?? 'default title form'} />
                <input
                    type="text"
                    className='text-base text-gray-600 border-b-1 focus:border-b-2 p-1 border-gray-400 focus:border-gray-600 w-full outline-none ring-none transition-all'
                    defaultValue='form description' />
            </div>
        ) : question.type === 'regular' && (
            <div className="p-5 pb-7 flex flex-col gap-3 relative">
                <div className='absolute left-0 top-0 bottom-0 p-1 bg-gray-500 shadow rounded-l-xs'></div>
                <div className="grid grid-cols-12 items-start gap-8">
                    <div className='col-span-7'>
                        <textarea
                            ref={textareaRef}
                            onInput={handleInput}
                            className='col-span-6 text-base text-gray-800 border-b-1 p-2 focus:bg-gray-50 focus:border-b-2 border-gray-400 focus:border-gray-800 w-full outline-none ring-none transition-all resize-none overflow-hidden'
                            rows={1}
                            defaultValue={`question ${index}`}
                            placeholder='insert question'
                        ></textarea>
                    </div>
                    <div className='col-span-5 flex justify-end'>
                        <Select onValueChange={setSelectedType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="choose question type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text" className='flex items-center gap-3'>
                                    <IoText />
                                    <span className='text-gray-700'>text</span>
                                </SelectItem>
                                <SelectItem value="email">
                                    <MdAlternateEmail />
                                    <span className='text-gray-700'>email</span>
                                </SelectItem>
                                <SelectItem value="checkbox">
                                    <IoMdCheckboxOutline />
                                    <span className='text-gray-700'>checkbox</span>
                                </SelectItem>
                                <SelectItem value="dropdown">
                                    <MdOutlineArrowDropDownCircle />
                                    <span className='text-gray-700'>dropdown</span>
                                </SelectItem>
                                <SelectItem value="radio">
                                    <IoMdRadioButtonOn />
                                    <span className='text-gray-700'>radio</span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-3">
                    <div className="col-span-12">
                        {selectedType === 'dropdown' && (
                            <div className='flex flex-col gap-3'>
                                {options.map((options: string, index: number) => (
                                    <div key={index} className='flex gap-2 items-start relative'>
                                        <span className='text-gray-700 pt-1 w-[30px] text-sm'>{index+1}.</span>
                                        <input
                                            type="text"
                                            placeholder={`option ${index + 1}`}
                                            className='text-sm text-gray-700 border-b-1 focus:border-b-2 p-1 border-gray-300 focus:border-gray-700 w-full outline-none ring-none transition-all'
                                        />
                                        <span onClick={() => handleDeleteOption(index)} className='absolute right-0 bottom-2 group'>
                                            <PiTrashLight className='group-hover:text-red-500 transition-all duration-300 cursor-pointer'/>
                                        </span>
                                    </div>
                                ))}
                                <div onClick={handleAddOption} className='flex gap-2 w-[127px] items-start group'>
                                    <span className='pt-1 w-[30px] text-sm cursor-pointer text-gray-500 group-hover:text-gray-800'>(+)</span>
                                    <div
                                        className='text-sm text-gray-700 p-1 border-b border-white group-hover:border-b cursor-text group-hover:border-gray-400 w-[77px] outline-none ring-none transition-all'>add option</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {isLast && (
            <div
                onClick={onAdd}
                className='absolute -right-12 bottom-0 bg-white hover:bg-gray-50 cursor-pointer rounded p-2 shadow group'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 text-gray-500 group-hover:text-gray-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
        )}
    </div>
  )
}

export default QuestionItem