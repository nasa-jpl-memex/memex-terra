var terra = terra || {};

terra.DdAnalysisView = Backbone.View.extend({
    el: '#dd-analysis-overlay',

    initialize: function(options) {
        $('#dd-analysis-overlay').draggable();

        this.groupedBy = 'monthly';
        this.model.groupedBy(this.groupedBy);

        this.model.on('change:ddDisplayData', this.render, this);

        this.render();
    },

    render: function() {
        if (!_.isEmpty(this.model.get('ddDisplayData'))) {
            terra.d3GroupedBar(_.merge({'selector': '#dd-analysis-overlay .plot',
                                        'eventDate': this.model.getEventDateAsStr()},
                                       this.model.get('ddDisplayData')));

            this.$el.show();
        }
    },

    remove: _.wrap(
        Backbone.View.prototype.remove,
        function(parentRemove) {
            parentRemove.apply(this);

            $('body').append('<div id="dd-analysis-overlay"><div id="dd-analysis-overlay-options"></div><div class="plot"></div></div>');
            $('#dd-analysis-overlay').hide();
        })
});
