
var _ = {


    /**
     * extend
     * extend props from one object into another
     *
     * @param object {Object}
     * @param extend {Object}
     * @returns {Object}
     */
    extend: function (object, extend) {

        for (var prop in extend) {
            if (extend.hasOwnProperty(prop)) {
                object[prop] = object[prop] || extend[prop];
            }
        }

        return object;
    },


    /**
     * toArray
     * converts array-like objects into arrays
     * @param array
     * @returns {Array}
     */
    toArray: function (array) {
        return Array.prototype.slice.call(array);
    },


    /**
     * events placeholder object
     */
    events: {},


    /**
     * listenTo
     * registers callbacks to be fired when the same identifier is triggered
     *
     * @param id {String}
     * @param callback {Function}
     * @param scope {Object}
     */
    listenTo: function (id, callback, scope) {

        _.events[id] = _.events[id] || [];

        if (scope) {
            callback.scope = scope;
        }

        _.events[id].push(callback);
    },


    /**
     * trigger
     * triggers registered callback in scope if supplied
     */
    trigger: function () {

        var args = _.toArray(arguments),
            id = args.shift();

        if (_.events[id] && _.events[id].length) {
            _.events[id].forEach(function (callback) {
                callback.apply(callback.scope || this, args);
            }, this);
        }
    },


    /**
     * repeat
     * wrapper method for interval to keep callbacks in scope
     *
     * @param callback {Function}
     * @param scope {Object}
     * @param time {Number}
     * @returns {number}
     */
    repeat: function (callback, scope, time) {

        return setInterval(function () {
            callback.call(scope);
        }, time);
    },


    /**
     * addClass
     * simple helper to add class to dom object
     *
     * @param el {Object}
     * @param className {String}
     */
    addClass: function (el, className) {

        if (el) {
            el.className = el.className + ' ' + className;
        }
    },


    removeClass: function (el, className) {}
};



