Meteor.subscribe("events");

Template.body.rendered = function () {
    var fc = this.$('.fc');
    this.autorun(function () {
        //1) trigger event re-rendering when the collection is changed in any way
        //2) find all, because we've already subscribed to a specific range
        Events.find();
        fc.fullCalendar('refetchEvents');
    });
};

Template.calendarEdit.helpers({
    events: function(){
        var fc = $('.fc');
        return function (start, end, tz, callback) {
            //subscribe only to specified date range
            Meteor.subscribe('events', start, end, function () {
                //trigger event rendering when collection is downloaded
                fc.fullCalendar('refetchEvents');
            });

            //find all, because we've already subscribed to a specific range
            var events = Events.find().map(function (it) {
                return {
                    title: it.date,
                    start: it.date,
                    allDay: false
                };
            });
            callback(events);
        };
    },

    options: function() {
        return {
            id: 'myid2',
            class: 'myCalendars',
            height: 300,
            lang: 'es',
            allDaySlot: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            axisFormat: 'h:mm a',
            timeFormat: {
                agenda: 'h:mm a',
                month: 'h:mm a',
                agendaWeek: 'h:mm a'
            },
            firstHour: 7,
            editable: true,
            eventLimit: false,
            events: function (start, end, timezone, callback) {
                callback(Events.find({}).fetch());
            },
            defaultView: 'month'
        };
    }
});

Template.HomeTemplate.onRendered(function(){
    var fc = this.$('.fc');
    this.autorun(function () {
        //1) trigger event re-rendering when the collection is changed in any way
        //2) find all, because we've already subscribed to a specific range
        Events.find();
        fc.fullCalendar('refetchEvents');
    });
    this.$('.datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD H:mm:ss'
    });
});

Template.HomeTemplate.events({
    'submit #new-event': function(event){
        event.preventDefault();
        var title = event.target.title.value;
        var start = event.target.start.value;
        var end = event.target.end.value;
        var description = event.target.description.value;

        Meteor.call("addEvent", title, start, end, description);
        event.target.title.value = "";
        event.target.start.value = "";
        event.target.end.value = "";
        event.target.description.value = "";
    },

    'click .refresh': function (e, template) {
        //template.$('#myid2').fullCalendar('refetchEvents');
        template.$('.myCalendars').fullCalendar('refetchEvents');
    }
});

Template.HomeTemplate.helpers({
    event: function(){
        return Events.find();
    }
});

Template.eventList.events({
    'click .delete': function(event){
        event.preventDefault();
        id = this._id;
        Meteor.call('deleteEvent', id);
    }
});