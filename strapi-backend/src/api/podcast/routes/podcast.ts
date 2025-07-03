export default {
  routes: [
    {
      method: 'GET',
      path: '/podcasts',
      handler: 'podcast.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/podcasts/:id',
      handler: 'podcast.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/podcasts',
      handler: 'podcast.create',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'PUT',
      path: '/podcasts/:id',
      handler: 'podcast.update',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'DELETE',
      path: '/podcasts/:id',
      handler: 'podcast.delete',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'PUT',
      path: '/podcasts/:id/like',
      handler: 'podcast.like',
      config: {
        policies: ['global::is-authenticated'],
      },
    }
  ],
};