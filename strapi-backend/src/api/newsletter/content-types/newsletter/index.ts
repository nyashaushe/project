module.exports = {
  collectionName: 'newsletters',
  info: {
    singularName: 'newsletter',
    pluralName: 'newsletters',
    displayName: 'Newsletter',
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
    content: {
      type: 'richtext'
    },
    publishedAt: {
      type: 'datetime'
    }
  }
};

export {};