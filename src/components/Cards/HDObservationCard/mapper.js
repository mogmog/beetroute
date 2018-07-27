const db = require('./db')
const JM = require('json-mapper');

const mapping = {
  title       :  'factbook.name',
  subtitle    :  'factbook.people.population.total',
  subsubtitle :  'data.people.languages.language',
  map         :   'map'
};

const merge = db.mergeObject({component : 'CountryInfoCard', data : {}, key : {type : 'question', id : 1}});

//db.addAsync('Estonia').then((response) =>  JM.makeConverter(mapping)(response)).then(merge).then(db.createCard);

db.addAsync('France').then((response) =>  JM.makeConverter(mapping)(response)).then(merge).then(db.createCard);

db.addAsync('Germany').then((response) =>  JM.makeConverter(mapping)(response)).then(merge).then(db.createCard);














