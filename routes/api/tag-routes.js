const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags as well as their respective product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products_of_tag' }] 
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one tag by its id, as well as their respective product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products_of_tag' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id.'});
      return;
    };

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);

    if (!tagData.tag_name) {
      res.status(400).json({ message: 'Please include the name of the tag you would like to add.' });
      return;
    };

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tag by its id value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id.' });
      return;

    } else if (!req.body.tag_name) {
      res.status(400).json({ message: 'Please include a name for the tag you would like to update.' });
      return;
    };

    const newTagData = await tagData.update({ tag_name: `${req.body.tag_name}` });

    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a tag by its id value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    };

    res.status(200).json({ message: 'Tag has successfully been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
