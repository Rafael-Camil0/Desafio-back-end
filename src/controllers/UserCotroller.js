const{hash} = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const Ajv = require('ajv').default
const ajv = new Ajv({allErrors:true}); 
require("ajv-errors")(ajv)
const validator = require("../schema/validator")


class UserController{
    async create(request,response) {
        const {name,email,password,avatar,novoCampo} = request.body

        
        const isDataValid = await ajv.validate(validator.user, {name,email,password,avatar,novoCampo})

        if ( !isDataValid ) {
            let messages = ajv.errors.map( i => { 
                
               let message = { 
                    property: i.instancePath ||i.params.errors||i.params,
                    message: i.message 
                }

                if( Array.isArray(message.property)){
                    message.property = message.property[0].params
                }

                return message
            })

            response.status(400).json(
                { 
                   status: 400, 
                   message: 'Bad Request, error JSON', 
                   errors: messages ,
                   errorCode: '11005' 
               }
            )
            console.log(ajv.errors)
            return
        }

        const existsEmail = await knex.select('*').from('users').where({email})

        if(existsEmail.length > 0){
            throw new AppError("Ja existe um usuario cadastrado com este e-mail",400)
        }
       
        const hashedPassword = await hash(password,8)

        const user = await knex('users').insert({
            name,email,password:hashedPassword,avatar
        }).returning(["id","name","email","avatar"])

        response.json(user)
    }
    async findByID(request,response){
        const {id} = request.params

        const user = await knex("users").where({id}).first()

        if(!user ){
            throw new AppError("Nenhum usúario cadastro com este ID",404)
        }

        response.json(user)

    }
    async findAll(request,response){

        const users = await knex("users").select(["id","name","email","avatar","created_at","updated_at"])

        response.json(users)
    }
    async delete(request,response){
        const {id} = request.params

        await knex("users").delete().where({id});

        response.status(200).send();

    }
    async update(request,response){
        const {name,email,password,avatar} = request.body
        const {id} = request.params

        const user = await knex("users").select('*').where({id}).first()

        if(!user){
            throw new AppError("Não foi encontrado nenhum usuario cadastrado com este ID", 404)
        }
        const existsEmail = await knex.select('*').from('users').where({email})
        if(existsEmail.length > 1 && existsEmail[0].id != user.id) {
            throw new AppError("Ja existe um usuario cadastrado com este e-mail, tente novamente com outro ",400)
        }
        if(password < 8){
            throw new AppError("A senha do usuario não pode ser menor que 8 digitos", 400)
        }
   
         user.name = name?? user.name;
         user.email = email?? user.email;
         user.password = password?? user.password;
         user.avatar = avatar?? user.avatar;
         user.updated_at = knex.fn.now()

        const userUpdated = await knex("users").where({id}).update(user).returning("*")

        response.status(200).json(userUpdated)

    }
    
}
module.exports = UserController