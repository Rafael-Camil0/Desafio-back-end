const Router = require("express")

const userRoutes = require('./user.route')
const movieNotesRouter = require('./moviesNotes.route')
const movieTagsRouter = require('./moviesTags.route')

const routes = Router();


routes.use('/users',userRoutes)
routes.use('/movies-notes',movieNotesRouter)
routes.use('/movies-tags',movieTagsRouter)

module.exports = routes