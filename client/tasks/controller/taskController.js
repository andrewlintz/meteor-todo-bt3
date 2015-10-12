Meteor.subscribe("tasks");

Template.body.helpers({
    tasks: function(){
        if (Session.get('hiddenChecked')){
            return Tasks.find({checked: {$ne:true}});
        }
        return Tasks.find();
    }
});

Template.body.events({

    // Definimos el DOM selector y el evento que pasamos.
    'submit #new-task' : function(event){

        // Hacemos un prevent default al formulario.
        event.preventDefault();

        //Extraemos el(los) contenido de el(los) campo(s).
        var title = event.target.title.value;

        //Aquí llamamos a la funcion creada para acceder
        // a la edición o modificación de los eventos.
        Meteor.call("addTasks", title);

        event.target.title.value = "";
        return false;
    },

    'change .hiddenChecked': function(event){
        Session.set('hiddenChecked', event.target.checked);
    }

});

Template.taskes.events({
    'click .toggle-checked': function(){
        Meteor.call("updateTasks", this._id, !this.checked);
    },

    'click .delete': function(e){
        e.preventDefault();
        $("#deleteItem").modal("show");
        Session.set('forDelete', this._id);
    },

    'click .toggle-private': function(e){
        e.preventDefault();
        if(this.private === true){
            $("#publicItem").modal("show");
            Session.set('forPublic', {id: this._id, private: this.private})
        } else {
            Meteor.call("setPrivate", this._id,  !this.private);
        }
    }
});

Template.taskes.helpers({
    isOwner: function(){
        return this.owner === Meteor.userId();
    }
});


Template.deleteItem.events({
    'click .delete-item': function(event){
        var id = Session.get('forDelete');
        Meteor.call("deleteTasks", id);
        $("#deleteItem").modal("hide");
        Session.set('forDelete', '');
    }
});

Template.publicItem.events({

    'click .public-item': function(event){

        var item = Session.get('forPublic');
        var id = item.id;
        var privateItem = item.private;
        Meteor.call("setPrivate", id,  !privateItem);
        $("#publicItem").modal("hide");
        //Session.set('forPublic', '');
    }

});

// Los valores se devuelven en forma de función
Template.registerHelper("localizedDateAndTime", function(date) {
    if(date)
        return moment(date).format('l LT');
});

// Editamos los valores en la casilla de singup
Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        Router.go('profileEdit');
    }
});

// Configurando login para evitar el uso de correos
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});