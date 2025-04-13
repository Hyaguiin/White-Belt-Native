"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./api/App");
require("dotenv/config");
const PORT = process.env.PORT;
App_1.app.listen(PORT, () => {
    try {
        console.log(`Servidor rodando na porta: ${PORT}`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Servidor não rodou: ${err.message}`);
        }
        else {
            console.error(`Não se sabe a procedencia do erro`);
        }
    }
    ;
});
