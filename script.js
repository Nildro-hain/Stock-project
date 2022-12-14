console.log('Hi!');

let mode = document.querySelector("#result-modal");
let instructions = document.querySelector("#instructions-modal");
let stockDate = document.querySelector("#stock-date");
const overlay = document.querySelector("#overlay");
const list = document.getElementById("list");
const listChildren = list.children;
const instBtn = document.querySelector(".to-instructions");
const selDate = stockDate.value;
const item = document.querySelectorAll(".list-item");
const alphaFav = document.querySelector(".favs-alpha");
const favStock = document.querySelector(".fav-stock");
const favChildren = favStock.children;
const sortAlpha = document.querySelector(".sort-alpha");
const alphaFavs = document.querySelector(".favs-alpha");
const API_KEY = "";

let stockArr = [
  {
  ticker: "MSI",
  name: "Motorola Solutions"
},
{
  ticker: "TSLA",
  name:"Tesla"
}, 
{
  ticker: "XOM",
  name: "Exxon Mibil"
},
 {
  ticker: "ASO",
  name: "Academy"
},
 {
  ticker: "AXP",
  name: "American Express"
},
 {  
  ticker: "BB",
  name: "Blackberry"
},
 {
  ticker: "CCL",
  name: "Carnival Cruise Lines"
},
  {
  ticker: "CVS",
  name: "CVS Pharmacy"
},
  {
  ticker: "DE",
  name: "John Deere"
},
  {
  ticker: "FOX",
  name: "FOX media"
},
  {
  ticker: "DIS",
  name: "Walt Disney"},
  {
  ticker: "GM",
  name: "Genral Motors"
},
  {
  ticker: "GTLB",
  name: "Gitlab"
},
  {
  ticker: "HAL",
  name: "Halliburton"
},
{
  ticker: "HHC",
  name: "Howard Hughes Corpporation"
},
{
  ticker: "HOG",
  name: "Harley Davidson"
},
{
  ticker: "HPE",
  name: "Hewlett-Packard"
},
{
  ticker: "HUM",
  name: "Humana"
},
{
  ticker: "KR",
  name: "Kroger"
},
{
  ticker: "LMT",
  name: "Lockheed-Martin"
},
{
  ticker: "LOW",
  name: "LOWES"
},
{
  ticker: "MOB",
  name: "Mobil Oil Corportation"
},
{
  ticker: "MRNA",
  name: "Moderna"
},
{
  ticker: "MSFT",
  name: "Microspft"
},
{
  ticker: "NFLX",
  name: "Netflix"
},
{
  ticker: "NICE",
  name: "Nice"
},
{
  ticker: "NKE",
  name: "Nike"
},
{
  ticker: "TGT",
  name: "Target"
},
{
  ticker: "TRIP",
  name: "TripAdvisor"
},
{
  ticker: "V",
name: "Visa"
}
];
//maps the stock abbreviations
const stockName = stockArr.map(stock => {
    return stock.ticker
  });
  console.log(stockName);
  
//Making the table
stockName.forEach((element) => {
    let tickerName = (element);
    const compName = stockArr.find((tick) => {
      return tick.ticker === tickerName
      });
  const item = document.createElement("li");
    item.innerText = tickerName;
    item.classList.add("list-item");
    item.setAttribute("id", tickerName);
    list.appendChild(item);
    mySpan = document.createElement('span');
    mySpan.innerHTML = `&#9829`;
    mySpan.classList.add('choice');
    item.appendChild(mySpan);
    notFav = document.createElement('span');
    notFav.innerHTML = `&#x2660`;
    notFav.classList.add('not-fav');
    item.appendChild(notFav);
    notFav.classList.add('hide');
   
//The modal set-up 
item.addEventListener('click', () => {
  openModal();
  let comPany = compName.name;
  let selDate = stockDate.value;
  let URL = `https://api.polygon.io/v2/aggs/ticker/${tickerName}/range/1/day/${selDate}/${selDate}?apiKey=${API_KEY}`
fetch(URL)
.then((response) => response.json())
.then((data) => {
  console.log(data)
  console.log(data.ticker)
 console.log(data.results[0].o)
 console.log(data.results[0].c)
 console.log(data.results[0].h)
 console.log(data.results[0].l)
  console.log(selDate)
  mode.innerHTML =
  `<h2>${tickerName}</h2>
  <h3>${comPany}</h3>
  <h2>${selDate}</h2>
  <div class="wrapper">
  <div class="data-wrapper">
  <h4>Opening value: </h4>
  <span>${data.results[0].o}</span>
  </div>
  </div> 
  <div class="wrapper">
  <div class="data-wrapper">   
  <h4>Closing value: </h4>
  <span>${data.results[0].c}</span>
  </div>
  </div>
  <div class="wrapper">
  <div class="data-wrapper">   
  <h4>High value: </h4>
  <span>${data.results[0].h}</span>
  </div>
  </div>
  <div class="wrapper">
  <div class="data-wrapper">   
  <h4>Low value: </h4>
  <span>${data.results[0].l}</span>
  </div>
  </div>`
  })
})
});

const open = document.querySelectorAll('.choice');
const close = document.querySelectorAll('.not-fav');
for(let i = 0; i < open.length; i++) {
  open[i].addEventListener('click', e => {
  e.stopPropagation();
 const toFav = open[i].parentElement;
 console.log(toFav);
 open[i].classList.add('hide');
 close[i].classList.remove('hide');
 list.removeChild(toFav);
 favStock.appendChild(toFav);
 console.log(favChildren);
});
}

for (let i = 0; i < close.length; i++) {
close[i].addEventListener('click', e => {
  e.stopPropagation();
const notFav = close[i].parentElement;
console.log(notFav);
open[i].classList.remove('hide');
close[i].classList.add('hide');
   favStock.removeChild(notFav);
   list.appendChild(notFav);
})
};

mode.addEventListener('click', () => {
  closeModal();
});

overlay.addEventListener('click', () => {
   closeModal();
});

instBtn.addEventListener('click', () => {
  openInstructions();
});

instructions.addEventListener('click', () => {
  closeInstructions();
});

function openInstructions() {
  instructions.classList.add('open');
};

function closeInstructions() {
  instructions.classList.remove('open');
};
 
function openModal() {
  mode.classList.add('open');
  overlay.classList.add('open');
};

function closeModal() {
  mode.classList.remove('open');
  overlay.classList.remove('open');
};

function stkName(tick) {
  return tick.ticker === stockName;
};

sortAlpha.addEventListener('click', () => {
  alphabetize();
});

alphaFavs.addEventListener('click', () => {
  console.log('clicked');
  alphabetFavs();
})

 function alphaSort() {
  var list, i, tickerName, switching, listitems, shouldSwitch;
    list = document.getElementById('list');
    switching = true;
  while(switching) {
      switching = false;
      listitems = list.getElementsByTagName('li');
  for(i  = 0; i < (listitems.length - 1); i++) {
      shouldSwitch = false;
  if (listitems[i].innerHTML.toLowerCase() > listitems[i + 1].innerHTML.toLowerCase()){
      shouldSwitch = true;
      break;
  }
  }
  if(shouldSwitch){
    listitems[i].parentNode.insertBefore(listitems[i + 1], listitems[i]); 
    switching = true;
}
}
};
function reverseAlpha() {
  var list, i, switching, listitems, shouldSwitch;
    list = document.getElementById('list')
  s witching = true;
  while(switching) {
    switching = false;
    listitems = list.getElementsByTagName('li');
  for(i  = 0; i < (listitems.length - 1); i++) {
    shouldSwitch = false;
  if (listitems[i].innerHTML.toLowerCase() < listitems[i + 1].innerHTML.toLowerCase()){
    shouldSwitch = true;
    break;
}
};
if(shouldSwitch) {
  listitems[i].parentNode.insertBefore(listitems[i + 1], listitems[i]); 
  switching = true;
}
}
};
function alphabetize() {
  sortAlpha.classList.toggle("active");
  if(sortAlpha.classList.contains("active")) {
    alphaSort();
  }else {
reverseAlpha();
}
};
function favSort() {
  var favStock, i, switching, listitems, shouldSwitch;
    favStock = document.getElementById('fav-stock');
    switching = true;
  while(switching) {
    switching = false;
    listitems = favStock.getElementsByTagName('li');
  for(i  = 0; i < (listitems.length - 1); i++) {
    shouldSwitch = false;
  if (listitems[i].innerHTML.toLowerCase() > listitems[i + 1].innerHTML.toLowerCase()){
    shouldSwitch = true;
    break;
  }
  };
  if(shouldSwitch) {
    listitems[i].parentNode.insertBefore(listitems[i + 1], listitems[i]); 
    switching = true;
}
}
};
function reverseFavs() {
  var favStock, i, switching, listitems, shouldSwitch;
  favStock = document.getElementById('fav-stock');
  switching = true;
  while(switching) {
    switching = false;
    listitems = favStock.getElementsByTagName('li');
  for(i  = 0; i < (listitems.length - 1); i++) {
    shouldSwitch = false;
  if (listitems[i].innerHTML.toLowerCase() < listitems[i + 1].innerHTML.toLowerCase()){
    shouldSwitch = true;
    break;
  }
  }
  if(shouldSwitch) {
    listitems[i].parentNode.insertBefore(listitems[i + 1], listitems[i]); 
    switching = true;
  }
  }
  };
  function alphabetFavs() {
    alphaFavs.classList.toggle("active");
    if(alphaFavs.classList.contains("active")) {
    favSort();
    }else {
    reverseFavs();
    }
    };

    
   
 
  












