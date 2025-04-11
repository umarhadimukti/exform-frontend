import React from 'react'
import { QuestionItem as QuestionItemProps } from '@/types/formQuestionTypes'

const QuestionItem: React.FC<QuestionItemProps> = ({ question, index, isLast, onAdd, onDelete, onChange }) => {
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
            <div className="p-5 pb-7 flex flex-col gap-3">
                <input
                    type="text"
                    className='text-base text-gray-800 border-b-1 focus:border-b-2 p-1 border-gray-400 focus:border-gray-800 w-full outline-none ring-none transition-all'
                    defaultValue={`question ${index+1}`} />
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