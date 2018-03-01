/**
 * @fileOverview Extend the aura-core mediator
 */
/*jslint sloppy:true*/
/*global define*/
define(["aura_core", "backbone"],
    function (core, Backbone) {
        var mediator = Object.create(core);
        mediator.mvc = Backbone;
        return mediator;
});

