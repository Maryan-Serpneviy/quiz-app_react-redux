export interface ObjString { [key: string]: string }

export interface IQuizName {
   id: string
   name: string
}

export interface IQuizItem {
   asnwers: Array<IAnswer>
   id: number
   correct: number
   question: string
   explanation?: string
   relevance?: string
}

export interface IAnswer {
   id: number
   text: string
}
