
'use strict';

/**
 * comment router
 */

module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/comments/:id/like',
      handler: 'comment.like',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'GET',
      path: '/comments',
      handler: 'comment.find',
    },
    {
      method: 'GET',
      path: '/comments/:id',
      handler: 'comment.findOne',
    },
    {
      method: 'POST',
      path: '/comments',
      handler: 'comment.create',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'PUT',
      path: '/comments/:id',
      handler: 'comment.update',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'DELETE',
      path: '/comments/:id',
      handler: 'comment.delete',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
  ],
};

export {};
