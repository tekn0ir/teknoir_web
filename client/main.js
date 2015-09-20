Template.content.helpers({
    choose: function () {
        var rnd = Math.round(Math.random() * 1000) % 3;
        console.log(rnd);
        switch (rnd) {
            case 0:
                return 'teknoir_color_tiles';
            case 1:
                return 'teknoir_glitch';
            case 2:
                return 'teknoir_stroke';
        }
    }
});
