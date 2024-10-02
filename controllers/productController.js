const { Product } = require('../models');

class ProductController{
    static async getProduct(req, res, next) {
        try {
            const { search, sort, pagination } = req.query;

            const condition = {
                include: {
                    model: User,
                    attributes: {
                        exclude: ["password"]
                    }
                },
                where: {
                    UserId: req.user.id
                }
            }

            if (search) {
                condition.where = {
                    UserId: req.user.id,
                    title: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            if (sort) {
                let order = sort[0] === "-" ? "DESC" : "ASC";

                let orderBy = order === "DESC" ? sort.slice(1) : sort;

                condition.order = [[orderBy, order]]
            }

            let limit = 10;
            let offset = 1;

            if (pagination) {

                if (pagination.size) {
                    limit = pagination.size;
                    condition.limit = limit;
                }


                if (pagination.number) {
                    offset = pagination.number;
                    condition.offset = limit * (offset - 1);
                }
            }

            let products = await Product.findAll(condition);

            res.status(200);
            res.json(products);
            
        } catch (error) {
            next(error);
        }
    }
    
    static async createProduct (req, res, next){
        try {

            await Product.create(req.body);

            res.status(201);
            res.json('success added')
        } catch (error) {
            next(error)
        }
    }

    static async createProduct (req, res, next){
        try {

            await Product.create(req.body);

            res.status(201);
            res.json('success added')
        } catch (error) {
            next(error)
        }
    }
}

module.exports= ProductController