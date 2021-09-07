import $ from 'jquery'

$(() => {


    $('li:odd').css({ 'background-color': 'red' });
    $('li:even').css({ 'background-color': 'green' });

});