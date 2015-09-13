var terra = terra || {};

terra.DdAnalysisView = Backbone.View.extend({
    el: '#dd-analysis-overlay',
    events: {
        'change #dd-analysis-grouping': 'changeGrouping'
    },

    initialize: function(options) {
        if (!this.model.has('ddData')) {
            terra.error('No data provided.');
            return;
        }

        $('#dd-analysis-overlay').draggable();

        this.groupedBy = 'monthly';
        this.model.groupedBy(this.groupedBy);

        this.model.on('change:ddDisplayData', this.render, this);

        this.render();
    },

    changeGrouping: function(event) {
        this.groupedBy = $(event.currentTarget).find('input:checked').val();
        this.model.groupedBy(this.groupedBy);
    },

    render: function() {
        if (!_.isEmpty(this.model.get('ddDisplayData'))) {
            // Setup grouping UI
            this.$el.find('#dd-analysis-overlay-options').html(
                _.template($('#dd-analysis-overlay-options-template').html())());

            this.$el.find('input[value="' + this.groupedBy  + '"]').attr('checked', true);

            if (_.isUndefined(this.redraw)) {
                this.redraw = terra.d3GroupedBar(_.merge({'selector': '#dd-analysis-overlay .plot',
                                                          'eventDate': this.model.getEventDateAsStr()},
                                                         this.model.get('ddDisplayData')));
            } else {
                this.redraw(this.model.get('ddDisplayData'));
            }

            this.$el.show();
        }
    },

    remove: _.wrap(
        Backbone.View.prototype.remove,
        function(parentRemove) {
            parentRemove.apply(this);

            $('body').append('<div id="dd-analysis-overlay"><div id="dd-analysis-overlay-options"></div><div class="plot"><select id="dd-analysis-grouping" class="form-control"><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></div></div>');
            $('#dd-analysis-overlay').hide();
        })
});
