module.exports = {
  collectionName: 'services',
  info: {
    singularName: 'service',
    pluralName: 'services',
    displayName: 'Service',
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