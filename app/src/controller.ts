import * as express from 'express';

var uuid = require('uuid');

let todos: any[] = [
    { id: uuid.v1(), todo: 'Create Vue.js project', status:false},
    { id: uuid.v1(), todo: 'Run Backend webserver', status:false}
];

class Controller {
    public path = '/todo';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllTodo);
        this.router.get(this.path + "/:id", this.getOneTodo);
        this.router.post(this.path, this.createATodo);
        this.router.patch(this.path + "/:id", this.updateATodo);
        this.router.delete(this.path + "/:id", this.deleteTodo);
    }

    getAllTodo = (request: express.Request, response: express.Response) => {
        response.send(todos);
    }

    getOneTodo = (request: express.Request, response: express.Response) => {
        let id: number = request.params.id;
        let todo: any = todos.filter(ele => ele.id == id)[0];
        if (todo) {
            response.send(todo);
        } else {
            response.send("Todo not Found.");
        }
    }

    deleteTodo = (request: express.Request, response: express.Response) => {
        let id: number = request.params.id;
        let todo: any = todos.filter(ele => ele.id == id)[0];
        if (todo) {
            todos.splice(todos.indexOf(todo), 1);
            response.send(true);
        } else {
            response.send(false);
        }
    }

    createATodo = (request: express.Request, response: express.Response) => {
        const todo: any = request.body;
        todo.id = uuid.v1(); //todos.length + 1;
        todos.push(todo);
        response.send(todo);
    }

    updateATodo = (request: express.Request, response: express.Response) => {
        let id: number = request.params.id;
        const data: any = request.body;
        let todo: any = todos.filter(ele => ele.id == id)[0];
        if (todo) {
            data.id = todo.id;
            todos[todos.indexOf(todo)] = data;
            response.send(true);
        }
        response.send(false);
    }
}

export default Controller;