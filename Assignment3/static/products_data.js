var products_array = [
    {
        'brand': "EYES",
        'image': "kyliecosmetics.jpg"
    },
    {
        'brand': "LIPS",
        'image': "kkwbeauty.png"
    },
    {
        'brand': "HIGHLIGHTERS",
        'image': "jeffreestar.jpg"
    },
    {
        'brand': "BLUSH",
        'image': "rarebeauty.jpg"
    }
]

var eyes = [
    {
        'name': "Blue Honey Palette Eye Shadow",
        'price': 45.00,
        'image': "kylieshadow.jpg"
    },
    {
        'name': "Classic Blossom Eyeshadow Palette",
        'price': 45.00,
        'image': "kkwshadow.jpg"
    },
    {
        'name': "Bloody Money Palette",
        'price': 52.00,
        'image': "jeffreeshadow.jpg"
    },
    {
        'name': "Discovery Eyeshadow Palette",
        'price': 29.00,
        'image': "rareshadow.jpg"
    },
    {
        'name': "KKW X Winnie Eyeshadow Palette",
        'price': 49.00,
        'image': "kkw_shadow.jpg"
    }  
]

var lips = [
    {
        'name': "Velvet Liquid Lipstick",
        'price': 20.00,
        'image': "kylielipstick.jpg"
    },
    {
        'name': "Semi Matte Liquid Lipstick",
        'price': 22.00,
        'image': "kkwlipstick.jpg"
    },
    {
        'name': "Velour Liquid Lipstick",
        'price': 18.00,
        'image': "jeffreelipstick.jpg"
    },
    {
        'name': "Stay Vulnerable Glossy Lip Balm",
        'price': 19.00,
        'image': "rarelipstick.jpg"
    },
    {
        'name': "Red Creme Lipstick",
        'price': 18.00,
        'image': "kkw_lipstick.jpg"
    }
]

var highlight = [
    {
        'name': "Kylighter",
        'price': 26.00,
        'image': "kyliehighlighter.jpg"
    },
    {
        'name': "Powder Contour & Highlight Palettes",
        'price': 44.00,
        'image': "kkwhighlighter.jpg"
    },
    {
        'name': "Platinum Ice Palette",
        'price': 40.00,
        'image': "jeffreehighlighter.jpg"
    },
    {
        'name': "Liquid Luminizer",
        'price': 22.00,
        'image': "rarehighlighter.jpg"
    },
    {
        'name': "Creme Highlight Stick",
        'price': 18.00,
        'image': "kkw_highlighter.jpg"
    }
    
]

var blush = [
    {
        'name': "Pink Power",
        'price': 30.00,
        'image': "kylieblush.jpg"
    },
    {
        'name': "Mauve Blush",
        'price': 24.00,
        'image': "kkwblush.jpg"
    },
    {
        'name': "Skin Frost",
        'price': 29.00,
        'image': "jeffreeblush.jpg"
    },
    {
        'name': "Melting Blush",
        'price': 21.00,
        'image': "rareblush.jpg"
    },
    {
        'name': "Blush Duo",
        'price': 26.00,
        'image': "kkw_blush.jpg"
    }
]
var allproducts = {
    "eyes": eyes,
    "lips": lips,
    "highlight": highlight,
    "blush": blush
}

if (typeof module != 'undefined') { 
    module.exports.allproducts = allproducts;
}