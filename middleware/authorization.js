

async function authorization(req, res, next) {
    try {
        let role = req.user.role;

        if (role === "Admin") {
            next();
        }
        else {
            let { id } = req.params;

            let findPost = await Post.findByPk(id);

            if (!findPost) {
                throw { name: 'NotFound' }
            }

            if (findPost.UserId !== req.user.id) {
                throw { name: "Forbidden" }
            }

            next()
        }

    } catch (error) {
        next(error)
    }
}

module.exports = authorization;