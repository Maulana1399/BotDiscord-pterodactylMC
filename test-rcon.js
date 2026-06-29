require("dotenv").config();

const { run } = require("./services/rcon");

(async () => {
    try {
        const result = await run("list");
        console.log(result);
    } catch (err) {
        console.error(err);
    }
})();
