const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getEvento, getEventos, deleteEvento, updateEvento, addEvento } = require('./evento.controller')
const router = express.Router()

router.get('/', getEventos);
router.get('/:id', getEvento);
router.post('/', addEvento);
router.put('/:id', updateEvento)
router.delete('/:id', deleteEvento)

module.exports = router