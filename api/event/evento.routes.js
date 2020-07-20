const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getEvento, getEventos, deleteEvento, updateEvento, addEvento } = require('./evento.controller')
const router = express.Router()

router.get('/', getEventos);
router.get('/:id', getEvento);
// router.put('/:id', updateToy);
router.post('/', addEvento);
// router.delete('/:id', deleteToy);
router.put('/:id', requireAuth, updateEvento)
router.delete('/:id', requireAuth, requireAdmin, deleteEvento)

module.exports = router