import * as express from 'express';
import * as ws from 'ws';
import { v4 as uuid } from 'uuid';
import { createConnection, Connection } from 'typeorm';
// import * as morgan from 'morgan';
// import * as passport from 'passport';
// import * as expressWs from 'express-ws';
import { cookieMonster, tokenParser, queryMonster } from './middleware';
import beConfig from '../beConfig';
// import promRouter from './routes/prometheus';

export class App {
  private static app = express();
  private static port = beConfig.server.port;
  private static mongoConnection: Connection;

  private static initServer(): void {
    // const globalHttpsOptions = require('https').globalAgent.options;
    // globalHttpsOptions.rejectUnauthorized = false;
    // this.app.use('/', promRouter); // Prometheus endpoint should work without token
    const { default: router } = require('./routes');
    this.app.disable('x-powered-by');
    // this.app.use(morgan(beConfig.logger.type));
    // if (beConfig.beAuthOn !== 'false') {
      this.app.use(cookieMonster);
      this.app.use(queryMonster);
      this.app.use(tokenParser);
    // }

    // not use in production
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
      next();
    });

    this.app.use('/', router);
    this.app.use((req, res, next) => {
      const err = new Error('Page Not Found');
      const propName = 'status';
      err[propName] = 404;
      next(err);
    });
  }

  private static async connectToMongo(): Promise<void> {
      this.mongoConnection = await createConnection(beConfig.connectionsName.toMongo);
      console.log(`${new Date()} be-guitar created connection to MongoDB!`);
  }

  private static closeConnections() {
    if (this.mongoConnection && this.mongoConnection.isConnected) this.mongoConnection.close();
  }

  private static initWebSocketServer(): void {
    const wsClients = {};
    const wsMessages = [];
    const wss = new ws.Server({port: 8000});
    wss.on('connection', ws => {
      ws.on('error', err => console.error(err));

      const clientId = uuid();
      wsClients[clientId] = ws;

      console.log(`New WebSocket client is ${clientId}.`);

      // new chat client get all chat history
      ws.send(JSON.stringify(wsMessages));

      ws.on('message', rawMessage => {
        const decodedBuffer = Buffer.from(rawMessage, 'base64').toString('utf-8');
        const { name, message } = JSON.parse(JSON.parse(decodedBuffer)).data;
        console.log('--test-- data: ', name, message);
        wsMessages.push({name, message});
        for (let id in wsClients) {
          // if (id !== clientId) {
            wsClients[id].send(JSON.stringify([{name, message}]));
          // }
        }
      });

      ws.on('close', () => {
        delete wsClients[clientId];
        console.log(`WebSocket client  ${clientId} is closed.`);
      });
    });
  }

  public static async start(): Promise<void> {
    console.log(`${new Date()} be-guitar is starting...`);
    try {
      if (!this.mongoConnection) {
        await this.connectToMongo()
      }
      this.initServer();
      this.initWebSocketServer();
      this.app.listen(this.port, () => {
        console.log(`${new Date()} be-guitar is up and running on port ${this.port}!`);
      });
    } catch (e) {
      console.log(`Error while starting be-guitar!\n${e}`);
      if (this.mongoConnection && this.mongoConnection.isConnected) {
        this.closeConnections();
      }

    }
  }
}