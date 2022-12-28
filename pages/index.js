import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
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
  return (
    <div className="root">
      <Head>
        <title>productAIze</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Prepare product documents 10-100x faster</h1>
          </div>
          <div className="header-subtitle">
            <h2>Give a 2-3 sentence description of your product and watch as we prepare a first draft of your <strong>Product Requirement Document</strong> in seconds.</h2>
            <div className="header-examples">
            <strong>Example inputs:</strong>
            <ol>
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
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      </div>
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
