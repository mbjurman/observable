define(
    "observable",
    [],
    function() {

        var observable = (function() {

            function hasSubscribers(type) {
                var subscribers = this.subscribers[type];

                return subscribers !== undefined && subscribers !== null && subscribers.length > 0;
            }
            
            function visitSubscribers(action, type, arg) {

                if (!this.hasSubscribers(type)) {
                    return;
                }

                var subscribers = this.subscribers[type],
                    i;

                for (i = 0; i < subscribers.length; i += 1) {
                    if (action === 'publish') {
                        subscribers[i](arg);
                    } else {
                        if (subscribers[i] === arg) {
                            subscribers.splice(i, 1);
                        }
                    }
                }
            }

            function subscribe(type, fn) {
                if (typeof this.subscribers[type] === "undefined") {
                    this.subscribers[type] = [];
                }

                this.subscribers[type].push(fn);
            }

            function publish(type, publication) {
                visitSubscribers.call(this, 'publish', type, publication);
            }

            function unsubscribe(type, fn) {
                visitSubscribers.call(this, 'unsubscribe', type, fn);
            }

            return function() {
                this.subscribers = [];
                this.publish = publish;
                this.subscribe = subscribe;
                this.unsubscribe = unsubscribe;
                this.hasSubscribers = hasSubscribers;
            };
        })();
        
        function makeObservable(obj) {
            observable.call(obj);
        }

        return {
            makeObservable: makeObservable
        };
    }
);