module.exports = {
  collectionName: 'stats',
  info: {
    singularName: 'stat',
    pluralName: 'stats',
    displayName: 'Stat',
    description: ''
  },
  options: {
    draftAndPublish: true
  },
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    value: {
      type: 'string',
      required: true
    }
  }
};

export {};