import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import productaizeLogo from '../assets/productAIze.png';
// import loadAnalytics from './analytics.js';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  //In the index.js file, add an additional state variable to store the selected value of the dropdown menu. You can do this using the useState hook
  const [docType, setDocType] = useState('');
  const [apiOutput, setApiOutput] = useState('')

  const [isGenerating, setIsGenerating] = useState(false)
  const [textCopied, setTextCopied] = useState(false);

  // Modify the onChange handler for the dropdown menu to update the docType state variable with the selected value:
  const onDocTypeChanged = (event) => {
    setDocType(event.target.value);
  }
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, docType }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  }

  return (
    <div className="root">
      <Head>
        <title>productAIze</title>
      </Head>
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-JTC0C9YGXK"></script>
    {loadAnalytics()} */}
      <div className='logo-container'>
      <Image src={productaizeLogo} alt="productAIze logo" />
      </div>
      <div className="container">    
        <div className="header">
          <div className="header-title">
            <h1>Prepare product documents <span className='gradient-text'>10-100x faster</span></h1>
            {/* next to-do: have the gradient only for '10-100x faster' */}
          </div>
          <div className="header-subtitle">
            <h2>Give a 2-3 sentence description of your product/idea and watch as we prepare a first draft of your product document in seconds. <a href='#header-examples'>Example inputs</a></h2>            
            <div className='doc-type'>
              <h4> Choose a document type</h4>
              {/* Bind the onChange handler to the dropdown menu */}
              <select id='doc-type-select' onChange = {onDocTypeChanged}>
                <option value="a Products Requirement Document">PRD</option>
                <option value="a detailed PR/FAQ">PR/FAQ</option>
                <option value="all relevant Jira ticket(s)">Jira tickets</option>
                <option value="an Implementation plan">Implementation plan</option>
                <option value="all the required software and skills for the product/idea">Software and skills required</option>
                <option value='summarize this as an email to relevant stakeholers'>email summary of generation</option>
              </select>
            </div>
          </div>
        </div>
        {/* added code here */}
        <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="start typing here"
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
            {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
            </div>
          </a>
         
        </div>
        {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          
          <div className="output-content">
          <div className='copy-button'>
            {/* added copy button at top of output */}
          <strong><a onClick={() => {
            copyToClipboard(apiOutput);
            setTextCopied(true);
            setTimeout(() => {
              setTextCopied(false);
            }, 2000); // 2000 milliseconds = 2 seconds
          }}>{textCopied ? 'Copied!' : 'Copy Output'}</a></strong>
          </div>
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      </div>
      </div>
      <div id='header-examples' className="header-examples">
          <strong>Example inputs:</strong>
            <ol>
              <li>I'm building a startup which will let anyone who's interested in AI and crypto sign up for free and build useful products that directly relate
                to these domains, while helping them learn by doing. These self-guided product building sessions will be called builds; they'll be technical and 
                take about a weekend's worth of time. A sense of community will be core to this startup's users. The startup will be called buildspace.
              </li>
              <p></p>
              <li>I'm planning to build a product which would act as a personal assistant for you. 
                This will be powered by AI, and would make reservations for you, handle your emails and texts with your oversight, 
                multiply your productivity by helping you with knowledge work, and learn from your feedback in various ways. 
                This will be powered by state of the art LLMs and use a combination of natural language processing and 
                speech recognition.</li>
              <p></p>
              <li>Invez will be an app-based product which will democratize investing, providing access to opportunities that have so far only been available to high net worth people.
                Invez will be an online marketplace for investors and seasoned traders, where investors can select from a pool of traders based on their
                performance history, their subject matter expertise and their risk profile. Based on the upside that the investor gains from the trader's picks, the trader will
                get a small cut of their profits.
              </li>
              </ol>
        </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/ch_venkatakshay"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>built by akshay ft. buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
