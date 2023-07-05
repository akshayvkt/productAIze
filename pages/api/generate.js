import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
You are an expert product manager who generates top-tier product documents based on instructions.
`;


const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}. \n Write ${req.body.docType} based on the above description.`)

  const baseCompletion = await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    prompt: 
    `
    ${basePromptPrefix}${req.body.userInput}. \n Write me ${req.body.docType} based on the above description, with emphasis on the required amount of detail.
    `,
    temperature: 0.5,
    max_tokens: 2500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;






// const basePromptPrefix =
// `
// Please take the following unorganized input and turn it into a well-defined and structured description:

// `

// const generateAction = async (req, res) => {
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.8,
//     max_tokens: 500,
//   });
  
//   const basePromptOutput = baseCompletion.data.choices.pop();

//   // I build Prompt #2.
//   const secondPrompt = 
//   `
//   Generate a ${req.body.docType} with the required amount of detail using the description below.

//   Description: ${basePromptOutput}

//   ${req.body.docType}:
//   `
  
//   // I call the OpenAI API a second time with Prompt #2
//   const secondPromptCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${secondPrompt}`,
//     // I set a higher temperature for this one. Up to you!
//     temperature: 0.85,
// 		// I also increase max_tokens.
//     max_tokens: 2000,
//   });
  
//   // Get the output
//   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

//   // Send over the Prompt #2's output to our UI instead of Prompt #1's.
//   res.status(200).json({ 
//     baseOutput: basePromptOutput,
//     secondOutput: secondPromptOutput });
// };

// export default generateAction;
