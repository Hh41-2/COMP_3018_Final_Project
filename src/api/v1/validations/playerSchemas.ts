import Joi from "joi";

export const playerSchemas = {
    // POST /players - Create new player
    create: {
        body: Joi.object({
            name: Joi.string().min(1).required().messages({
                "any.required": "\"name\" is required",
                "string.base": "\"name\" must be string"
            }),
            position: Joi.string().valid("Goalkeeper", "Defender", "Midfielder","Striker").required().messages({
                "any.required": "\"position\" is required",
                "string.base": "\"position\" must be a string",
                "any.only": "\"position\" must be one of [Goalkeeper, Defender, Midfielder, Striker]"
            }),
            dateOfBirth: Joi.string().length(10).required().messages({
                "any.required": "\"dateOfBirth\" is required",
                "string.base": "\"dateOfBirth\" must be a string",
                "string.length": "\"dateOfBirth\" must be exactly 10 characters (YYYY-MM-DD)",
            }),
            country: Joi.string().min(1).required().messages({
                "any.required": "\"country\" is required",
                "string.base": "\"country\" must be a string",
            }),
            era: Joi.string().min(1).required().messages({
                "any.required": "\"era\" is required",
                "string.base": "\"era\" must be a string",
            }),
            teams: Joi.array().items(Joi.string().min(1)).min(1).required().messages({
                "any.required": "\"teams\" is required",
                "array.base": "\"teams\" must be an array",
                "array.min": "\"teams\" must have at least 1 item",
            }),
            goals: Joi.number().integer().min(0).required().messages({
                "any.required": "\"goals\" is required",
                "number.base": "\"goals\" must be a number",
                "number.integer": "\"goals\" must be an integer",
                "number.min": "\"goals\" must be at least 0",
            }),
            appearances: Joi.number().integer().min(0).required().messages({
                "any.required": "\"appearances\" is required",
                "number.base": "\"appearances\" must be a number",
                "number.integer": "\"appearances\" must be an integer",
                "number.min": "\"appearances\" must be at least 0",
            }),
            assists: Joi.number().integer().min(0).required().messages({
                "any.required": "\"assists\" is required",
                "number.base": "\"assists\" must be a number",
                "number.integer": "\"assists\" must be an integer",
                "number.min": "\"assists\" must be at least 0",
            }),
            achievements: Joi.array().items(Joi.string().min(1)).required().messages({
                "any.required": "\"achievements\" is required",
                "array.base": "\"achievements\" must be an array"
            })
        }),
    },

    // GET /players/:id - Get single player
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },

    // PUT /players/:id - Update player
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty"
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(1).optional().messages({
                "string.base": "\"name\" must be a string",
            }),
            position: Joi.string().valid("Goalkeeper", "Defender", "Midfielder","Striker").optional().messages({
                "string.base": "\"position\" must be a string",
                "any.only": "\"position\" must be one of [Goalkeeper, Defender, Midfielder, Striker]"
            }),
            dateOfBirth: Joi.string().length(10).optional().messages({
                "string.base": "\"dateOfBirth\" must be a string",
                "string.length": "\"dateOfBirth\" must be exactly 8 characters (YYYY-MM-DD)",
            }),
            country: Joi.string().min(1).optional().messages({
                "string.base": "\"country\" must be a string",
            }),
            era: Joi.string().min(1).optional().messages({
                "string.base": "\"era\" must be a string",
            }),
            teams: Joi.array().items(Joi.string().min(1)).min(1).optional().messages({
                "array.base": "\"teams\" must be an array",
                "array.min": "\"teams\" must have at least 1 item",
              }),
            goals: Joi.number().integer().min(0).optional().messages({
                "number.base": "\"goals\" must be a number",
                "number.integer": "\"goals\" must be an integer",
                "number.min": "\"goals\" must be at least 0",
            }),
            appearances: Joi.number().integer().min(0).optional().messages({
                "number.base": "\"appearances\" must be a number",
                "number.integer": "\"appearances\" must be an integer",
                "number.min": "\"appearances\" must be at least 0",
            }),
            assists: Joi.number().integer().min(0).optional().messages({
                "number.base": "\"assists\" must be a number",
                "number.integer": "\"assists\" must be an integer",
                "number.min": "\"assists\" must be at least 0",
            }),
            achievements: Joi.array().items(Joi.string().min(1)).optional().messages({
                "array.base": "\"achievements\" must be an array"
            })
        }),
    },

    // DELETE /players/:id - Delete player
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },

    // GET /players - List players with filtering
    list: {
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(10)
        }),
    },
};