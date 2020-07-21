//importes
const express = require('express');

//Controlles <--
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const OccupationsController = require('./controllers/OccupationController');
const WorkShiftController = require('./controllers/WorkShiftController');
const SectorController = require('./controllers/SectorController');
const EmployeeController = require('./controllers/EmployeeController');
const ClientController = require('./controllers/ClientController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const OrderProductController = require('./controllers/OrderProductController');


//Funcionalidades de rotas do express
const routes = express.Router();


        // ROTAS <==

//Rotas de CADASTRO de usuários <--
routes.post('/users' , UserController.create);
routes.get('/users' , UserController.list);
//Rotas de LOGIN de usuários <--
routes.post('/login' , SessionController.create);
//Rotas de CRUD de CARGOS <--
routes.post('/occupations' , OccupationsController.create);
routes.get('/occupations' , OccupationsController.list);
routes.delete('/occupations/:id' , OccupationsController.delete);
routes.put('/occupations/:id' , OccupationsController.edit);
//Rotas de CRUD de TURNOS de trabalho <--
routes.post('/workShift' , WorkShiftController.create);
routes.get('/workShift' , WorkShiftController.list);
routes.delete('/workShift/:id' , WorkShiftController.delete);
routes.put('/workShift/:id' , WorkShiftController.edit);
//Rotas de CRUD de SETORES de trabalho <--
routes.post('/sector' , SectorController.create);
routes.get('/sector' , SectorController.list);
routes.delete('/sector/:id' , SectorController.delete);
routes.put('/sector/:id' , SectorController.edit);
//Rotas de CRUD dos FUNCIONÁRIOS <--
routes.post('/employee' , EmployeeController.create);
routes.get('/employee' , EmployeeController.list);
routes.put('/employee/:id' ,EmployeeController.edit);
routes.delete('/employee/:id' , EmployeeController.delete);
//Rotas de CRUD Clientes <--
routes.post('/client' , ClientController.create);
routes.get('/client' , ClientController.list);
routes.put('/client/:CPF' , ClientController.edit);
routes.delete('/client/:CPF' , ClientController.delete);
//Rotas de CRUD Produtos <--
routes.post('/product' , ProductController.create);
routes.get('/product' , ProductController.list);
routes.put('/product/:id' , ProductController.edit);
routes.delete('/product/:id' , ProductController.delete);
//Rotas de CRUD Pedidos <--
routes.post('/order' , OrderController.create);
routes.get('/order' , OrderController.list);
routes.put('/order/:id' , OrderController.edit);
routes.delete('/order/:id' , OrderController.delete);
//Rotas de CRUD Produtos do Pedido <--
routes.post('/order/product' , OrderProductController.create);
routes.get('/order/:id/product' , OrderProductController.list);
routes.put('/order/:orderId/product/:productId' , OrderProductController.edit);
routes.delete('/order/:orderId/product/:productId' , OrderProductController.delete);


module.exports = routes;