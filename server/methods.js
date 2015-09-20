Meteor.methods({
    noise2D: function(c, l) {
        var SimplexNoise = Meteor.npmRequire('simplex-noise');
        var Alea = Meteor.npmRequire('alea');
        var random = new Alea(1);
        var simplex_noise = new SimplexNoise(random);
        var noise = simplex_noise.noise2D(c, l);
        return noise;
    }
});

Meteor.startup(function () {
    // code to run on server at startup
});