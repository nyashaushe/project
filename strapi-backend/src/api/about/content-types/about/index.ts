module.exports = {
  collectionName: 'abouts',
  info: {
    singularName: 'about',
    pluralName: 'abouts',
    displayName: 'About',
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
    "description": {
      "type": "text"
    }
  }
};

export {};