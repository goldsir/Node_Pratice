import $ from 'jquery'
import './css/index.css'
import './css/index.less'

$(() => {


    $('li:odd').css({ 'background-color': 'red' });
    $('li:even').css({ 'background-color': 'green' });

});