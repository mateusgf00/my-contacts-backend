const { response } = require('express');
const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController{

    async index(request, response){
       const contacts =  await ContactsReposotory.findAll();

       response.json(contacts);
    }

    async show(request, response){
        const {id} = request.params;
        const contact = await ContactsReposotory.findById(id);

        if(!contact){
            return response.status(404).json({error: 'User not found'})
        }

        response.json(contact)

    }
    async store(request, response){
        const {name, email, phone, category_id} = request.body;

        if(!name){
            return response.status(400).json({error: "Name is required"});
        }

        const ContactExists = await ContactsRepository.findByEmail(email);

        if(ContactExists){
            return response.status(400).json({error: "this email already exists"})
        }

        const contact = await ContactsRepository.create({
            name, email, phone, category_id
        });

        response.json(contact);
    }
    update(){

    }
    async delete(request, response){
        const {id} = request.params;

        const contact = await ContactsRepository.findById(id);

        if(!contact){
            return response.status(404).json({error: 'User not found'})
        }

        await ContactsReposotory.delete(id);
        response.sendStatus(204);
    }

}

module.exports = new ContactController();
