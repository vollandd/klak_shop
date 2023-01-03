let urlShoes = "http://127.0.0.1:3000/api/Shoes";
let txt = "";
fetch(urlShoes)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log('test');
        displayProducts(data);
        document.getElementById("shoes").innerHTML = txt;
    })
    //Si erreur afficher le texte ci dessous
    .catch((er) => {
        document.querySelector("#shoes").innerHTML = "<h1>Attention penser à lancer le serveur API <br> <br>erreur 404</h1>";
        console.log("erreur 404, sur ressource api: " + er);
    });

data ='';

let urlClothing = "http://127.0.0.1:3000/api/clothing";
fetch(urlClothing)
    .then((res) => res.json())
    .then(function(data) {
        txt = '';
        displayProducts(data);
        document.getElementById("clothing").innerHTML = txt;
    })
    //Si erreur afficher le texte ci dessous
    .catch((er) => {
        document.querySelector("#clothing").innerHTML = "<h1>Attention penser à lancer le serveur API <br> <br>erreur 404</h1>";
        console.log("erreur 404, sur ressource api: " + er);
    });

    let urlProducts = "http://127.0.0.1:3000/api/products";
    fetch(urlProducts)
    .then((res) => res.json())
    .then(function(data) {
        txt = '';
        displayProducts(data);
        document.getElementById("product").innerHTML = txt;
    })
    //Si erreur afficher le texte ci dessous
    .catch((er) => {
        document.querySelector("#product").innerHTML = "<h1>Attention penser à lancer le serveur API <br> <br>erreur 404</h1>";
        console.log("erreur 404, sur ressource api: " + er);
    });

//Afficher tout les produits
function displayProducts(data) {

    for (i = 0; i < data.length; i++) {

        console.log(data[i]._id)
        txt += '<a href="./product.html?_id=' + data[i]._id + '" > \
            <article class="w3-third w3-padding">\
                <div class="w3-card-4 w3-pink">\
                    <img src ="' + data[i].imageUrl + '"  alt="' + data.altTxt + '">\
                    <h3 class="productName">' + data[i].title + '</h3>\
                    <p class="productDescription">' + data[i].description + 'Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>\
                </div>\
            </article>\
          </a> ';
    }

}