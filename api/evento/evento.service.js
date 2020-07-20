const dbService = require('../../services/db.service')
// const userService = require('../../services/user.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('evento')
    try {
        const eventos = await collection.find(criteria).toArray();
        return eventos
    } catch (err) {
        console.log('ERROR: cannot find events')
        throw err;
    }
}

async function getById(eventoId) {
    const collection = await dbService.getCollection('evento')
    try {
        const evento = await collection.findOne({ "_id": ObjectId(eventoId) })
        //aggergation
            //evento.givenReviews = await userService.query({byOwnerId: ObjectId(evento.owner.id) })
            // evento.givenReviews = evento.givenReviews.map(review => {
                
            //     return review
            // })
        return evento
    } catch (err) {
        console.log(`ERROR: while finding evento ${eventoId}`)
        throw err;
    }
}

async function remove(eventoId) {
    const collection = await dbService.getCollection('evento')
    try {
        await collection.deleteOne({ "_id": ObjectId(eventoId) })
    } catch (err) {
        console.log(`ERROR: cannot remove event ${eventoId}`)
        throw err;
    }
}

async function update(evento) {
    const collection = await dbService.getCollection('evento')
    evento._id = ObjectId(evento._id);

    try {
        await collection.replaceOne({ "_id": evento._id }, { $set: evento })
        return evento
    } catch (err) {
        console.log(`ERROR: cannot update event ${evento._id}`)
        throw err;
    }
}

async function add(evento) {
    const collection = await dbService.getCollection('evento')
    try {
        await collection.insertOne(evento);
        return evento;
    } catch (err) {
        console.log(`ERROR: cannot insert event`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) criteria.name = { $regex: new RegExp(filterBy.name, 'i') };
    if (filterBy.type !== '') criteria.type = filterBy.type;
    if (filterBy.inStock !== '') criteria.inStock = (filterBy.inStock + '' === 'true') ? true : false;

    return criteria;
}



