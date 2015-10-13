Template.calendarEdit.helpers({
    events: function(){
        var fc = $('.fc');
        return function (start, end, tz, callback){
            Meteor.subscribe('events', start, end, function () {
                fc.fullCalendar('refetchEvents');
            });

            var events = Events.find().map(function (it){
                return {
                    title: it.date.toISOString(),
                    start: it.date,
                    allDay: true
                };
            });
            callback(events);
        }
    },

    options: function() {
        return {
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
            defaultView: 'month'
        };
    }
});

Template.body.rendered = function () {
    var fc = this.$('.fc');
    this.autorun(function () {
        //1) trigger event re-rendering when the collection is changed in any way
        //2) find all, because we've already subscribed to a specific range
        Events.find();
        fc.fullCalendar('refetchEvents');
    });
};

Template.body.events({
    'click .refresh': function (e, template) {
        //template.$('#myid2').fullCalendar('refetchEvents');
        template.$('.myCalendars').fullCalendar('refetchEvents');
    }
});

Template.body.helpers({
    options: function () {
        return {
            id: 'myid2',
            class: 'myCalendars',
            lang: 'pl',
            height: 300,
            defaultView: 'basicWeek',
            events: function (start, end, tz, callback) {
                callback([{
                    title: new Date().toGMTString(),
                    start: new Date()
                }]);
            }
        };
    }
});