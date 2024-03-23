const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
const port = 3001;

// JSON server router
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// custom api routes
const customRoutes = {
  '/api/energy-types': '/energyTypes',
  '/api/energy-types/:id/offering-form': '/energyTypeFormSchema/:id',
  '/api/energy-offerings': '/energyOfferings',
};

app.use(cors());
app.use((req, res, next) => {
  // sets default timeout just to simulate real api calls
  setTimeout(next, 500);
});
app.use(middlewares);
app.use(jsonServer.bodyParser); // handle POST, PUT and PATCH
app.post('/api/energy-offerings', (req, res) => {
  const db = router.db;
  const offeringsTable = db.get('energyOfferings');

  const newId = offeringsTable.reduce((acc, item) => Math.max(acc, item.id || 0), 0) + 1;
  const newOffering = { ...req.body, id: newId, status: 'OPEN' };
  const result = offeringsTable.push(newOffering).last().write();

  io.emit('offerings:newOffering', newOffering);
  res.status(201).send(result);
});
app.post('/api/energy-offerings/:id/buy', async (req, res) => {
  console.log('Route hit');
  const { id } = req.params;
  const parsedId = Number(id);
  const db = router.db;
  const offeringsTable = db.get('energyOfferings');

  offeringsTable.find({ id: parsedId }).assign({ status: 'PROCESSING' }).write();
  const updatedOffering = offeringsTable.find({ id: parsedId }).value();

  io.emit('offerings:statusProcessing', updatedOffering);

  // simulates an async event processing the request
  setTimeout(() => {
    offeringsTable.find({ id: parsedId }).assign({ status: 'ACCEPTED' }).write();
    const updatedOffering = offeringsTable.find({ id: parsedId }).value();

    io.emit('offerings:statusAccepted', updatedOffering);
  }, 1500);

  res.status(200).send(updatedOffering);
});
app.use(jsonServer.rewriter(customRoutes));
app.use(router);

httpServer.setTimeout(10000);

httpServer.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
