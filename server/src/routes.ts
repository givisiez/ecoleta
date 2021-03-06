import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointController = new PointsController();
const itemsController = new ItemsController();

/* 
    ? ### NOTE ###
    ? index => para uma unica listagem, 
    ? show  => se for único registro, 
    ? create, update, delete
*/

routes.get('/items', itemsController.index);
routes.post('/points', pointController.create);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

export default routes;