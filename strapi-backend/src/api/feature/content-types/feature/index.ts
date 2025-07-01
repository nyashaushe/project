module.exports = {
  collectionName: 'features',
  info: {
    singularName: 'feature',
    pluralName: 'features',
    displayName: 'Feature',
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
    description: {
      type: 'text'
    },
    icon: {
      type: 'string'
    }
  }
};

export {};