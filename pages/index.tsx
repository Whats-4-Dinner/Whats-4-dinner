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

const Home: React.FC = () => {
  const [qNum, setQNum] = useState<number>(0);
  const [resNum, setResNum] = useState<number>(0);
  const [display, setDisplay] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isResponse, setIsResponse] = useState<boolean>(false);

  function startQuestions() {
    clearTimeout()
    const currQ = dummyQuestions[0].question
    const currOptions = dummyQuestions[0].response
    setDisplay([currQ]);
    setOptions(currOptions);
    setResNum(0);
    setQNum(1);

  }

  function addQuestion (){
    if(qNum < dummyQuestions.length){
      const currQ = dummyQuestions[qNum].question
      const currOptions = dummyQuestions[qNum].response
    
      setIsResponse(false);
      setDisplay([...display, currQ]);
      setOptions(currOptions);
      setQNum(qNum + 1);
    }
  }

  function addResponse(evt) {
    if (qNum > resNum) {
      const response = evt.target.value;
      setDisplay([...display, response]);
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
          </div>

          <div className='messages'>
            {display.map(curr => (
              <div className='flex' key={curr}>
                <figure className="avatar"/>
                <p className='message'>{curr}</p>
              </div>
              ))}
          </div>

          {qNum === 0 || qNum > resNum ? (
            <div className="message-options">
              {options.map((curr) => (
                <button onClick={addResponse} value={curr} key={curr}>
                  {curr}
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
