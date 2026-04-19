import Joi from "joi";

export const hofSchemas = {
    // GET /hof/:id - Get single Hall of Fame
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },

    // PUT /hof/:id - Update Hall of Fame
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty"
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(1).optional().messages({
                "string.base": "\"name\" must be string"
            }),
            inductionYear: Joi.number().integer().min(0).optional().messages({
                "number.base": "\"inductionYear\" must be a number",
                "number.integer": "\"inductionYear\" must be an integer",
                "number.min": "\"inductionYear\" must be at least 0",
            }),
            achievements: Joi.array().items(Joi.string().min(1)).min(3).optional().messages({
                "array.base": "\"achievements\" must be an array",
                "array.min": "\"achievements\" must have at least 3 achievements"
            }),
            description: Joi.string().min(1).optional().messages({
                "string.base": "\"description\" must be string"
            })
       }),
    },

    // DELETE /hof/:id - Delete Hall of Fame 
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },

    // GET /hof - List hall of fame with filtering
    list: {
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(10)
        }),
    },
};