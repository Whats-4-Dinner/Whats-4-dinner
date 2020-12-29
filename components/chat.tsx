import { useState, useEffect, useRef } from 'react';
import questions from './questions.json';
import { fetchRecipes } from '../pages/api/spoonacular';

interface Display {
  text: string;
  id: number;
  user: 'bot' | 'user';
}


const Chat: React.FC = () => {
  const [qNum, setQNum] = useState<number>(0);
  const [resNum, setResNum] = useState<number>(0);

  const [display, setDisplay] = useState<Display[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const [isResponse, setIsResponse] = useState<boolean>(false);
  const [isAltQuestion, setIsAltQuestion] = useState<boolean>(false);

  const [recipes, setRecipes] = useState({});
  const [queryInfo, setQueryInfo] = useState({})
  const messagesEndRef = useRef(null);

  function startQuestions() {
    clearTimeout();
    const currQ: string = questions[0].question;
    const currOptions: string[] = questions[0].response;

    const initalDisplay: Display = {
      text: currQ,
      id: 0,
      user: 'bot',
    };
    setDisplay([initalDisplay]);
    setOptions(currOptions);
    setIsResponse(false);
    setResNum(0);
    setQNum(1);
  }

  function addQuestion(): void {
    const lastResponse = display[display.length - 1].text
    //If nested question
    if(questions[qNum - 1][lastResponse]){
      const currQ: string = questions[qNum - 1][lastResponse].question;
      const currOptions: string[] = questions[qNum - 1][lastResponse].response;

      const nextQuestion: Display = {
        text: currQ,
        id: qNum + 100,
        user: 'bot',
      };

      setIsResponse(false);
      setDisplay([...display, nextQuestion]);
      setOptions(currOptions);
      setIsAltQuestion(true)
    }
    //otherwise move on to the next question
    else if (qNum < questions.length || isAltQuestion) {

      const currQ: string = questions[qNum].question;
      const currOptions: string[] = questions[qNum].response;

      const nextQuestion: Display = {
        text: currQ,
        id: qNum,
        user: 'bot',
      };
      setIsResponse(false);
      setDisplay([...display, nextQuestion]);
      setOptions(currOptions);
      setQNum(qNum + 1);
    }
  }

  async function addResponse(evt) {
    const response: string = evt.target.value;

    const lastResponse = display[display.length -2 ]? display[display.length - 2].text : ''
    const lastQuestion = questions[qNum - 1]
    const lastQuestionPropertyType = lastQuestion.queryProperty
    
    //if previous question was nested 
    if(lastQuestion[lastResponse]){
      const userResponse: Display = {
        text: response,
        id: resNum + 100,
        user: 'user',
      };
      setDisplay([...display, userResponse]);
      setIsResponse(true);
      setQueryInfo({...queryInfo, [lastQuestionPropertyType]: response})
      //else increment resNum 
    } else if (qNum > resNum || isAltQuestion) {
      const userResponse: Display = {
        text: response,
        id: resNum,
        user: 'user',
      };
      setDisplay([...display, userResponse]);
      setIsResponse(true);
      setResNum(resNum + 1);
      setQueryInfo({...queryInfo, [lastQuestionPropertyType]: response})
      setIsAltQuestion(false)
    }

    //make query on last response
    if(qNum===questions.length) {
      const res = await fetchRecipes(queryInfo)
      console.log({res})
      setRecipes(res)
    }
  }

  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (isResponse) setTimeout(() => addQuestion(), 1000);
    scrollToBottom();
  }, [display]);

  return (
    <div>
      <div className="container">
        <button onClick={startQuestions}>Start</button>
        <div className="chat">
          <div className="flex chat-title">
            <figure className="avatar-bot" />
            <p>Bot</p>
          </div>

          <div className="messages">
            {display.map((message) => (
              <div
                className={`flex-${message.user}`}
                key={`${message.user}:${message.id}`}
              >
                <figure className={`avatar-${message.user}`} />
                <p className={`message-${message.user}`}>{message.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="message-options">
            {qNum === 0 || qNum > resNum || isAltQuestion
              ? options.map((choice) => (
                  <button onClick={addResponse} value={choice} key={choice}>
                    {choice}
                  </button>
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
