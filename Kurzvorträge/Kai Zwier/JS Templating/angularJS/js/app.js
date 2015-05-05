var app = angular.module('myApp', []);

app.controller('ProductCtrl', function($scope){
    $scope.products = [
        {
            title : "JavaScript: Grundlagen, Programmierung, Praxis - inkl. HTML5, JavaScript-Frameworks, jQuery, OOP", 
            image : "51WeHq9xNhL._AA160_.jpg", 
            price: "39,90", 
            currency: "EUR"
        },
        {title : "JavaScript: The Definitive Guide (Definitive Guides)", image : "51WD-F3GobL._AA160_.jpg", price: "31,95", currency: "EUR"},
        {title : "Thinking in JavaScript", image : "81L7jbzA%2BbL._SL1500_.jpg", price: "10,00", currency: "EUR"},
        {title : "JavaScript - Das umfassende Referenzwerk", image : "51atDdT%2BAYL.jpg", price: "54,90", currency: "EUR"},
        {title : "JavaScript: Einf&amp;hrung, Programmierung und Referenz", image : "418MC4E%2BhsL._AA160_.jpg", price: "39,30", currency: "EUR"},
        {title : "JavaScript - kurz &amp; gut", image : "51vvlw4EAYL._AA160_.jpg", price: "14,90", currency: "EUR"},
        {title : "JavaScript and HTML5 Now", image : "51rvw49RejL._AA160_.jpg", price: "5,00", currency: "EUR"},
        {title : "Einstieg in JavaScript (Galileo Computing)", image : "51LoO9k3NiL._AA160_.jpg", price: "24,90", currency: "EUR"},
        {title : "Schroedinger lernt HTML5, CSS3 und JavaScript: Das etwas andere Fachbuch (Galileo Computing)", image : "61SlKyzaMSL._AA160_.jpg", price: "44,90", currency: "EUR"},
        {title : "JavaScript and JQuery: Interactive Front-End Web Development", image : "41DJtQp8RoL._AA160_.jpg", price: "33,88", currency: "EUR"},
        {title : "JavaScript effektiv: 68 Dinge, die ein guter JavaScript-Entwickler wissen sollte", image : "41o9tTvRFtL._AA160_.jpg", price: "29,90", currency: "EUR"},
        {title : "JavaScript - Das umfassende Training", image : "51TegM9EExL._AA160_.jpg", price: "36,99", currency: "EUR"}
    ];
});
