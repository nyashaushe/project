
'use strict';

/**
 * `is-authenticated` policy
 */

module.exports = (policyContext) => {
  // if a session is open
  if (policyContext.state.user) {
    return true;
  }

  // if not, send a 401 error
  return false;
};
