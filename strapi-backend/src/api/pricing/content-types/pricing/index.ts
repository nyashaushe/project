module.exports = {
  collectionName: 'pricings',
  info: {
    singularName: 'pricing',
    pluralName: 'pricings',
    displayName: 'Pricing',
    description: ''
  },
  options: {
    draftAndPublish: true
  },
  attributes: {
    planName: {
      type: 'string',
      required: true
    },
    price: {
      type: 'decimal',
      required: true
    },
    features: {
      type: 'json'
    },
    isPopular: {
      type: 'boolean',
      default: false
    }
  }
};

export {};