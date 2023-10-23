import express from 'express';

const port = 5050;

const app = express();
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));
