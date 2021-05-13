var EYES = [
    {
        'name': "Blue Honey Palette Eye Shadow",
        'price': 45.00,
        'image': "./images/kylieshadow.jpg"
    },
    {
        'name': "Classic Blossom Eyeshadow Palette",
        'price': 45.00,
        'image': "./images/kkwshadow.jpg"
    },
    {
        'name': "Bloody Money Palette",
        'price': 52.00,
        'image': "./images/jeffreeshadow.jpg"
    },
    {
        'name': "Discovery Eyeshadow Palette",
        'price': 29.00,
        'image': "./images/rareshadow.jpg"
    },
    {
        'name': "KKW X Winnie Eyeshadow Palette",
        'price': 49.00,
        'image': "./images/kkw_shadow.jpg"
    }  
]

var LIPS = [
    {
        'name': "Velvet Liquid Lipstick",
        'price': 20.00,
        'image': "./images/kylielipstick.jpg"
    },
    {
        'name': "Semi Matte Liquid Lipstick",
        'price': 22.00,
        'image': "./images/kkwlipstick.jpg"
    },
    {
        'name': "Velour Liquid Lipstick",
        'price': 18.00,
        'image': "./images/jeffreelipstick.jpg"
    },
    {
        'name': "Stay Vulnerable Glossy Lip Balm",
        'price': 19.00,
        'image': "./images/rarelipstick.jpg"
    },
    {
        'name': "Red Creme Lipstick",
        'price': 18.00,
        'image': "./images/kkw_lipstick.jpg"
    }
]

var HIGHLIGHT = [
    {
        'name': "Kylighter",
        'price': 26.00,
        'image': "./images/kyliehighlighter.jpg"
    },
    {
        'name': "Powder Contour & Highlight Palettes",
        'price': 44.00,
        'image': "./images/kkwhighlighter.jpg"
    },
    {
        'name': "Platinum Ice Palette",
        'price': 40.00,
        'image': "./images/jeffreehighlighter.jpg"
    },
    {
        'name': "Liquid Luminizer",
        'price': 22.00,
        'image': "./images/rarehighlighter.jpg"
    },
    {
        'name': "Creme Highlight Stick",
        'price': 18.00,
        'image': "./images/kkw_highlighter.jpg"
    }
    
]

var BLUSH = [
    {
        'name': "Pink Power",
        'price': 30.00,
        'image': "./images/kylieblush.jpg"
    },
    {
        'name': "Mauve Blush",
        'price': 24.00,
        'image': "./images/kkwblush.jpg"
    },
    {
        'name': "Skin Frost",
        'price': 29.00,
        'image': "./images/jeffreeblush.jpg"
    },
    {
        'name': "Melting Blush",
        'price': 21.00,
        'image': "./images/rareblush.jpg"
    },
    {
        'name': "Blush Duo",
        'price': 26.00,
        'image': "./images/kkw_blush.jpg"
    }
]
var products = {
    "EYES": EYES,
    "LIPS": LIPS,
    "HIGHLIGHT": HIGHLIGHT,
    "BLUSH": BLUSH
};

if (typeof module != 'undefined') { 
    module.exports.products = products;
}