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
    model: 'text-davinci-003',
    prompt: 
    `
    ${basePromptPrefix}${req.body.userInput}. \n Write me ${req.body.docType} based on the above description, with emphasis on extreme detail.
    `,
    temperature: 0.5,
    max_tokens: 2500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
