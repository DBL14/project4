angular
  .module('emotions')
  .factory('Moment', Moment)

Moment.$inject = ['$resource', 'API']
function Moment($resource, API){

  return $resource(
    API+'/moments/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}