import express from 'express';
import bodyParser from 'body-parser';
import Controller from "./controller";

class App {
  public app: express.Application;
  public port = process.env.PORT || 3000;
  public controller: Controller;

  constructor() {

    this.app = express();
    
    var cors = require('cors');
    this.app.use(cors());
    this.app.options('*', cors());

    this.app.use(bodyParser.json());
    this.controller = new Controller();
    this.initializeControllers();
  }

  private initializeControllers() {
    this.app.use('/', this.controller.router);
  }

  public listen() {
    this.app.listen(this.port, (err: any) => {
      if (err) {
        return console.log(err)
      }
      return console.log(`server is listening on ${this.port}`)
    })
  }
}

export default App;