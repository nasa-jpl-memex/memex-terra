var terra = terra || {};

terra.DdAnalysisView = Backbone.View.extend({
    el: '#dd-analysis-overlay',

    initialize: function(options) {
        $('#dd-analysis-overlay').draggable();
        this.render();
    },

    render: function() {
        if (!this.model.get('ddData')) {
            terra.error("No diff in diff data available");
            return;
        }

        terra.d3GroupedBar(_.merge({'selector': '#dd-analysis-overlay .plot',
                                     'eventDate': this.model.getEventDateAsStr()},
                                    this.model.get('ddData')));

        this.$el.show();
    },

    remove: _.wrap(
        Backbone.View.prototype.remove,
        function(parentRemove) {
            parentRemove.apply(this);

            $('body').append('<div id="dd-analysis-overlay"><div id="dd-analysis-overlay-options"></div><div class="plot"></div></div>');
            $('#dd-analysis-overlay').hide();
        }),
});
