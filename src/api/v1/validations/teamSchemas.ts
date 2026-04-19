import Joi from "joi";

export const teamSchemas = {
    // POST /team - Create new team
    create: {
        body: Joi.object({
            name: Joi.string().min(1).required().messages({
                "any.required": "\"name\" is required",
                "string.base": "\"name\" must be a string",
            }),
            league: Joi.string().min(1).required().messages({
                "any.required": "\"league\" is required",
                "string.base": "\"league\" must be a string",
            }),
            founded: Joi.number().integer().min(1800).required().messages({
                "any.required": "\"founded\" is required",
                "number.base": "\"founded\" must be a number",
                "number.integer": "\"founded\" must be an integer",
                "number.min": "\"founded\" must be at least 1800"
            }),
            achievements: Joi.array().items(Joi.string()).required().messages({
                "any.required": "\"achievements\" is required",
                "array.base": "\"achievements\" must be an array",
            }),
            players: Joi.number().integer().min(11).max(30).required().messages({
                "any.required": "\"players\" is required",
                "number.base": "\"players\" must be a number",
                "number.integer": "\"players\" must be an integer",
                "number.min": "\"players\" must be at least 11",
                "number.max": "\"players\" must not exceed 30",
            })
        }),
    },

    // GET /teams/:id - Get single team
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },

    // PUT /teams/:id - Update team
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty"
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(1).optional().messages({
                "string.base": "\"name\" must be a string"
            }),
            league: Joi.string().min(1).optional().messages({
                "string.base": "\"league\" must be a string"
            }),
            founded: Joi.number().min(1800).optional().messages({
                "number.base": "\"founded\" must be a number",
                "number.integer": "\"founded\" must be an integer",
                "number.min": "\"founded\" must be at least 1800"
            }),
            achievements: Joi.array().items(Joi.string()).optional().messages({
                "array.base": "\"achievements\" must be an array"
            }),
            players: Joi.number().integer().min(11).max(30).optional().messages({
                "number.base": "\"players\" must be a number",
                "number.integer": "\"players\" must be an integer",
                "number.min": "\"players\" must be at least 11",
                "number.max": "\"players\" must be not exceed 30"
            })
       }),
    },

    // DELETE /teams/:id - Delete team
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },

    // GET /teams - List teams with filtering
    list: {
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(10)
        }),
    },
};