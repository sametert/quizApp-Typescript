import React from 'react'

type Props = {
    question : string;
    answer : string[];
    callback : any;
    userAnswer : string;
    questionNr : number;
    totalQuestion : number;
}

const QuestionCard: React.FC<Props> = ( {question, answer,callback,userAnswer,questionNr,totalQuestion}) => {
  return (
    <div>
        <p className='number'>
            Question : {questionNr} / {totalQuestion}
        </p>
        <p dangerouslySetInnerHTML={{__html : question}}>
            
        </p>
        
      
    </div>
  )
}

export default QuestionCard
