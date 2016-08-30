// parameters
var size = { x: 600, y: 240, tile: 40},
    speed = 30,
    tile_nb = { x: Math.ceil(size.x/size.tile)+1, y: Math.ceil(size.y/size.tile)+1 },
    colors = ["#ED1156", "#ED194E", "#ED2247", "#ED2B3F", "#EE3438", "#EE3D31", "#EE4529", "#EF4E22", "#EF571A", "#EF6013", "#F0690C", "#E8720E", "#E17B10", "#D98512", "#D28E14", "#CB9816", "#C3A118", "#BCAA1A", "#B4B41C", "#ADBD1E", "#A6C721", "#96C62F", "#87C53E", "#78C44D", "#69C35C", "#5AC26B", "#4AC17A", "#3BC089", "#2CBF98", "#1DBEA7", "#0EBDB6", "#0EBAB0", "#0EB8AA", "#0EB5A4", "#0EB39E", "#0EB098", "#0EAE92", "#0EAB8C", "#0EA986", "#0EA680", "#0EA47B", "#269376", "#3F8372", "#58736E", "#71626A", "#895266", "#A24262", "#BB315E", "#D4215A"],
    objects = [],
    values = [],
    nb_colors = colors.length,
    counter = 0,
    setup = false;

var interval, alea, simplex_noise, snap;

gen = function(add) {
    var values = [], foo;

    for (var l=0; l<tile_nb.y; l++) {
        for (var c=0; c<tile_nb.x; c++) {
            // var noise = simplex_noise.noise2D(c, l);
            var noise = pnoise.perlin2(c/8.0, l/8.0);
            var foo = Math.round((noise+1) / 2 * nb_colors) + add;
            values.push(foo, foo+1, foo+2, foo+3);
        }
    }

    return values;
};

setup = function() {
    var pos, cmd;
    var tiles = snap.g();

    // draw tiles
    for (var l=0; l<tile_nb.y; l++) {
        for (var c=0; c<tile_nb.x; c++) {
            pos = { x: c*size.tile, y: l*size.tile };

            // tile 1
            var poly = snap.polygon([[pos.x, pos.y], [(pos.x+size.tile), pos.y], [(pos.x+size.tile/2), (pos.y+size.tile/2)]]);
            objects.push(poly);
            tiles.add(poly);

            // tile 2
            //cmd = (pos.x+size.tile) +','+ (pos.y+size.tile) +' '+ pos.x +','+ (pos.y+size.tile) +' '+ (pos.x+size.tile/2) +','+ (pos.y+size.tile/2);
            poly = snap.polygon([[pos.x+size.tile, (pos.y+size.tile)], [pos.x, (pos.y+size.tile)], [(pos.x+size.tile/2), (pos.y+size.tile/2)]]);
            objects.push(poly);
            tiles.add(poly);

            // tile 3
            //cmd = pos.x +','+ pos.y +' '+ (pos.x+size.tile/2) +','+ (pos.y+size.tile/2) +' '+ (pos.x-size.tile/2) +','+ (pos.y+size.tile/2);
            poly = snap.polygon([[pos.x, pos.y], [(pos.x+size.tile/2), (pos.y+size.tile/2)], [(pos.x-size.tile/2), (pos.y+size.tile/2)]]);
            objects.push(poly);
            tiles.add(poly);

            // tile 4
            //cmd = pos.x +','+ (pos.y+size.tile) +' '+ (pos.x+size.tile/2) +','+ (pos.y+size.tile/2) +' '+ (pos.x-size.tile/2) +','+ (pos.y+size.tile/2);
            poly = snap.polygon([[pos.x, (pos.y+size.tile)], [(pos.x+size.tile/2), (pos.y+size.tile/2)], [(pos.x-size.tile/2), (pos.y+size.tile/2)]]);
            objects.push(poly);
            tiles.add(poly);
        }
    }

    var teknoir = snap.text(size.x/2, size.y/2, "teknoır");
    teknoir.attr({
        "text-anchor": "middle",
        "alignment-baseline": "middle",
        fill: "#fff",
        "font-size": "200px"
    });
    var driven = snap.text(size.x/2, size.y/2+90, "drıven development");
    driven.attr({
        "text-anchor": "middle",
        "alignment-baseline": "middle",
        fill: "#fff",
        "font-size": "64px"
    });

    //var rect_outer = snap.rect(0, 0, size.x, size.y);
    //rect_outer.attr({
    //    fill: "#fff"
    //});
    //var rect_inner = snap.rect(3, 3, size.x-6, size.y-6);
    //rect_inner.attr({
    //    fill: "#000"
    //});


    //mask = snap.group(rect_outer, rect_inner, teknoir);
    mask = snap.group(teknoir, driven);

    tiles.attr({
        mask: mask
    });

    values[0] = gen(0);
    values[1] = gen(nb_colors);
    setup = true;
};

run = function() {
    if (!setup) return;

    var idx;
    for (var i=0, l=objects.length; i<l; i++) {
        idx = Math.round((values[1][i]-values[0][i]) * counter/(nb_colors-1) + values[0][i]);
        if (idx >= nb_colors) idx = idx%nb_colors;
        objects[i].attr({fill: colors[idx]});
    }

    counter++;
    if (counter == nb_colors) {
        counter = 1;
        values[0] = values[1].map(function(v) { return v-nb_colors; });
        values[1] = gen(nb_colors);
    }
};

Template.teknoir_color_tiles.created = function() {
    alea = new Alea(1);
    simplex_noise = new SimplexNoise(alea);
    snap = Snap();
    snap.attr({
        align: "center",
        viewBox: "-150 0 900 200"
    });
    setup();
    interval = Meteor.setInterval(run, speed);
};

Template.teknoir_color_tiles.destroyed = function() {
    Meteor.clearInterval(interval);
};
