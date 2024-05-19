// let data = [
//   {
//     "id": 0,
//     "name": "肥宅心碎賞櫻3日",
//     "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     "area": "高雄",
//     "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     "group": 87,
//     "price": 1400,
//     "rate": 10
//   },
//   {
//     "id": 1,
//     "name": "貓空纜車雙程票",
//     "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台北",
//     "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     "group": 99,
//     "price": 240,
//     "rate": 2
//   },
//   {
//     "id": 2,
//     "name": "台中谷關溫泉會1日",
//     "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台中",
//     "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     "group": 20,
//     "price": 1765,
//     "rate": 7
//   }
// ];

let data = [];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
  .then(function(response){
    data = response.data;
    init();
  })



const ticketName = document.querySelector("#ticketName"); //套票名稱
const ticketImgUrl = document.querySelector("#ticketImgUrl"); //圖片網址
const ticketRegion = document.querySelector("#ticketRegion"); //景點地區
const ticketPrice = document.querySelector("#ticketPrice"); //套票金額
const ticketNum = document.querySelector("#ticketNum"); //套票組數
const ticketRate = document.querySelector("#ticketRate"); //套票星級
const ticketDescription = document.querySelector("#ticketDescription"); //套票描述
const btn = document.querySelector(".btn"); //新增套票按鈕

const regionSearch = document.querySelector(".regionSearch"); //地區搜尋
const searchResultText = document.querySelector("#searchResult-text");//搜尋結果
const ticketCardArea = document.querySelector(".ticketCard-area"); //卡片內容

//註冊監聽事件
btn.addEventListener("click",function(e){
let obj = {};

obj.id = data.length;
obj.name = ticketName.value;
obj.imgUrl = ticketImgUrl.value;
obj.area = ticketRegion.value;
obj.description = ticketDescription.value;
obj.group = ticketNum.value;
obj.price = ticketPrice.value;
obj.rate = ticketRate.value;

//若沒有輸入內容則顯示提示框
switch(true){
  case ticketName.value === "" :
    return alert('請輸入套票名稱!');
  case ticketImgUrl.value === "":
    return alert('請輸入圖片網址!');
  case ticketPrice.value === "":
    return alert('請輸入套票金額!');
  case ticketNum.value === "" :
    return alert('請輸入套票組數!');
  case ticketRate.value ==="":
    return alert('請輸入套票星級!');
  case ticketDescription.value ==="" :
    return alert('請輸入套票描述!');
}

if (ticketRate.value >10){
  return alert('套票星級必須是 1 到 10 之間的數字！')
}


data.push(obj);
init(); //初始化函式
});

// 卡片內容

function init() {
let addCard = "";
let selectNum = 0;
data.forEach(function (item) {
  addCard += `
      <li class="ticketCard">
          <div class="ticketCard-img">
          <a href="#">
              <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
          <div>
              <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
              ${item.description}
              </p>
          </div>
          <div class="ticketCard-info">
              <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
          </div>
          </div>
      </li>
      `;
  selectNum += 1;
  //新增資料後清空表單內容
  ticketName.value = "";
  ticketImgUrl.value = "";
  ticketRegion.value = "";
  ticketDescription.value = "";
  ticketNum.value = "";
  ticketPrice.value = "";
  ticketRate.value = "";
});
//把卡片加入頁面中
ticketCardArea.innerHTML = addCard;

}
init();

// 篩選資料
function checkArea(e) {
let selectCard = "";
let areaNum = 0;
data.forEach(function (item) {
  let card = `
      <li class="ticketCard">
      <div class="ticketCard-img">
      <a href="#">
          <img src="${item.imgUrl}" alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
      <div>
          <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
          ${item.description}
          </p>
      </div>
      <div class="ticketCard-info">
          <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
      </div>
      </div>
  </li>
      `;
  if (e.target.value === item.area) {
    selectCard += card;
    areaNum += 1;
  } else if (e.target.value === "全部地區") {
    selectCard += card;
    areaNum = data.length;
  }
});
ticketCardArea.innerHTML = selectCard;
searchResultText.innerHTML = `本次搜尋共 ${areaNum} 筆資料`;
}

regionSearch.addEventListener('change', checkArea); 

//新增甜甜圈套件

const chart = c3.generate({
  bindto: '#chart', // HTML 元素綁定
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ] // 資料存放
  }
});