// connect to the DB
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

//the only thing to do is `export const` + specify the route type and make it async
export const POST = async (req, res) => {
  const { prompt, userId, tag } = await req.json();

  try {
    await connectToDB(); // a lambda function, meanning it dies everytime it's done its job
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save(); // save the prompt to the database

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to create new Prompt', { status: 500 });
  }
};
