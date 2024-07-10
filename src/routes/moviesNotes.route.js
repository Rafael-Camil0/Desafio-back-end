const {Router} = require("express")
const MovieNotesController = require('../controllers/MovieNotesContoller')

const moviesNotesRouter = Router()
const movieNotesController = new MovieNotesController()

moviesNotesRouter.post("/:user_id",movieNotesController.create )
moviesNotesRouter.put("/:id",movieNotesController.update )
moviesNotesRouter.get("/:id",movieNotesController.findByid )
moviesNotesRouter.delete("/:id",movieNotesController.delete )
module.exports = moviesNotesRouter

