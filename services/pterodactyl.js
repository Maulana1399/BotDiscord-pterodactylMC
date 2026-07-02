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

// ===========================
// Resource
// ===========================

async function getResources() {

    const res = await api.get(
        `/servers/${process.env.SERVER_ID}/resources`
    );

    return res.data.attributes;

}

// ===========================
// Power
// ===========================

async function power(signal) {

    await api.post(
        `/servers/${process.env.SERVER_ID}/power`,
        {
            signal
        }
    );

}

// ===========================
// Console
// ===========================

async function sendCommand(command) {

    await api.post(
        `/servers/${process.env.SERVER_ID}/command`,
        {
            command
        }
    );

}

// ===========================
// Backup
// ===========================

async function createBackup(name = null) {

    const body = {};

    if (name) {
        body.name = name;
    }

    const res = await api.post(
        `/servers/${process.env.SERVER_ID}/backups`,
        body
    );

    return res.data;

}

async function getBackups() {

    const res = await api.get(
        `/servers/${process.env.SERVER_ID}/backups`
    );

    return res.data.data;

}

// ===========================

module.exports = {

    getResources,

    power,

    sendCommand,

    createBackup,

    getBackups,

};