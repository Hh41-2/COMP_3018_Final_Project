import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for the Task Management application.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                player: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        position: { type: "string", enum: ["Goalkeeper", "Defender", "Midfielder", "Striker"] },
                        dateOfBirth: { type: "string" },
                        country: { type: "string" },
                        era: { type: "string" },
                        teams: { type: "array", items: { type: "string" } },
                        goals: { type: "number" },
                        appearances: { type: "number" },
                        assists: { type: "number" },
                        achievements: { type: "array", items: { type: "string" } },
                        image: { type: "string" }
                    }
                },
                hof: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        inductionYear: { type: "integer" },
                        achievements: { type: "array", items: { type: "string" } },
                        description: { type: "string" },
                        image: { type: "string" }
                    }
                },
                team: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        league: { type: "string" },
                        founded: { type: "integer" },
                        achievements: { type: "array", items: { type: "string" } },
                        players: { type: "integer" }
                    }
                },
                error: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                        code: { type: "string" }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts"], // Path to the API docs and schemas
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};