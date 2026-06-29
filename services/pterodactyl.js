require("dotenv").config();
const axios = require("axios");

const api = axios.create({
    baseURL: `${process.env.PTERO_URL}/api/client`,
    headers: {
        Authorization: `Bearer ${process.env.PTERO_API_KEY}`,
        Accept: "Application/vnd.pterodactyl.v1+json",
        "Content-Type": "application/json"
    }
});

async function getResources() {
    const res = await api.get(
        `/servers/${process.env.SERVER_ID}/resources`
    );

    return res.data.attributes;
}

module.exports = {
    getResources
};
