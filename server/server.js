// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const PORT = 3000;
const app = express();

const port = process.env.PORT || PORT;

app.use(express.static('./dist'));

app.listen(port);
