'use strict';

/**
 * techstack service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::techstack.techstack');

export {};