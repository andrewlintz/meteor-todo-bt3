Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'spinner'

});

Router.route('/', {
    name: 'home',
    template: 'Home'
});

Router.route('/task/:_id', {
    template: 'taskItem',
    data: function(){
        return Tasks.findOne({_id: this.params._id});
    }
});

Router.route('/about', {
    name: 'about',
    template: 'about'
});