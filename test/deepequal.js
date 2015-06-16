beforeEach(function() {
    var matchers = {
        toDeepEqual: function(obj) {
            return _.isEqual(this.actual, obj);
        }
    };

    this.addMatchers(matchers);
});