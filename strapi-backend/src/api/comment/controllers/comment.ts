
'use strict';

/**
 * comment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.params;

    const comment = await strapi.entityService.findOne('api::comment.comment', id);

    if (!comment) {
      return ctx.notFound('Comment not found');
    }

    const newLikes = (comment.likes || 0) + 1;

    const updatedComment = await strapi.entityService.update('api::comment.comment', id, {
      data: {
        likes: newLikes,
      },
    });

    return updatedComment;
  },
}));

export {};
