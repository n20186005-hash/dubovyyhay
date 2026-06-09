const fs = require('fs');
const path = require('path');

const locales = ['zh', 'en', 'ru', 'uk'];

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'src/messages', `${loc}.json`);
  if (!fs.existsSync(filePath)) return;
  
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. "关于" 部分 (intro / knowledge / officialManagement)
  // "迪尤基夫斯基花园" / "Diukivskyi Sad" -> "杜博维盖公园 (Dubovyy Hay)" / "Dubovyy Hay"
  // We can do a string replacement on the entire file content, then parse it back, but let's be careful.
  
  let text = JSON.stringify(data, null, 2);
  
  // Replace Diukivskyi
  text = text.replace(/迪尤基夫斯基花园/g, "杜博维盖公园 (Dubovyy Hay)");
  text = text.replace(/迪尤基夫斯基/g, "Dubovyy Hay");
  text = text.replace(/Diukivskyi Sad/g, "Dubovyy Hay");
  text = text.replace(/Diukivskyi/g, "Dubovyy Hay");
  text = text.replace(/Дюкивский Сад/g, "Дубовий Гай (Dubovyy Hay)");
  text = text.replace(/Дюкивский/g, "Дубовий Гай");
  text = text.replace(/Дюківський Сад/g, "Дубовий Гай (Dubovyy Hay)");
  text = text.replace(/Дюківський/g, "Дубовий Гай");

  // Replace Odesa
  text = text.replace(/敖德萨/g, "扎波罗热");
  text = text.replace(/Odesa/g, "Zaporizhzhia");
  text = text.replace(/Одесский театр оперы и балета/g, "остров Хортица (Khortytsia Island)");
  text = text.replace(/Одесская область/g, "Запорожская область");
  text = text.replace(/Одеська область/g, "Запорізька область");
  text = text.replace(/Одесса/g, "Запорожье");
  text = text.replace(/Одессе/g, "Запорожье");
  text = text.replace(/Одессу/g, "Запорожье");
  text = text.replace(/Одеси/g, "Запоріжжя");
  text = text.replace(/Одеса/g, "Запоріжжя");
  text = text.replace(/Одесі/g, "Запоріжжі");
  text = text.replace(/Одесою/g, "Запоріжжям");

  // Parse back to object to do structural changes
  data = JSON.parse(text);

  // basicInfo updates
  // Fix phone number
  data.basicInfo.phone = loc === 'zh' ? "电话" : loc === 'en' ? "Phone" : loc === 'ru' ? "Телефон" : "Телефон";
  data.basicInfo.phoneValue = "+380 6176 42297";
  
  // Fix ru/uk specific address if wrong
  if (loc === 'ru') {
    data.basicInfo.addressValue = "вулиця Глісерна, 1, Zaporizhzhia, Zaporizhia Oblast, Украина 69000";
    data.basicInfo.plusCodeValue = "R56C+75 Запорожье, Запорожская область, Украина";
    data.hero.rating = "4.2";
    data.hero.reviewCount = "11,842";
  }
  if (loc === 'uk') {
    data.basicInfo.addressValue = "вулиця Глісерна, 1, Zaporizhzhia, Zaporizhia Oblast, Україна 69000";
    data.basicInfo.plusCodeValue = "R56C+75 Запоріжжя, Запорізька область, Україна";
    data.hero.rating = "4.2";
    data.hero.reviewCount = "11,842";
  }

  // 交通建议 (Transport)
  if (loc === 'zh') {
    data.transport.airportDesc = "就近国际机场：扎波罗热国际机场 (OZH)（请注意：受当前局势影响，请提前确认交通及航班开放情况）。从机场可乘坐出租车或公共交通前往市区。";
    data.transport.tipsDesc = "扎波罗热是乌克兰东南部的重镇，拥有深厚的哥萨克历史文化和美丽的第聂伯河风光。";
  } else if (loc === 'en') {
    data.transport.airportDesc = "Nearest airport: Zaporizhzhia International Airport (OZH) (Note: due to the current situation, please confirm transport and flight availability in advance). From the airport, you can take a taxi or public transport to the city center.";
    data.transport.tipsDesc = "Zaporizhzhia is a major city in southeastern Ukraine, featuring a deep Cossack historical heritage and beautiful Dnipro River landscapes.";
  } else if (loc === 'ru') {
    data.transport.airportDesc = "Ближайший аэропорт: Международный аэропорт Запорожье (OZH) (Внимание: в связи с текущей ситуацией, пожалуйста, заранее уточняйте информацию о транспорте и рейсах). Из аэропорта можно добраться до центра города на такси или общественном транспорте.";
    data.transport.tipsDesc = "Запорожье — крупный город на юго-востоке Украины, обладающий глубоким историческим наследием казачества и прекрасными пейзажами реки Днепр.";
  } else if (loc === 'uk') {
    data.transport.airportDesc = "Найближчий аеропорт: Міжнародний аеропорт Запоріжжя (OZH) (Увага: у зв'язку з поточною ситуацією, будь ласка, заздалегідь уточнюйте інформацію про транспорт та рейси). З аеропорту можна дістатися до центру міста на таксі або громадському транспорті.";
    data.transport.tipsDesc = "Запоріжжя — велике місто на південному сході України, що має глибоку історичну спадщину козацтва та прекрасні краєвиди річки Дніпро.";
  }

  // 游览路线 (Route steps)
  if (loc === 'zh') {
    data.route.steps = [
      "抵达杜博维盖公园 (Dubovyy Hay)，享受公园的宁静与自然",
      "漫步于公园内的林荫小道，感受绿色氧吧的清新",
      "前往霍尔蒂察岛 (Khortytsia Island)，探索乌克兰哥萨克人的历史",
      "参观当地的哥萨克历史博物馆，深入了解该地区的文化遗产",
      "游览第聂伯河水电站 (DniproHES)，欣赏这一宏伟的工业建筑",
      "在市中心的餐厅品尝乌克兰传统美食"
    ];
  } else if (loc === 'en') {
    data.route.steps = [
      "Arrive at Dubovyy Hay and enjoy the tranquility and nature of the park",
      "Stroll along the tree-lined paths within the park and feel the freshness of the green oxygen bar",
      "Head to Khortytsia Island to explore the history of Ukrainian Cossacks",
      "Visit the local Cossack history museum to deeply understand the region's cultural heritage",
      "Tour the Dnipro Hydroelectric Station (DniproHES) and admire this magnificent industrial architecture",
      "Taste traditional Ukrainian cuisine at restaurants in the city center"
    ];
  } else if (loc === 'ru') {
    data.route.steps = [
      "Прибудьте в Дубовий Гай (Dubovyy Hay) и насладитесь спокойствием и природой парка",
      "Прогуляйтесь по тенистым аллеям парка и почувствуйте свежесть зеленого оазиса",
      "Отправляйтесь на остров Хортица (Khortytsia Island), чтобы изучить историю украинского казачества",
      "Посетите местный музей истории казачества для глубокого понимания культурного наследия региона",
      "Посетите Днепрогэс (DniproHES), чтобы полюбоваться этой величественной промышленной архитектурой",
      "Попробуйте традиционные блюда украинской кухни в ресторанах центра города"
    ];
  } else if (loc === 'uk') {
    data.route.steps = [
      "Прибудьте в Дубовий Гай (Dubovyy Hay) та насолодіться спокоєм і природою парку",
      "Прогуляйтеся тінистими алеями парку та відчуйте свіжість зеленого оазису",
      "Вирушайте на острів Хортиця (Khortytsia Island), щоб вивчити історію українського козацтва",
      "Відвідайте місцевий музей історії козацтва для глибокого розуміння культурної спадщини регіону",
      "Відвідайте ДніпроГЕС (DniproHES), щоб помилуватися цією величнoю промисловою архітектурою",
      "Скуштуйте традиційні страви української кухні в ресторанах центру міста"
    ];
  }

  // 拍照机位 (Photo Spots)
  // Delete the 5th spot and replace it or just change it. The user said:
  // "建议 删除第5点 ，或将其修改为“拍摄公园内的湖泊水景与标志性的摩天轮/游乐设施”"
  // Let's modify it.
  if (data.photoSpots && data.photoSpots.spots && data.photoSpots.spots.length >= 5) {
    if (loc === 'zh') {
      data.photoSpots.spots[4].name = "湖泊水景与游乐设施";
      data.photoSpots.spots[4].desc = "拍摄公园内的湖泊水景与标志性的摩天轮/游乐设施";
    } else if (loc === 'en') {
      data.photoSpots.spots[4].name = "Lake Views & Amusement Rides";
      data.photoSpots.spots[4].desc = "Capture the lake views within the park and the iconic Ferris wheel/amusement rides";
    } else if (loc === 'ru') {
      data.photoSpots.spots[4].name = "Виды на озеро и аттракционы";
      data.photoSpots.spots[4].desc = "Сфотографируйте виды на озеро в парке и культовое колесо обозрения/аттракционы";
    } else if (loc === 'uk') {
      data.photoSpots.spots[4].name = "Види на озеро та атракціони";
      data.photoSpots.spots[4].desc = "Сфотографуйте види на озеро в парку та культове колесо огляду/атракціони";
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});
