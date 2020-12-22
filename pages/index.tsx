import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import {useState, useEffect} from 'react'

const dummyQuestions = [
  {
    'question': 'Say Yes',
    'response': ['yes', 'no', 'maybe', '1st']
  },
  {
    'question': 'Say No',
    'response': ['yes', 'no', 'maybe', '2nd']
  },
  {
    'question': 'Say maybe',
    'response': ['yes', 'no', 'maybe','3rd']
  },
]

const Home : React.FC= () => {

  const [qNum, setQNum] = useState(0)
  const [display, setDisplay] = useState([])
  const [options, setOptions] = useState([])
  const [isResponse, setIsResponse] = useState(false)

  //The goal is to display one question at a time
  //also display all the possible responses 

  
  function addQuestion (){
    if(qNum < dummyQuestions.length){
      const currQ = dummyQuestions[qNum].question
      const currOptions = dummyQuestions[qNum].response
    
      setIsResponse(false);
      setDisplay([...display, currQ])
      setOptions(currOptions)
      setQNum(qNum + 1)
    }
  }

  function addResponse (evt){
      const response = evt.target.value
      setDisplay([...display, response])
      setIsResponse(true)
    
  }

  useEffect(() => {
    if(isResponse) addQuestion()
  })
  
  return (
    <div>
      <Head>
         <title>Whats4Dinner</title>
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />

        <button onClick={addQuestion}>Start</button>
        <br/>
        {display.map(curr => (<div key={curr}> {curr}</div>))}
        Possible Responses: 
        <br/>
        {options.map(curr => (<button onClick={addResponse} value={curr} key={curr}>{curr}</button>))}
      <Footer />
    </div>
  )
}

export default Home
