const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')

router.get('/search', siteController.getSearch)
router.post('/searchItem', siteController.search)
router.get('/', siteController.index)

module.exports = router
