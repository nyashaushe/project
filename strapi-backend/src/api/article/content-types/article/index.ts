module.exports = {
  collectionName: 'articles',
  info: {
    singularName: 'article',
    pluralName: 'articles',
    displayName: 'Article',
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
    author: {
      type: 'string'
    },
    publishedAt: {
      type: 'datetime'
    }
  }
};

export {};