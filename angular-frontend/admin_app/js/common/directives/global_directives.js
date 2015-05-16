'use strict';

/*
 * @name ncDebugger
 * @description debugs data in a <pre> tag
 */
adminAppDirectives.directive('ncDebugger', function(){
    return {
        restrict: 'E',
        templateUrl: 'common/directives/views/debugger.tpl.html'
    }
});

/*
 * @name ncPlaceholder
 * @description creates animated placeholder that slides up on input selection
 */
adminAppDirectives.directive('ncPlaceholder', function($interval, dateFilter){

    function compile(element, attrs){
        var defaultPh = attrs.ncPlaceholder,
            modelBinding = attrs.ngModel;

        element.after('<span class="fake-placeholder animate-if" ng-animate="\'animate\'" ng-if="'+modelBinding+'" >'+defaultPh+'</span>');

        return{
            post: link
        }
    }

    function link(scope, element, attrs){

        var defaultPh = attrs.ncPlaceholder,
            fStarted = false,
            timeout = null,
            modelBinding = attrs.ngModel;

        addDefaultPh();

        scope.$watch(modelBinding, function(value){
            if(fStarted && value != ''){
                clearTimeout(timeout)
                element.removeAttr('placeholder');
            }
            else
                timeout= setTimeout(function(){
                    addDefaultPh();
                }, 140)
            fStarted = true;
        });

        function addDefaultPh(){
            element.attr('placeholder', defaultPh);
        }
    }

    return {
        restrict: 'A',
        compile: compile
    }
});