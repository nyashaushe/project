'use strict';

/**
 * podcast controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::podcast.podcast', ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.params;

    const podcast = await strapi.entityService.findOne('api::podcast.podcast', id);

    if (!podcast) {
      return ctx.notFound('Podcast not found');
    }

    const newLikes = (podcast.likes || 0) + 1;

    const updatedPodcast = await strapi.entityService.update('api::podcast.podcast', id, {
      data: {
        likes: newLikes,
      },
    });

    return updatedPodcast;
  },
}));

export {};