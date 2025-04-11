'use client';

import React, { useState } from 'react'
import QuestionItem from './questionItem';
import { QuestionType } from '../../../types/formQuestionTypes';


const FormQuestions: React.FC = () => {
  const [ questions, setQuestions ] = useState<QuestionType[]>([
    {
        id: Date.now(),
        value: 'untitled form',
        type: 'first',
    }
  ]);

  const addQuestion = () => {
    const newQuestion: QuestionType = {
        id: Date.now(),
        value: '',
        type: 'regular',
    }
    setQuestions([...questions, newQuestion]);
  }

  const deleteQuestion = (id: number) => {
    setQuestions((prev: QuestionType[]) => prev.filter((q: QuestionType) => q.id !== id));
  }

  const changeQuestion = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, value } : q))
    );
  };

  return (
    <div className="w-5/10 mx-auto bg-white rounded mt-5">
        <div className="bg-gray-500 rounded-t p-1"></div>
        <div>
            {questions.map((question, index) => {
                return (
                    <QuestionItem
                        key={`${index}`}
                        question={question}
                        index={index}
                        isLast={index === questions.length-1}
                        onAdd={addQuestion}
                        onChange={changeQuestion}
                        onDelete={question.type !== 'first' ? deleteQuestion : undefined}
                        />
                )
            })}
        </div>
    </div>
  )
}

export default FormQuestions