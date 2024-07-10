const {Router} = require("express")

const UserController = require('../controllers/UserCotroller')

const userRoutes = Router();

const userController = new UserController()

userRoutes.post('/',userController.create)
userRoutes.get('/:id',userController.findByID)
userRoutes.get('/',userController.findAll)
userRoutes.delete('/:id',userController.delete)
userRoutes.put('/:id',userController.update)

module.exports = userRoutes;

