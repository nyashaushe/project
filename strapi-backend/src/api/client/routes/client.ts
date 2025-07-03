export default {
  routes: [
    {
      method: 'GET',
      path: '/clients',
      handler: 'client.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/clients/:id',
      handler: 'client.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/clients',
      handler: 'client.create',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'PUT',
      path: '/clients/:id',
      handler: 'client.update',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'DELETE',
      path: '/clients/:id',
      handler: 'client.delete',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
  ],
};
