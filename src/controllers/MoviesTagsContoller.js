const knex = require("../database/knex")


class MovieTags {
    async findAll(request,response){

        const tags = await knex("movie_tags").select("*")

        response.json(tags)
    }
}
module.exports = MovieTags