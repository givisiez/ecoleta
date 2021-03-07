import { Request, Response } from 'express';
import knex from '../../database/connection';

class PointsController {
    async index (request: Request, response: Response) {
      const { city, state, items } = request.query;

       const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

      const points = await knex('tbPoint')
       .join('tbPointItem', 'tbPoint.idPoint', '=', 'tbPointItem.idPoint')
        .whereIn('tbPointItem.idItem', parsedItems)
        .where('city', String(city))
        .where('state', String(state))
        .distinct()
        .select('tbPoint.*');

        return response.json({ 'sucess': 1, points });
    }

    async show (request: Request, response: Response) {
        const { id } = request.params;      

        // const pointId = await knex('tbPoint').where('uuid', id).select('uuid').first();

        /* 
        const parsedId = 
        parsedId.map(item => String(item.trim()));

        console.log(parsedId); */
        
        const point = await knex('tbPoint').where('idPoint', id).select(
            'uuid',
            'image',
            'name',
            'latitude',
            'longitude',
            'city',
            'state'
        ).first();

        if(!point) {
            return response.status(400).json({'sucess': 0, 'msg': 'Ponto não encontrado!'});
        }

        const items = await knex('tbItem')
        .join('tbPointItem','tbPointItem.idItem', '=', 'tbItem.idItem')
        .where('tbPointItem.idPoint', id)
        .select('tbItem.title');

        return response.json({ 'sucess': 1, point, items });
    }

    async create (request: Request, response: Response) { 
    
        const {       
            name,
            email,
            phone,
            latitude,
            longitude,
            city,
            state,
            items
        } = request.body;
    
        const trx = await knex.transaction();
        
        const point = {        
            image: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=1',       
            name,
            email,
            phone,
            latitude,
            longitude,
            city,
            state
        }
        
        try {
            // TODO: Adicionar em uma procedure
            const insertedtIds = await trx('tbPoint').insert(point);
    
            const idPoint = insertedtIds[0];
    
            // TODO: Adicionar em uma procedure para passar o UUID na transacao
            const pointItems = items.map((idItem: number) => {       
                return {
                    idItem,
                    idPoint
                }
            });   
    
            await trx('tbPointItem').insert(pointItems); 
    
            trx.commit();
    
        } catch (error) {
            trx.rollback();
    
            return response.json({ 'success': 0 , 'msg': 'Erro ao salvar os dados no banco!'});
        } 
    
        return response.json({ 'success': 1, 'msg': 'Cadastro realizado com sucesso!'});
        // return response.json({ 'success': 1, 'msg': 'Cadastro realizado com sucesso!', ...point });
    }
}

export default PointsController;