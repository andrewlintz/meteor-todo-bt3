// Definimos la colección
Tasks = new Mongo.Collection('tasks');

// Definimos metodos accesores despues de haber
// eliminado el modulo insecure
Meteor.methods({

    addTasks: function(title){
        Tasks.insert({
            text: title,
            createdAt: new Date(),
            private: true,
            owner: Meteor.userId()
        });
    },

    updateTasks: function(id, checked){
        var tas = Tasks.findOne(id);
        if(tas.owner !== Meteor.userId()){
            throw new Meteor.error('not-authorized');
        }
        Tasks.update(id, {$set: {checked: checked}})
    },

    deleteTasks: function(id){
        var tas = Tasks.findOne(id);
        if(tas.owner !== Meteor.userId()){
            throw new Meteor.error('not-authorized');
        }
        Tasks.remove(id);
    },

    setPrivate: function(id, private){
        var tas = Tasks.findOne(id);
        if(tas.owner !== Meteor.userId()){
            throw new Meteor.error('not-authorized');
        }
        Tasks.update(id, {$set: {private: private}});
    }
});