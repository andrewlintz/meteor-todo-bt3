Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'spinner'
});

Router.route('/', {
   name: 'home',
   template: 'HomeTemplate'
});