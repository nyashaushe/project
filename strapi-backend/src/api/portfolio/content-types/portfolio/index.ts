module.exports = {
  collectionName: 'portfolios',
  info: {
    singularName: 'portfolio',
    pluralName: 'portfolios',
    displayName: 'Portfolio',
    description: ''
  },
  options: {
    draftAndPublish: true
  },
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'text'
    },
    image: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: [
        'images'
      ]
    },
    link: {
      type: 'string'
    }
  }
};

export {};