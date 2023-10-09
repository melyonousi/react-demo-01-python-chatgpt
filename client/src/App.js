import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [prevAnswer, setPrevAnswer] = useState([])
  const scrollRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuestion(e.target.elements.question.value)
    e.target.elements.question.value = ''

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {

    const getAnswer = async () => {
      let response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`)
      response = await response.json()
      setAnswer(response.response)

      const updatePrevAnswer = [...prevAnswer, { answer }, { question }]
      setPrevAnswer(updatePrevAnswer)

      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }

    question !== '' && getAnswer()
    setQuestion('')

  }, [question])

  return (
    <section className='h-screen px-4 pt-4 flex flex-col justify-center items-center'>
      <h1 className='font-bold'>try to chat with ChatGpt</h1>
      <h3 className='mb-4 text-lg text-red-500'>We do not store any data, just for testing</h3>
      <div className='relative border border-zinc-600 p-1 max-h-[90%] min-h-[90%] lg:max-w-[40%] md:max-w-[50%] max-w-[90%] w-full'>
        <div className='overflow-y-auto h-full pb-16 pt-4 px-4 text-start' dir='auto' style={{ direction: 'auto', unicodeBidi: 'plaintext' }}>
          <div className='bg-red-500'>
          </div>
          <ul className='flex flex-col gap-2'>
            {prevAnswer.map((item, index) => (
              <ol className='flex flex-col gap-2' key={index}>
                <li className='answer-style'>{item.answer}</li>
                <li className='question-style'>{item.question}</li>
              </ol>
            ))}
            {answer && <li ref={scrollRef} className='answer-style'>{answer}</li>}
          </ul>
        </div>
        <form className='absolute bottom-0 left-0 right-0 bg-black' onSubmit={handleSubmit}>
          <div className='flex'>
            <input className='outline-none w-full bg-transparent py-1 px-2' placeholder='type here..' name="question" type="text" />
            <input className='outline-none px-2' name="submit" type="submit" value="send" />
          </div>
        </form>
      </div>
    </section>
  )
}

export default App;
