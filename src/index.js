import express from 'express';
import { z, ZodError } from 'zod';

import sheets, {SHEET_ID} from './sheet-client.js'

const port = 5050;

const app = express();
app.use(express.json());

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  message: z.string().min(1, { message: 'Message is required' }),
})

app.post('/send-message', async (req, res) => {
  try {
    const {name, email, message} = contactFormSchema.parse(req.body);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Data!A2:C2',
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, message]]
      }
    });
    res.json({message: 'Data added successfully!'});
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({error: e.message});
    } else {
      res.sendStatus(500);
    }
  }

})

app.listen(port, () => console.log(`Listening on port ${port}`));

