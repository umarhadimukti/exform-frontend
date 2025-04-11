export interface QuestionType {
    id: number,
    value: string,
    type: 'first' | 'regular',
}

export interface QuestionItem {
    question: QuestionType,
    index: number,
    isLast: boolean,
    onAdd: () => void,
    onChange: (id: number, value: string) => void,
    onDelete?: (id: number) => void,
}