const express = require('express');
const Celebrity = require('../models/celebrity.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  Celebrity.find()
  .then(portfolio => {
    res.render('celebrities/index', {portfolio})
  })
  .catch(err => {
    return next(err);
  })
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.get('/:id/edit', (req, res, next) => {
  const celebId = req.params.id;

  Celebrity.findById(celebId, (err, famous) => {
    if (err) { 
      return next(err); 
    }
    res.render('celebrities/edit', { famous: famous });
  });

})

router.get('/:id', (req, res, next) => {
  const celebId = req.params.id;

  Celebrity.findById(celebId, (err, famous) => {
    if (err) { 
      return next(err); 
    }
    res.render('celebrities/show', { famous: famous });
  });
});

router.post('/', (req, res, next) => {
  const newCelebrity = {
    name: req.body.newcelebrity,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }

  const freshCelebrity = new Celebrity(newCelebrity);

  freshCelebrity.save((err) => {
    if (err){
      return next(err);
    } else {
      res.redirect('/celebrities');
    }
  });
});

router.post('/:id/delete', (req, res, next) => {
  const celebId = req.params.id;

  Celebrity.findByIdAndRemove(celebId, (err, celebrity) => {
    if (err){ 
      return next(err); 
    }
    return res.redirect('/celebrities');
  });
});

router.post('/:id', (req, res, next) => {
  const celebId = req.params.id;

  const updateInfo = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchphrase
  }

  Celebrity.findByIdAndUpdate(celebId, updateInfo, (err, celebrity) => {
    if (err){ 
      return next(err); 
    }
    return res.redirect('/celebrities');
  });
  
})

module.exports = router;
