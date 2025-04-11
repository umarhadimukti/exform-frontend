import React from 'react'
import { QuestionItem as QuestionItemProps } from '@/types/formQuestionTypes'

const QuestionItem: React.FC<QuestionItemProps> = ({ question, index, isLast, onAdd, onDelete, onChange }) => {
  return (
    <div className='relative'>
        {question.type === 'first' && (
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
        )}

        {isLast && (
            <div className='absolute -right-10 bottom-0 text-sm text-gray-800 hover:text-gray-900 bg-white hover:bg-gray-50 cursor-pointer rounded px-3 py-1'>
                +
            </div>
        )}
    </div>
  )
}

export default QuestionItem