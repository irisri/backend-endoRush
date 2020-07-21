const eventoService = require('./evento.service')
const logger = require('../../services/logger.service')

async function getEvento(req, res) {
    const evento = await eventoService.getById(req.params.id)
    res.json(evento)
}

async function getEventos(req, res) {
    try {
        const eventos = await eventoService.query(req.query)
        // console.log('controller1', eventos);
        res.send(eventos)
    } catch (err) {
        throw err;
    }
    // logger.debug(eventos);
}

async function deleteEvento(req, res) {
    await eventoService.remove(req.params.id)
    res.end()
}

async function updateEvento(req, res) {
    const evento = req.body;
    await eventoService.update(evento)
    res.json(evento)
}

async function addEvento(req, res) {
    const evento = req.body;
    await eventoService.add(evento)
    res.json(evento)
}

module.exports = {
    getEvento,
    getEventos,
    deleteEvento,
    updateEvento,
    addEvento
}