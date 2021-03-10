import { Request, Response } from 'express';
import knex from '../../database/connection';

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('reciclario_order.tbPointItemList').select('uuid','image','title'); 
      
        const web = process.env.SERVER_WEB_HOST;
        const portServer = process.env.SERVER_PORT;    
        const serializedItems = items.map((item: { uuid: any; title: any; image: any; }) => {    
             
            return {
                id: item.uuid,
                title: item.title,
                image_url: `http://${web}:${portServer}/uploads/${item.image}`,
            };
            
        });  
      
        return response.json(serializedItems);
    }
}

export default ItemsController;