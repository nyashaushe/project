module.exports = {
  collectionName: 'techstacks',
  info: {
    singularName: 'techstack',
    pluralName: 'techstacks',
    displayName: 'Tech Stack',
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
    icon: {
      type: 'string'
    }
  }
};

export {};