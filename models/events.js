Events = new Meteor.Collection('events');

Meteor.methods({
    addEvent: function(title, start, end, description){
        Events.insert({
            title: title,
            start: start,
            end: end,
            allDay: false,
            createdAt: new Date(),
            editedAt: new Date(),
            description: description,
            private: true,
            owner: Meteor.userId()
        });
    },

    deleteEvent: function(id){
        Events.remove(id);
    }
});