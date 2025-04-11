import React from 'react'
import { QuestionItem as QuestionItemProps } from '@/types/formQuestionTypes'

const QuestionItem: React.FC<QuestionItemProps> = ({ question, index, isLast, onAdd, onDelete, onChange }) => {
  return (
    <div>
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
  )
}

export default QuestionItem