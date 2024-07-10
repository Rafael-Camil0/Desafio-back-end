const knex = require('../database/knex/index.js')
const AppError = require('../utils/AppError.js')




class MovieNotes {
    async create(request,response){
        const {title,description,rating,tags} = request.body
        const{user_id} = request.params
        

        if(rating < 0 || rating > 5||!rating){
            throw new AppError("O 'rating' tem que estar entre 0 e 5",400)
        }
        if(tags.length == 0){
            throw new AppError("É necessario anexar ao menos uma Tag",400) 
        }
       
        const [id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id

        })
    
        
        const tagsEntitys = tags.map(tag => {
            return{
            note_id:id,
            user_id,
            name:tag
        }
       

        }) 
        await knex('movie_tags').insert(tagsEntitys)
        response.json()
    }
    async update(request,response){
        const {title,description,rating,tags} = request.body 
        const {id} = request.params
        if(rating < 0 || rating > 5){
            throw new AppError("O 'rating' tem que estar entre 0 e 5",400)
        }
        if(tags.length == 0){
            throw new AppError("É necessario anexar ao menos uma Tag",400) 
        }
        const note = await knex('movie_notes').where({id}).first()

        if(!note){
            throw new AppError("Nota do filme não encontrada",404) 
        }
       
        note.title = title??note.title
        note.description = description??note.description
        note.rating = rating??note.rating
        note.updated_at = knex.fn.now()

        response.json(note)

    }
    async findByid(request,response){
        const {id} = request.params

       

        const note = await knex("movie_notes").where({id})
        const tags = await knex('movie_tags').where('note_id',id)

        if(!note){
            throw new AppError("Não foi encontrado nenhum nota com este ID",404)
        }

        response.json({
            ...note,
            tags:tags
        })


    }
    async delete(request,response){
        const {id} = request.params

        const note = await knex("movie_notes").where({id}).first()

        if(!note){
            throw new AppError("Não foi encontrado nenhum nota com este ID",404)
        }
        await knex("movie_notes").where({id}).delete()

        response.status(200).send()
    }

}

module.exports = MovieNotes