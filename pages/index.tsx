import Head from 'next/head';
import { useState, useEffect } from 'react';

const dummyQuestions = [
  {
    question: 'QUESTION Yes',
    response: ['yes', 'no', 'maybe', '1st'],
  },
  {
    question: 'QUESTION No',
    response: ['yes', 'no', 'maybe', '2nd'],
  },
  {
    question: 'QUESTION maybe',
    response: ['yes', 'no', 'maybe', '3rd'],
  },
];

const Home: React.FC = () => {
  const [qNum, setQNum] = useState<number>(0);
  const [resNum, setResNum] = useState<number>(0);
  const [display, setDisplay] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isResponse, setIsResponse] = useState<boolean>(false);

  //The goal is to display one question at a time
  //also display all the possible responses

  function addQuestion() {
    if (qNum < dummyQuestions.length) {
      const currQ = dummyQuestions[qNum].question;
      const currOptions = dummyQuestions[qNum].response;

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
    if (isResponse) addQuestion();
  });

  return (
    <div>
      <Head>
        <title>Whats4Dinner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container">
        <button onClick={addQuestion}>Start</button>
        <div className="chat">
          <div className="chat-title">
            <p>Bot</p>
            <figure className="avatar"></figure>
          </div>

          <div className="messages">
            {display.map((curr) => (
              <div key={curr}> {curr}</div>
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
