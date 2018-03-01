/**
 * Extend the aura-core permissions
 */
define(["aura_perms"], function (permissions) {
    permissions.extend({
        "features-launcher-channel":{
            bootstrap:true,
            "order:show-power-flow-event" : true,
            "order:show-report-of-breaker-status": true,
            "order:show-curve-plotter": true,
            "edit-binary-signals" : true,
        }
    });
  return permissions;
});
