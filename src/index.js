import express from 'express';

const port = 5050;

const app = express();
app.use(express.json());

app.post('/send-message', (req, res) => {
  console.log(req.body);
  res.send('OK');
})

app.listen(port, () => console.log(`Listening on port ${port}`));

