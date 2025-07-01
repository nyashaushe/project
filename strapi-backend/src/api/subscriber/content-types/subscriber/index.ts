module.exports = {
  collectionName: 'subscribers',
  info: {
    singularName: 'subscriber',
    pluralName: 'subscribers',
    displayName: 'Subscriber',
    description: ''
  },
  options: {
    draftAndPublish: true
  },
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    }
  }
};

export {};