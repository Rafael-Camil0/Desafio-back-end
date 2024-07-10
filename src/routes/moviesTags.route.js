const {Router} = require('express')
const MovieTagsController = require("../controllers/MoviesTagsContoller")

const moviesTagsRouter = Router()
const moviesTagsController = new MovieTagsController()


moviesTagsRouter.get("/",moviesTagsController.findAll)

module.exports = moviesTagsRouter
