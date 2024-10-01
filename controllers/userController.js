const { User } = require('../models');
const { comparePass } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');

class UserController {

    static async addUser(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address } = req.body;

            await User.create({ username, email, password, phoneNumber, address });

            res.status(201);
            res.json({ username, email, phoneNumber, address })

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body;

            if (!email || !password) {
                throw { name: "SequelizeValidationError" }
            }

            const findUser = await User.findOne({ where: { email } })

            if (!findUser) {
                throw { name: "InvalidEmailOrPassword" }
            }

            const compare = comparePass(password, findUser.password);

            if (!compare) {
                throw { name: "InvalidEmailOrPassword" }
            }

            const payload = {
                id: findUser.id
            }

            const access_token = signToken(payload);

            res.status(200).json({access_token});
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController