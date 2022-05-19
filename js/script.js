document.getElementById("formulario").addEventListener("submit", saveCrypto);
let datalistOptions = document.getElementById("datalistOptions");
let inputPrice = document.getElementById("inputPrice");
let inputTotal = document.getElementById("inputTotal");
let quantity = document.getElementById("inputQuantity");

const listCrypto = [];

window.addEventListener("DOMContentLoaded", async () => {
  const data = await loadCryptos();

  data.forEach((element) => {
    listCrypto.push(element);
  });

  getCryptos();
  renderCryptos(data);
});

async function loadCryptos() {
  const response = await fetch("https://api.blockchain.com/v3/exchange/tickers/");
  return await response.json();
}

function renderCryptos(cryptos) {
  const createCryptosItems = (cryptos) =>
    cryptos.map((crypto) => `<option value="${crypto.symbol}">${crypto.symbol}</option>`).join(" ");

  const datalist = createCryptosItems(cryptos);
  datalistOptions.innerHTML = datalist;
}

function renderPrice(crytoFiltrada) {
  const inputPriceItem = listCrypto.find((data) => data.symbol === crytoFiltrada);
  inputPrice.value = inputPriceItem.last_trade_price;
}

function renderTotalPrice(cantidad) {
  const precio = inputPrice.value;
  const precioTotal = precio * cantidad;
  inputTotal.value = precioTotal;
}

datalistOptions.addEventListener("change", (event) => {
  const resultado = datalistOptions.value;
  renderPrice(resultado);
});

quantity.addEventListener("change", (event) => {
  const resultado = quantity.value;
  renderTotalPrice(resultado);
});

function saveCrypto(e) {
  let symbol = document.getElementById("datalistOptions").value;
  let price = document.getElementById("inputPrice").value;
  let quantity = document.getElementById("inputQuantity").value;
  let total = document.getElementById("inputTotal").value;

  const cryptoSelected = {
    symbol,
    quantity,
    price,
    total,
  };

  if (total == null || total == 0) {
    alert("El Precio esta vacio");
  } else {
    if (localStorage.getItem("cryptos") === null) {
      let cryptos = [];
      cryptos.push(cryptoSelected);
      localStorage.setItem("cryptos", JSON.stringify(cryptos));
    } else {
      let cryptos = JSON.parse(localStorage.getItem("cryptos"));
      cryptos.push(cryptoSelected);
      localStorage.setItem("cryptos", JSON.stringify(cryptos));
    }
  }

  getCryptos();
  e.formSubmit().reset();
  e.preventDefault();
}

function getCryptos() {
  let cryptos = JSON.parse(localStorage.getItem("cryptos"));
  let listaCryptos = document.getElementById("listaCryptos");
  let totalCryptos = document.getElementById("totalCryptos");
  let portfolioPrice = 0;

  listaCryptos.innerHTML = "";
  totalCryptos.innerHTML = "";

  for (let i = 0; i < cryptos.length; i++) {
    let symbol = cryptos[i].symbol;
    let quantity = cryptos[i].quantity;
    let price = cryptos[i].price;
    let totalPrice = cryptos[i].price * cryptos[i].quantity;
    portfolioPrice = portfolioPrice + totalPrice;

    let row = document.createElement("tr");
    row.innerHTML = `<th scope="row" style="width: 5%">${i}</th>
                        <td style="width: 15%">${symbol}</td>
                        <td style="width: 15%">$${price}</td>  
                        <td style="width: 15%">${quantity}</td>
                        <td style="width: 15%"> $ ${totalPrice.toFixed(5)}</td>
                        <td style="width: 5%"><a class="btn btn-outline-danger btn-secondary btn-sm " onclick="deleteCrypto('${symbol}')"><i class="bi-trash"></i>
</a></td>
                        `;
    listaCryptos.append(row);
  }

  let rowTotal = document.createElement("tr");
  rowTotal.innerHTML = `<td scope="row" style="width: 5%"><h5>Total</h5></td>
                        <td style="width: 15%"></td>
                        <td style="width: 15%"></td>  
                        <td style="width: 15%"></td>                        
                        <td style="width: 15%"><h5>$ ${portfolioPrice}</h5></td>`;
  totalCryptos.append(rowTotal);
}

function deleteCrypto(symbol) {
  let cryptos = JSON.parse(localStorage.getItem("cryptos"));
  for (let i = 0; i < cryptos.length; i++) {
    if (cryptos[i].symbol == symbol) {
      cryptos.splice(i, 1);
    }
  }
  localStorage.setItem("cryptos", JSON.stringify(cryptos));
  getCryptos();
}

const formSubmit = document.getElementById("formulario");
formSubmit.addEventListener("submit", (event) => {
  Swal.fire("Genial", "Ya agregaste tu crypto!", "success");
});
