const express = require('express');
const qr = require('qr-image');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/generate', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const qr_svg = qr.imageSync(url, { type: 'png' });
    res.type('png');
    res.send(qr_svg);
  } catch (err) {
    res.status(500).send('Error generating QR code');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
