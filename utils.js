
var _ = {

    extend: function (object, extend) {

        for (var prop in extend) {
            if (extend.hasOwnProperty(prop)) {
                object[prop] = object[prop] || extend[prop];
            }
        }

        return object;
    },



    toArray: function (array) {
        return Array.prototype.slice.call(array);
    },


    events: [],


    listenTo: function (id, callback, scope) {

        _.events[id] = _.events[id] || [];

        if (scope) {
            callback.scope = scope;
        }

        _.events[id].push(callback);
    },


    trigger: function () {

        var args = _.toArray(arguments),
            id = args.shift();

        if (_.events[id] && _.events[id].length) {
            _.events[id].forEach(function (callback) {
                callback.call(callback.scope || this, args);
            }, this);
        }
    },


    repeat: function (callback, scope, time) {

        return setInterval(function () {
            callback.call(scope);
        }, time);
    },


    addClass: function (el, classes) {
        el.className = el.className + classes;
    },

    removeClass: function (el, classes) {

    }


};



