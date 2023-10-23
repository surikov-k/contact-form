import express from 'express';
import { z, ZodError } from 'zod';

const port = 5050;

const app = express();
app.use(express.json());

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  message: z.string().min(1, { message: 'Message is required' }),
})

app.post('/send-message', (req, res) => {
  try {
    const {name, email, message} = contactFormSchema.parse(req.body);
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({error: e.message});
    } else {
      res.sendStatus(500);
    }
  }

})

app.listen(port, () => console.log(`Listening on port ${port}`));

