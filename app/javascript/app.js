require.config({

    shim: {

        jquery_ui: ["jquery"],

        bootstrap: ["jquery"],

        jquery_svg:["jquery"],

        jquery_svgdom: ["jquery_svg"], 

        jquery_svgplot: ["jquery_svg"],        

        underscore: {
            deps: ["jquery"],
            exports: "_"
        },

        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },

        backbone_validation: {
            deps: ["underscore", "backbone"]
        },

        backbone_validation_bootstrap: {
            deps: ["backbone_validation"]
        },

        backbone_localstorage: {
            deps: ["backbone"]
        }

    },

    paths: {

        core: 'core/mediator',
        perms: 'security/permissions',
        sandbox: 'sandbox/facade',

        aura_core: '../../assets/js/aura/mediator',
        aura_perms: '../../assets/js/aura/permissions',
        aura_sandbox: '../../assets/js/aura/facade',

        jquery: "../../assets/js/jquery",
        jquery_svg: "../../assets/js/jquery.svg",
        jquery_svgdom: "../../assets/js/jquery.svgdom",
        jquery_svgplot: "../../assets/js/jquery.svgplot",
        jquery_ui: "../../assets/js/jquery.ui",

        underscore: "../../assets/js/underscore",
        backbone: "../../assets/js/backbone",
        bootstrap: "../../assets/js/bootstrap",
        text: "../../assets/js/text",

        backbone_validation: "../../assets/js/backbone.validation",
        backbone_validation_bootstrap: "../../assets/js/backbone.validation.bootstrap",
        backbone_localstorage: "../../assets/js/backbone.localStorage"
        
    }
});


if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


require(["core", "jquery", "backbone", "backbone_validation", "backbone_validation_bootstrap", "backbone_localstorage", "jquery_svg", "jquery_svgdom", "jquery_ui", "jquery_svgplot", "bootstrap"], function(core, $, Backbone, backbone_validation, backbone_validation_bootstrap, backbone_localstorage, jquery_svg, jquery_svgdom, jquery_ui, jquery_svgplot, bootstrap){

    core.start('routers', "#abcd");

});
