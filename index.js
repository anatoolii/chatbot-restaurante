const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Hola desde el chatbot del restaurante!');
});

// Endpoint para Dialogflow
app.post('/', (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  let responseText = 'No entendí eso.';

  if (intentName === 'saludo') {
    responseText = '¡Hola! ¿En qué puedo ayudarte?';
  }

  res.json({
    fulfillmentText: responseText,
  });
});

// Endpoint para Twilio
app.post('/twilio-webhook', (req, res) => {
  const msg = req.body.Body;
  const from = req.body.From;

  console.log(`Mensaje de ${from}: ${msg}`);

  const twiml = `<Response><Message>Hola, recibimos tu mensaje: ${msg}</Message></Response>`;

  res.type('text/xml');
  res.send(twiml);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
