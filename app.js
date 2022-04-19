let id = 0;

class Crypto {
    constructor(nombre, alias, cantidad, precio){    
        this.id = id++;
        this.nombre = nombre;
        this.alias = alias;
        this.cantidad = Number(cantidad); 
        this.precio = Number(precio);
    }
}

let arrayCryptos = [
    new Crypto(
        "bitcoin",
        "btc",
        "2",
        "40000"
    ),
    new Crypto(
        "ethereum",
        "eth",
        "10",
        "1000"
    ),
    new Crypto(
        "cardano",
        "ada",
        "100",
        "1.3"
    )
]

//DOM//
let formulario = document.getElementById("formulario");
let tablaCryptos = document.getElementById("tablaCryptos");

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    let formulario = e.target;
    let crypto = new Crypto(formulario.children[1].value,formulario.children[3].value,formulario.children[5].value,formulario.children[7].value);
    AgregarCrypto(crypto);
});

//FUNCIONES
const total = (cantidad, precio) =>{
    return precio * cantidad;       
}

function MostrarTotalCryptos() {
    for (const crypto of arrayCryptos) {
        let row = document.createElement("tr")
        row.innerHTML = `<th scope="row">${crypto.id}</th>
                        <td>${crypto.nombre}</td>
                        <td>${crypto.alias}</td>
                        <td>${crypto.cantidad}</td>
                        <td>${crypto.precio}</td>
                        <td>${total(crypto.cantidad, crypto.precio)}</td>`;
                        tablaCryptos.append(row);        
    }
}

function AgregarCrypto(crypto) {
        let row = document.createElement("tr")
        row.innerHTML = `<th scope="row">${crypto.id}</th>
                        <td>${crypto.nombre}</td>
                        <td>${crypto.alias}</td>
                        <td>${crypto.cantidad}</td>
                        <td>${crypto.precio}</td>
                        <td>${total(crypto.cantidad, crypto.precio)}</td>`;
                        tablaCryptos.append(row);
}

MostrarTotalCryptos()