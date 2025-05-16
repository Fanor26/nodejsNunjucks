const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  deleteSubItem,
} = require('../middlewares/crudMiddleware');
const { deleteItemsBulk } = require('../middlewares/bulkCrudMiddleware');
const { modelsMap, refMap } = require('../config/modelsMap');

// DELETE subdocumento dinámico
router.delete('/:id/:subId', async (req, res) => {
  const { type, field } = req.query;
  const Model = modelsMap[type];

  if (!Model || !field) {
    return res
      .status(400)
      .json({ success: false, error: 'Tipo o campo no válido' });
  }

  const handler = deleteSubItem(Model, field);
  return handler(req, res);
});

// GET ALL dinámico
router.get('/getAll', async (req, res) => {
  const { type } = req.query;
  const Model = modelsMap[type];

  if (!Model) {
    return res
      .status(400)
      .json({ success: false, error: 'Tipo de modelo no válido' });
  }

  const populateFields = refMap[type] || [];
  const handler = getAllItems(Model, populateFields);
  return handler(req, res);
});

// DELETE único dinámico
router.delete('/:id', (req, res, next) => {
  const { type } = req.query;
  const Model = modelsMap[type];

  if (!Model) {
    return res
      .status(400)
      .json({ success: false, error: 'Tipo de modelo no válido' });
  }

  return deleteItem(Model)(req, res, next);
});

// DELETE BULK dinámico
router.post('/delete-bulk', (req, res, next) => {
  const { type } = req.query;
  const Model = modelsMap[type];

  if (!Model) {
    return res
      .status(400)
      .json({ success: false, error: 'Tipo de modelo no válido' });
  }

  return deleteItemsBulk(Model)(req, res, next);
});

// CREATE específicos
router.post('/create-user', createItem(modelsMap.User));
router.post('/create-service', createItem(modelsMap.Service));
router.post('/create-specialty', createItem(modelsMap.Specialty));

// GET por ID
router.get('/permission/:id', getItemById(modelsMap.Permission));
router.get('/user/:id', getItemById(modelsMap.User));
router.get('/service/:id', getItemById(modelsMap.Service));
router.get('/specialty/:id', getItemById(modelsMap.Specialty));

// UPDATE
router.put('/update-user/:id', updateItem(modelsMap.User));
router.put('/update-service/:id', updateItem(modelsMap.Service));
router.put('/update-specialty/:id', updateItem(modelsMap.Specialty));

module.exports = router;
