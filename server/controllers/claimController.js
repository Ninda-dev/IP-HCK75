const { Claim } = require('../models');

class ClaimController {
    static async createClaim(req, res, next) {
        try {
            let { id } = req.params;
            await Claim.create({
                UserId: req.user.id,
                ProductId: id
            })

            res.status(201);
            res.json("Success claim");
        } catch (error) {
            next(error)
        }
    }

}
module.exports = ClaimController;