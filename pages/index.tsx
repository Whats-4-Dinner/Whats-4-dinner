import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import dummyQuestions from './questions.json';
import {fetchRecipes} from './api/spoonacular';


interface Display {
  text : string;
  id : number;
  user : 'bot' | 'user'
}

const Home: React.FC = () => {
  const [qNum, setQNum] = useState<number>(0);
  const [resNum, setResNum] = useState<number>(0);
  const [display, setDisplay] = useState<Display[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isResponse, setIsResponse] = useState<boolean>(false);
  const messagesEndRef = useRef(null)

  async function startQuestions() {
    clearTimeout()
    const currQ : string = dummyQuestions[0].question
    const currOptions :string[] = dummyQuestions[0].response

    const initalDisplay : Display = {
      text: currQ,
      id: 0,
      user: 'bot'
    }
    setDisplay([initalDisplay]);
    setOptions(currOptions);
    setIsResponse(false);
    setResNum(0);
    setQNum(1);
    const response = await fetchRecipes()
    console.log(response)
    
  }

  function addQuestion (): void {
    if(qNum < dummyQuestions.length){
      const currQ : string= dummyQuestions[qNum].question
      const currOptions : string[] = dummyQuestions[qNum].response
    
      const nextQuestion : Display = {
        text: currQ,
        id: qNum,
        user: 'bot'
      }
      setIsResponse(false);
      setDisplay([...display, nextQuestion]);
      setOptions(currOptions);
      setQNum(qNum + 1);
    }
  }

  function addResponse(evt): void {
    if (qNum > resNum) {
      const response : string = evt.target.value;

      const userResponse : Display = {
        text: response,
        id: resNum,
        user: 'user'
      }
      setDisplay([...display, userResponse]);
      setIsResponse(true);
      setResNum(resNum + 1);
    }
  }

  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isResponse) setTimeout(() => addQuestion(),1000);
    scrollToBottom()
  }, [display]);

  return (
    <div>
      <Head>
        <title>Whats4Dinner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className='container'>
      <button onClick={startQuestions}>Start</button>
        <div className='chat'>
          <div className="flex chat-title">
            <div className="avatar-bot"/>
            <p>Bot</p>
            <figure className="avatar"></figure>
          </div>


          <div className='messages'>
            {display.map(message => (
              <div className={`flex-${message.user}`} key={`${message.user}:${message.id}`}>
                <figure className={`avatar-${message.user}`}/>
                <p className={`message-${message.user}`}>{message.text}</p>
              </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
         
          <div className="message-options">
            {qNum === 0 || qNum > resNum ? options.map((choice) => (
              <button onClick={addResponse} value={choice} key={choice}>
                {choice}
              </button>
            )) : ("")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
