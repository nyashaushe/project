module.exports = {
  collectionName: 'blogs',
  info: {
    singularName: 'blog',
    pluralName: 'blogs',
    displayName: 'Blog',
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
    content: {
      type: 'richtext'
    },
    author: {
      type: 'string'
    },
    publishedAt: {
      type: 'datetime'
    },
    slug: {
      type: 'uid',
      targetField: 'title'
    }
  }
};

export {};