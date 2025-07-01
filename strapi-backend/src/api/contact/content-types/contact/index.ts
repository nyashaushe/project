module.exports = {
  collectionName: 'contacts',
  info: {
    singularName: 'contact',
    pluralName: 'contacts',
    displayName: 'Contact',
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
    email: {
      type: 'email',
      required: true
    },
    message: {
      type: 'text',
      required: true
    }
  }
};

export {};