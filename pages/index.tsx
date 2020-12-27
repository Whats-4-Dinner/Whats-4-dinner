import Head from 'next/head';
import { useState, useEffect } from 'react';

const dummyQuestions = [
  {
    'question': 'QUESTION Yes',
    'response': ['yes', 'no', '1st']
  },
  {
    'question': 'QUESTION No',
    'response': ['yes', 'no', '2nd']
  },
  {
    'question': 'QUESTION maybe',
    'response': ['yes', 'no', '3rd']
  },
];

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

  function startQuestions() : void {
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
    setResNum(0);
    setQNum(1);
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

  useEffect(() => {
    if (isResponse) setTimeout(() => addQuestion(),1000);
  });

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
            <div className="avatar"/>

            <p>Bot</p>
            <figure className="avatar"></figure>
          </div>


          <div className='messages'>
            {display.map(message => (
              <div className='flex' key={`${message.user}:${message.id}`}>
                <figure className="avatar"/>
                <p className='message'>{message.text}</p>
              </div>
              ))}
          </div>
          {qNum === 0 || qNum > resNum ? (
            <div className="message-options">
              {options.map((choice) => (
                <button onClick={addResponse} value={choice} key={choice}>
                  {choice}
                </button>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
