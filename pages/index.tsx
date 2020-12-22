import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import {useState, useEffect} from 'react'

const dummyQuestions = [
  {
    'question': 'QUESTION Yes',
    'response': ['yes', 'no', 'maybe', '1st']
  },
  {
    'question': 'QUESTION No',
    'response': ['yes', 'no', 'maybe', '2nd']
  },
  {
    'question': 'QUESTION maybe',
    'response': ['yes', 'no', 'maybe','3rd']
  },
]


const Home : React.FC= () => {

  const [qNum, setQNum] = useState<number>(0)
  const [display, setDisplay] = useState<string[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [isResponse, setIsResponse] = useState<boolean>(false)

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

      <div className='container'>
      <button onClick={addQuestion}>Start</button>
        <br/>
        {display.map(curr => (<div key={curr}> {curr}</div>))}
        Possible Responses: 
        <br/>
        {options.map(curr => (<button onClick={addResponse} value={curr} key={curr}>{curr}</button>))}
      </div>
       
      <Footer />
    </div>
  )
}

export default Home
