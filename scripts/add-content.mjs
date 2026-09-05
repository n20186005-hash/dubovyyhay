// 一次性脚本：为 src/messages/*.json 追加新增模块的 i18n 文案
// 新增顶层命名空间：story(历史传说) / nature(生态) / amenities(实用设施) / weather(天气)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, '..', 'src', 'messages');

const content = {
  zh: {
    story: {
      title: '历史与人文故事',
      subtitle: '一棵棵老橡树背后，是这座城市的百年记忆',
      introTitle: '为什么叫“橡树林”？',
      introText:
        '“Дубовий Гай”（杜博维盖）在乌克兰语中的字面意思就是“橡树林”。早在 18 世纪，第聂伯河左岸的这片土地上就生长着绵延的橡树，一直延伸向广袤的“大草甸”（Великий Луг）——那是一片与扎波罗热哥萨克历史紧密相连的土地。橡树在乌克兰文化中寓意力量与守望，因此这片土地在成为城市公园之前，就已深深烙印在扎波罗热的地方记忆之中。',
      timelineTitle: '时间线：从河畔橡树林到城市绿肺',
      timeline: [
        {
          period: '18 世纪以前',
          title: '河畔的古老橡树林',
          text: '这片土地曾是第聂伯河河滩上古老的橡树林。在哥萨克时代，橡树既是木材与燃料的来源，也是人们辨认方向、歇脚聚会的天然地标。',
        },
        {
          period: '19—20 世纪初',
          title: '市民节庆的去处',
          text: '19 世纪起，橡树下的草地便成为附近居民郊游与节庆的场所。五月野餐、家庭聚会，让老橡树见证了一代又一代人的生活。',
        },
        {
          period: '1956 年',
          title: '绿地雏形初现',
          text: '这一年，该区域开始作为城市绿地被整理保留，为日后建园打下基础。',
        },
        {
          period: '1959 年 5 月 1 日',
          title: '中央文化与休憩公园正式开放',
          text: '经相关决议，公园于 1959 年 5 月 1 日正式开放，总面积超过 57 公顷，约相当于 80 个标准足球场。此后数十年，林荫道、斯大林帝国风格喷泉与凉亭、露天影院和主舞台陆续建成，公园成为几代扎波罗热人共同的休闲记忆。',
        },
        {
          period: '1950 年代',
          title: '从银幕中走向全国',
          text: '1950 年代，苏联经典影片《扎列奇纳亚街的春天》（Весна на Заречной улице）曾在园内取景。电影上映后，这片橡树林的名字也随银幕传遍全国。',
        },
        {
          period: '今天',
          title: '步行友好的城市绿肺',
          text: '如今公园实行步行友好管理：限制车辆入园、不断完善无障碍与儿童设施，并常年举办音乐节、体育赛事、展览与亲子活动。它既是扎波罗热的“绿肺”，也是市民四季的会客厅。',
        },
      ],
      legendsTitle: '口耳相传的民间传说',
      legendsNote:
        '以下传说属于扎波罗热当地的民间记忆与口头传统，多为口耳相传、年代久远，未必有正式史料佐证，建议作为旅行中的文化背景来了解。',
      legends: [
        {
          title: '哥萨克种下的橡树',
          text: '相传大片的橡树由扎波罗热哥萨克亲手栽下，用以纪念在战乱中被摧毁的扎波罗热塞契（Sich）。人们说，哥萨克含泪种树，橡树因此深深扎根、生生不息，守护着这片土地上的自由记忆。',
        },
        {
          title: '“马赫诺橡树”',
          text: '公园边缘曾有一棵著名的老橡树，树干里嵌着铁钉、道钉等铁器。民间相传这与军事活动家涅斯托尔·马赫诺有关——据说他的追随者曾借助钉入树干的铁件攀上树冠设伏。老树已于 20 世纪 70 年代枯死并被移除，但故事仍在当地流传。',
        },
        {
          title: '树梢上的瞭望哨',
          text: '另有一说流传于革命前：工人们举行“五一郊游”（маївка）时，曾派人爬上橡树瞭望，一旦发现宪兵或搜捕者便提前示警。无论真假，这些故事都让老橡树平添了几分传奇色彩。',
        },
      ],
    },
    nature: {
      title: '生态与自然',
      subtitle: '57 公顷的绿色课堂，藏着城市里最动人的四季',
      intro:
        '公园总面积超过 57 公顷，其中约 5 公顷被列入自然保护基金范围。园中古橡树树龄相传可达约 300 年，是扎波罗热市区公认最具生态价值的绿地之一，也是观察城市自然的天然课堂。',
      highlightsTitle: '生态看点',
      highlights: [
        {
          title: '会讲故事的古老橡树',
          text: '“橡树林”的名字正是来自园内的橡树。除了一两百岁甚至更年长的古橡，园区还混生着多种乔木、灌木与草本植物，春有新绿、秋有金叶，四季各有风景。',
        },
        {
          title: '人工湖与两座景观桥',
          text: '园中开挖了人工湖，湖上架起两座人行桥。暖季里可以租一艘脚踏船在湖面慢行，岸边垂柳与水中倒影构成经典的摄影画面。',
        },
        {
          title: '蜿蜒而过的小河',
          text: '莫克拉·莫斯科夫卡河（Мокра Московка）沿园区一侧蜿蜒流过。河岸湿地带来独特的滨水生态，让身处闹市的公园仍保留着一份自然野趣。',
        },
        {
          title: '城市里的“观鸟站”',
          text: '高大的树冠与平静的水面吸引了许多鸟类在此栖息。池畔常有野鸭、家鹅悠闲游动，树梢间鸟鸣不绝，是亲近城市野生动物的好地方。',
        },
      ],
      note: '请文明游园：不惊扰水鸟、不向湖中丢弃垃圾；如需投喂水禽，请选择适合它们的食物或遵循园方指引，共同守护这片城市绿洲。',
    },
    amenities: {
      title: '游客实用设施',
      subtitle: '卫生间、停车、餐饮、住宿、购物、加油充电——出发前先看这里',
      intro:
        '杜博维盖公园为开放式免费公园，园内以休闲步道与绿地为主。以下按类型梳理游玩时可能用到的配套信息，帮助您更从容地安排行程。',
      items: {
        toilet: {
          title: '公共卫生间',
          text: '公园主要入口、游乐区与活动区附近设有公共卫生间。节假日高峰时段使用人数较多，建议优先选择入口处设施，并留意其开放时段。',
        },
        parking: {
          title: '停车',
          text: '公园邻近街道及沿河区域设有数量有限的公共停车位，其中部分为收费车位。节假日与周末车位紧张，建议提早抵达，或改乘公共交通与出租车。',
        },
        dining: {
          title: '餐饮',
          text: '园内分布着咖啡馆与小吃亭，可提供简餐、冷热饮与零食；市中心区域还有供应乌克兰传统菜肴的餐厅、各类风味餐厅与街头小吃可供选择。商户营业情况请以现场为准。',
        },
        hotel: {
          title: '住宿',
          text: '公园为开放式公共空间，不设住宿服务。需要过夜的游客可在扎波罗热市中心及周边区域选择酒店、旅馆或短租公寓，往返公园乘出租车或公共交通均较为方便。',
        },
        shopping: {
          title: '商超与便利店',
          text: '公园周边及市区主要街道分布有超市、便利店与药店，可随时补充饮用水、零食与应急用品；需要取现或换汇时，市中心设有银行网点与自助取款机。',
        },
        fuel: {
          title: '加油与充电',
          text: '自驾游客可在市区主要道路上找到加油站；市区内电动汽车公共充电设施也在逐步增加。建议出发前用地图应用规划顺路站点，并确认其当前营业状态。',
        },
      },
      disclaimer:
        '中立性说明：本站为非营利性科普与旅行资讯网站，仅按设施类型提供方向性提示，不推荐、不代言任何具体商户、品牌或服务机构。设施的可用性、价格与营业时间可能随时调整，请以现场实际情况为准。',
    },
    weather: {
      title: '天气与出行建议',
      subtitle: '杜博维盖公园一带 · 实时天气与未来预报',
      currentTitle: '此刻天气',
      forecastTitle: '未来 5 日预报',
      feels: '体感',
      humidity: '湿度',
      wind: '风速',
      precipNow: '降水量',
      precipChance: '降水概率',
      tempMax: '最高',
      tempMin: '最低',
      condition: {
        clear: '晴',
        partly: '晴间多云',
        cloud: '阴',
        fog: '雾',
        drizzle: '毛毛雨',
        rain: '雨',
        snow: '雪',
        showers: '阵雨',
        snowShowers: '阵雪',
        thunderstorm: '雷雨',
      },
      advice: {
        clear: '天气晴好，适合林间漫步与野餐。',
        warm: '气温较高，记得防晒并及时补水。',
        cold: '气温偏低，出门请注意保暖。',
        umbrella: '有降水可能，出门建议带上雨具。',
        mild: '天气温和，比较适合户外活动。',
      },
      note: '预报信息随本网站定期更新，仅供出行参考；重要行程请以当地气象部门发布的官方预报为准。',
      unavailable: '天气信息暂时无法获取，建议稍后刷新页面，或参考当地气象部门发布的最新预报。',
    },
  },
  en: {
    story: {
      title: 'History & Local Legends',
      subtitle: 'Behind every old oak lies a century of the city’s memory',
      introTitle: 'Why is it called “Oak Grove”?',
      introText:
        '“Dubovyi Hai” literally means “oak grove” in Ukrainian. As early as the 18th century, the left bank of the Dnipro here was covered with vast oak woods stretching toward the wide floodplain known as the Velykyi Luh (Great Meadow) — lands closely tied to the history of the Zaporozhian Cossacks. In Ukrainian culture the oak stands for strength and watchfulness, so long before the park existed, this land was already part of Zaporizhzhia’s living memory.',
      timelineTitle: 'Timeline: from a riverside oak wood to the city’s green heart',
      timeline: [
        {
          period: 'Before the 19th c.',
          title: 'Ancient oaks by the river',
          text: 'This area was once an old oak woodland on the floodplain of the Dnipro. In Cossack times the oaks supplied timber and fuel, and served as natural landmarks where people rested and gathered.',
        },
        {
          period: '19th–early 20th c.',
          title: 'A place for local festivities',
          text: 'From the 19th century, the grassy clearings under the oaks became a favourite spot for picnics and celebrations. May outings and family gatherings made the old trees silent witnesses of many generations.',
        },
        {
          period: '1956',
          title: 'The beginnings of the green zone',
          text: 'In 1956 the area began to be maintained as an urban green space, preparing the ground for the park that would follow.',
        },
        {
          period: '1 May 1959',
          title: 'The Central Park of Culture and Rest opens',
          text: 'The park officially opened on 1 May 1959 with a total area of more than 57 hectares — roughly the size of 80 football pitches. Over the following decades, tree-lined alleys, fountains and gazebos in the style of the era, an open-air cinema and a main stage were built, making the park a shared leisure memory of generations of Zaporizhzhia residents.',
        },
        {
          period: '1950s',
          title: 'A star of the silver screen',
          text: 'In the 1950s, the classic Soviet film “Spring on Zarechnaya Street” (Vesna na Zarechnoy ulitse) was shot here. After the film was released, the name of this oak grove travelled across the whole country on the screen.',
        },
        {
          period: 'Today',
          title: 'A walkable green oasis',
          text: 'Today the park is managed as a pedestrian-friendly space: vehicle access is restricted, accessibility and children’s facilities keep improving, and festivals, sports events, exhibitions and family activities are held all year round. It is both the “green lungs” of Zaporizhzhia and a living room for its people in every season.',
        },
      ],
      legendsTitle: 'Legends passed from mouth to mouth',
      legendsNote:
        'The stories below belong to Zaporizhzhia’s local folklore and oral tradition. Handed down over many years, they are not necessarily supported by formal historical records, so we suggest enjoying them as cultural background for your visit.',
      legends: [
        {
          title: 'Oaks planted by the Cossacks',
          text: 'Tradition says the oaks were planted by the Zaporozhian Cossacks themselves, to remember the Zaporozhian Sich that was destroyed in the turmoil of war. People say the Cossacks planted the trees in tears, and that is why the oaks took root so deeply and never stopped growing — guarding the land’s memory of freedom.',
        },
        {
          title: 'The “Makhno Oak”',
          text: 'At the edge of the park there once stood a famous old oak with iron nails, bolts and spikes embedded in its trunk. Folklore links the tree to the military figure Nestor Makhno: his followers supposedly used the iron pieces to climb into the crown and set an ambush. The old tree died and was removed in the 1970s, yet the story still lives on locally.',
        },
        {
          title: 'The watch-post in the treetops',
          text: 'Another tale from before the revolution says that workers held their May outings (mayivka) here and posted lookouts in the oaks to raise the alarm if gendarmes or raids appeared. True or not, these stories add a touch of legend to the old oaks.',
        },
      ],
    },
    nature: {
      title: 'Nature & Wildlife',
      subtitle: 'A 57-hectare green classroom with the city’s most vivid seasons',
      intro:
        'The park covers more than 57 hectares, about 5 of which belong to the nature reserve fund. Its old oaks are said to reach about 300 years of age, making the park one of the most ecologically valuable green spaces in Zaporizhzhia and a natural classroom for urban nature.',
      highlightsTitle: 'What to look for',
      highlights: [
        {
          title: 'Old oaks with stories',
          text: 'The oaks gave the grove its name. Alongside ancient trees of 100–200 years or more, the park mixes many species of trees, shrubs and wildflowers, so every season — from fresh spring green to golden autumn leaves — brings its own scenery.',
        },
        {
          title: 'Artificial lakes and two bridges',
          text: 'The park has an artificial lake crossed by two footbridges. In the warm months you can hire a pedal boat and glide slowly across the water, with weeping willows and mirror reflections making a classic photo scene.',
        },
        {
          title: 'A small river along the edge',
          text: 'The Mokra Moskovka river winds along one side of the park. Its wetland banks create a unique riverside habitat and keep a wild touch in the very heart of the city.',
        },
        {
          title: 'A “birdwatching point” in the city',
          text: 'Tall crowns and calm water attract many birds. Ducks and geese paddle by the ponds, and the treetops ring with birdsong — a lovely place to meet urban wildlife up close.',
        },
      ],
      note: 'Please enjoy nature responsibly: do not disturb the waterbirds or throw litter into the lake; if you feed the birds, choose suitable food or follow the park’s guidance so this urban oasis stays safe for everyone.',
    },
    amenities: {
      title: 'Practical Facilities',
      subtitle: 'Restrooms, parking, dining, stays, shops, fuel & charging — check before you go',
      intro:
        'Dubovyi Hai is an open, free-to-enter park centred on walking trails and greenery. Below we summarise, by category, the facilities you may need during your visit to help you plan with ease.',
      items: {
        toilet: {
          title: 'Public Restrooms',
          text: 'Public restrooms are available near the main entrances, the amusement area and the event zones. They can get busy on holidays and weekends, so the facilities by the entrances are a good first choice — please also mind their opening hours.',
        },
        parking: {
          title: 'Parking',
          text: 'Limited public parking is available on the streets near the park and along the riverside; some spaces are paid. Spaces fill up quickly on weekends and holidays, so arrive early or consider public transport or a taxi.',
        },
        dining: {
          title: 'Dining',
          text: 'Inside the park you will find cafés and food kiosks offering snacks, hot and cold drinks and light meals. The city centre around the park has restaurants serving traditional Ukrainian cuisine, plus various other cuisines and street food. Always check the current opening status on site.',
        },
        hotel: {
          title: 'Accommodation',
          text: 'As an open public space, the park itself offers no overnight stays. For an overnight trip, choose among hotels, guesthouses and short-term apartments in Zaporizhzhia city centre and nearby areas; reaching the park from there by taxi or public transport is easy.',
        },
        shopping: {
          title: 'Supermarkets & Convenience Stores',
          text: 'Supermarkets, convenience stores and pharmacies can be found near the park and along the city’s main streets, so you can easily buy drinking water, snacks or essentials. Banks and ATMs are available in the city centre if you need cash or currency exchange.',
        },
        fuel: {
          title: 'Fuel & EV Charging',
          text: 'Self-drive visitors can find petrol stations along the city’s main roads, and public charging points for electric cars are gradually increasing. Before you leave, plan a route with a convenient station using a map app and confirm it is currently open.',
        },
      },
      disclaimer:
        'A note on neutrality: this website is a non-profit science and travel information project. It only gives directional tips by facility type and does not recommend or endorse any particular business, brand or service. Availability, prices and opening hours may change at any time, so please rely on the actual on-site information.',
    },
    weather: {
      title: 'Weather & Trip Tips',
      subtitle: 'Around Dubovyi Hai Park · current conditions and forecast',
      currentTitle: 'Right now',
      forecastTitle: '5-day forecast',
      feels: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      precipNow: 'Precipitation',
      precipChance: 'Chance of rain',
      tempMax: 'Max',
      tempMin: 'Min',
      condition: {
        clear: 'Clear',
        partly: 'Partly cloudy',
        cloud: 'Overcast',
        fog: 'Fog',
        drizzle: 'Drizzle',
        rain: 'Rain',
        snow: 'Snow',
        showers: 'Showers',
        snowShowers: 'Snow showers',
        thunderstorm: 'Thunderstorm',
      },
      advice: {
        clear: 'Sunny weather — great for a woodland walk or a picnic.',
        warm: 'Quite warm — remember sun protection and stay hydrated.',
        cold: 'Quite cold — wrap up warm before you head out.',
        umbrella: 'Precipitation is possible — an umbrella may come in handy.',
        mild: 'Mild weather — a pleasant day for outdoor activities.',
      },
      note: 'Forecast information on this website is refreshed regularly and is intended for general reference; for important plans please rely on the official forecast issued by the local meteorological service.',
      unavailable:
        'Weather information is temporarily unavailable. Please refresh the page later or check the latest official local forecast.',
    },
  },
  ru: {
    story: {
      title: 'История и легенды',
      subtitle: 'За вековыми дубами — память целого города',
      introTitle: 'Почему «Дубовый гай»?',
      introText:
        '«Дубовий Гай» в переводе с украинского означает «дубовая роща». Уже в XVIII веке на левом берегу Днепра здесь росли обширные дубравы, тянувшиеся к просторам Великого Луга — земель, неразрывно связанных с историей запорожского казачества. В украинской культуре дуб — символ силы и верности, поэтому задолго до появления парка эта земля стала частью живой памяти Запорожья.',
      timelineTitle: 'Хронология: от прибрежной дубравы к зелёному сердцу города',
      timeline: [
        {
          period: 'До XIX века',
          title: 'Старинная дубрава у реки',
          text: 'Эта территория была древней дубравой на пойме Днепра. В казацкие времена дубы давали древесину и топливо и служили естественными ориентирами, где люди отдыхали и собирались.',
        },
        {
          period: 'XIX — начало XX века',
          title: 'Место народных гуляний',
          text: 'С XIX века лужайки под дубами стали любимым местом пикников и праздников местных жителей. Маёвки и семейные встречи делали старые деревья немыми свидетелями многих поколений.',
        },
        {
          period: '1956 год',
          title: 'Начало зелёной зоны',
          text: 'В 1956 году территорию начали благоустраивать как городскую зелёную зону — это подготовило основу для будущего парка.',
        },
        {
          period: '1 мая 1959 года',
          title: 'Открытие Центрального парка культуры и отдыха',
          text: 'Парк официально открылся 1 мая 1959 года. Его общая площадь превышает 57 гектаров — примерно 80 стандартных футбольных полей. В последующие десятилетия здесь появились аллеи, фонтаны и беседки в духе эпохи, летний кинотеатр и главная сцена, и парк стал местом отдыха для нескольких поколений запорожцев.',
        },
        {
          period: '1950-е годы',
          title: 'Известность на экранах',
          text: 'В 1950-х годах здесь снимали классический советский фильм «Весна на Заречной улице». После выхода картины название дубравы узнала вся страна.',
        },
        {
          period: 'Сегодня',
          title: 'Пешеходный «лёгкий город»',
          text: 'Сегодня парк развивается как пешеходная зона: въезд транспорта ограничен, улучшаются доступность и детская инфраструктура, круглый год проходят фестивали, спортивные события, выставки и семейные праздники. Это и «зелёные лёгкие» Запорожья, и общая гостиная горожан в любое время года.',
        },
      ],
      legendsTitle: 'Легенды, передаваемые из уст в уста',
      legendsNote:
        'Эти истории относятся к местному фольклору и устной традиции Запорожья. Они передавались годами и не обязательно подтверждаются историческими документами — относитесь к ним как к культурному фону вашей поездки.',
      legends: [
        {
          title: 'Дубы, посаженные казаками',
          text: 'По преданию, дубы посадили сами запорожские казаки — в память о разрушенной в военных лихолетьях Запорожской Сечи. Говорят, казаки сажали деревья со слезами на глазах, поэтому дубы так глубоко пустили корни и растут до сих пор, храня память о свободе этой земли.',
        },
        {
          title: '«Дуб Махно»',
          text: 'На краю парка некогда стоял знаменитый старый дуб, в ствол которого были вбиты железные гвозди, костыли и штыри. Фольклор связывает дерево с военным деятелем Нестором Махно: его сторонники будто бы забирались по этим железкам в крону и устраивали засады. Старое дерево засохло и было снесено в 1970-х годах, но история до сих пор живёт в городе.',
        },
        {
          title: 'Наблюдательный пост на дереве',
          text: 'Другая история времён до революции гласит, что рабочие во время маёвок выставляли на дубах дозорных, которые предупреждали о приближении жандармов и облавах. Правда это или нет — старые дубы от этого стали только легендарнее.',
        },
      ],
    },
    nature: {
      title: 'Природа и экология',
      subtitle: '57 гектаров зелёного «учебного класса» с самыми живыми сезонами города',
      intro:
        'Площадь парка превышает 57 гектаров, около 5 из них входят в природно-заповедный фонд. Древним дубам парка, по преданию, может быть около 300 лет. Это одна из самых ценных зелёных зон Запорожья и настоящий класс для наблюдения за городской природой.',
      highlightsTitle: 'Природные достопримечательности',
      highlights: [
        {
          title: 'Старые дубы с историями',
          text: 'Дубы дали роще её имя. Наряду с деревьями возрастом в 100–200 лет и старше в парке растут десятки видов деревьев, кустарников и цветов — каждое время года здесь по-своему красиво: от свежей весенней зелени до золотой осенней листвы.',
        },
        {
          title: 'Искусственный пруд и два моста',
          text: 'В парке обустроен искусственный водоём, через который перекинуты два пешеходных моста. В тёплый сезон можно взять напрокат катамаран и медленно плыть по воде, а плакучие ивы и отражения создают классический кадр.',
        },
        {
          title: 'Река вдоль парка',
          text: 'По краю парка протекает речка Мокрая Московка. Заболоченные берега создают особый прибрежный мир и сохраняют частицу дикой природы в центре города.',
        },
        {
          title: 'Городской «пункт наблюдения за птицами»',
          text: 'Высокие кроны и спокойная вода привлекают множество птиц. У прудов плавают утки и гуси, в ветвях не умолкает пение — отличное место, чтобы вблизи увидеть городскую природу.',
        },
      ],
      note: 'Пожалуйста, берегите природу: не тревожьте водоплавающих птиц и не бросайте мусор в воду. Если кормите птиц, выбирайте подходящий корм или следуйте указаниям парка, чтобы этот зелёный оазис оставался уютным для всех.',
    },
    amenities: {
      title: 'Полезные удобства для туристов',
      subtitle: 'Туалеты, парковка, питание, жильё, магазины, топливо и зарядка — до поездки загляните сюда',
      intro:
        'Дубовий Гай — открытый бесплатный парк, в основе которого прогулочные аллеи и зелёные зоны. Ниже мы по категориям собрали информацию об удобствах, которые могут понадобиться во время визита, чтобы вы могли спокойно спланировать поездку.',
      items: {
        toilet: {
          title: 'Общественные туалеты',
          text: 'Общественные туалеты есть у главных входов, в зоне аттракционов и рядом с площадками мероприятий. В праздники и выходные они могут быть заняты, поэтому удобства у входов — хороший первый выбор; следите также за часами их работы.',
        },
        parking: {
          title: 'Парковка',
          text: 'Рядом с парком и вдоль набережной есть ограниченное количество общественных парковочных мест, часть из них платная. В выходные и праздники мест не хватает — приезжайте заранее или воспользуйтесь общественным транспортом и такси.',
        },
        dining: {
          title: 'Где поесть',
          text: 'На территории парка работают кафе и киоски с закусками, горячими и прохладительными напитками. В центре города рядом с парком есть рестораны украинской кухни, заведения других кухонь и уличная еда. Актуальный режим работы уточняйте на месте.',
        },
        hotel: {
          title: 'Где переночевать',
          text: 'Парк — открытое общественное пространство, и ночлег в нём не предусмотрен. Для ночёвки выбирайте гостиницы, гостевые дома и апартаменты в центре Запорожья и окрестностях; добраться оттуда до парка легко на такси или общественном транспорте.',
        },
        shopping: {
          title: 'Супермаркеты и магазины',
          text: 'Супермаркеты, магазины шаговой доступности и аптеки есть рядом с парком и на главных улицах города — легко купить воду, перекус или необходимые мелочи. Банки и банкоматы расположены в центре города.',
        },
        fuel: {
          title: 'Топливо и зарядка',
          text: 'Автомобилисты найдут заправочные станции на основных магистралях города; количество публичных зарядных станций для электромобилей постепенно растёт. Перед выездом спланируйте удобную станцию по карте и убедитесь, что она работает.',
        },
      },
      disclaimer:
        'Замечание о нейтральности: этот сайт — некоммерческий научно-популярный и туристический информационный проект. Мы даём лишь общие ориентиры по типам удобств и не рекомендуем и не представляем какие-либо конкретные заведения, бренды или сервисы. Доступность, цены и режим работы могут меняться — ориентируйтесь на актуальную информацию на месте.',
    },
    weather: {
      title: 'Погода и советы для прогулки',
      subtitle: 'Район парка «Дубовий Гай» · текущая погода и прогноз',
      currentTitle: 'Сейчас',
      forecastTitle: 'Прогноз на 5 дней',
      feels: 'Ощущается как',
      humidity: 'Влажность',
      wind: 'Ветер',
      precipNow: 'Осадки',
      precipChance: 'Вероятность осадков',
      tempMax: 'Макс',
      tempMin: 'Мин',
      condition: {
        clear: 'Ясно',
        partly: 'Переменная облачность',
        cloud: 'Облачно',
        fog: 'Туман',
        drizzle: 'Морось',
        rain: 'Дождь',
        snow: 'Снег',
        showers: 'Ливни',
        snowShowers: 'Снегопады',
        thunderstorm: 'Гроза',
      },
      advice: {
        clear: 'Хорошая погода — отлично подходит для прогулки или пикника.',
        warm: 'Довольно жарко — не забудьте защиту от солнца и воду.',
        cold: 'Довольно холодно — одевайтесь теплее перед выходом.',
        umbrella: 'Возможны осадки — зонт не будет лишним.',
        mild: 'Погода мягкая — приятный день для прогулок.',
      },
      note: 'Прогноз на этом сайте регулярно обновляется и носит справочный характер; для важных планов ориентируйтесь на официальный прогноз местной метеослужбы.',
      unavailable:
        'Информацию о погоде временно получить не удалось. Попробуйте обновить страницу позже или проверьте свежий официальный прогноз.',
    },
  },
  uk: {
    story: {
      title: 'Історія та легенди',
      subtitle: 'За віковими дубами — пам’ять цілого міста',
      introTitle: 'Чому «Дубовий гай»?',
      introText:
        '«Дубовий Гай» — це буквально «дубовий гай» українською. Уже в XVIII столітті на лівому березі Дніпра тут росли широкі діброви, що сягали просторів Великого Лугу — земель, нерозривно пов’язаних з історією запорозького козацтва. В українській культурі дуб — символ сили й вірності, тож задовго до появи парку ця земля стала частиною живої пам’яті Запоріжжя.',
      timelineTitle: 'Хронологія: від прибережної діброви до зеленого серця міста',
      timeline: [
        {
          period: 'До XIX століття',
          title: 'Старовинна діброва біля річки',
          text: 'Ця територія була давньою дібровою на заплаві Дніпра. У козацькі часи дуби давали деревину й паливо, а також були природними орієнтирами, де люди відпочивали та збиралися.',
        },
        {
          period: 'XIX — початок XX століття',
          title: 'Місце народних гулянь',
          text: 'Із XIX століття галявини під дубами стали улюбленим місцем пікніків і свят місцевих мешканців. Травневі вилазки та родинні зустрічі робили старі дерева німими свідками багатьох поколінь.',
        },
        {
          period: '1956 рік',
          title: 'Початок зеленої зони',
          text: 'У 1956 році територію почали впорядковувати як міську зелену зону — це підготувало основу для майбутнього парку.',
        },
        {
          period: '1 травня 1959 року',
          title: 'Відкриття Центрального парку культури та відпочинку',
          text: 'Парк офіційно відкрили 1 травня 1959 року. Його загальна площа перевищує 57 гектарів — приблизно 80 стандартних футбольних полів. У наступні десятиліття тут з’явилися алеї, фонтани та альтанки в стилі доби, літній кінотеатр і головна сцена, і парк став місцем відпочинку кількох поколінь запоріжців.',
        },
        {
          period: '1950-ті роки',
          title: 'Відомість на екранах',
          text: 'У 1950-х роках тут знімали класичний радянський фільм «Весна на Зарічній вулиці». Після виходу стрічки назву дубового гаю впізнала вся країна.',
        },
        {
          period: 'Сьогодні',
          title: 'Пішохідні «зелені легені» міста',
          text: 'Сьогодні парк розвивається як пішохідна зона: в’їзд транспорту обмежено, постійно покращуються доступність і дитяча інфраструктура, цілий рік відбуваються фестивалі, спортивні події, виставки та родинні свята. Це і «зелені легені» Запоріжжя, і спільна вітальня містян у будь-яку пору року.',
        },
      ],
      legendsTitle: 'Легенди, що передаються з уст в уста',
      legendsNote:
        'Ці історії належать до місцевого фольклору й усної традиції Запоріжжя. Вони передавалися роками й не обов’язково підтверджені історичними документами — сприймайте їх як культурне тло вашої подорожі.',
      legends: [
        {
          title: 'Дуби, посаджені козаками',
          text: 'За переказом, дуби посадили самі запорозькі козаки — на згадку про зруйновану у воєнних лихоліттях Запорозьку Січ. Кажуть, козаки садили дерева зі сльозами на очах, тому дуби так глибоко пустили коріння й ростуть досі, зберігаючи пам’ять про волю цієї землі.',
        },
        {
          title: '«Дуб Махна»',
          text: 'На краю парку колись стояв знаменитий старий дуб, у стовбур якого було вбито залізні цвяхи, костилі та штирі. Фольклор пов’язує дерево з військовим діячем Нестором Махном: його прихильники нібито видиралися по цих залізяках у крону й влаштовували засідки. Старе дерево всохло й було знесене у 1970-х роках, але історія досі живе в місті.',
        },
        {
          title: 'Спостережний пост на дереві',
          text: 'Інша історія часів до революції розповідає, що робітники під час травневих «маївок» виставляли на дубах дозорних, які попереджали про наближення жандармів та облави. Правда це чи ні — старі дуби від того стали лише легендарнішими.',
        },
      ],
    },
    nature: {
      title: 'Природа та екологія',
      subtitle: '57 гектарів зеленого «навчального класу» з найживішими сезонами міста',
      intro:
        'Площа парку перевищує 57 гектарів, близько 5 із них входять до природно-заповідного фонду. Старовинним дубам парку, за переказами, може бути близько 300 років. Це одна з найцінніших зелених зон Запоріжжя і справжній клас для спостереження за міською природою.',
      highlightsTitle: 'Природні родзинки',
      highlights: [
        {
          title: 'Старі дуби з історіями',
          text: 'Дуби дали гаю його ім’я. Поряд із деревами віком у 100–200 років і старшими у парку ростуть десятки видів дерев, кущів і квітів — кожна пора року тут красива по-своєму: від свіжої весняної зелені до золотого осіннього листя.',
        },
        {
          title: 'Штучний став і два містки',
          text: 'У парку облаштовано штучну водойму, через яку перекинуто два пішохідні містки. У теплий сезон можна взяти напрокат катамаран і повільно плисти водою, а плакучі верби та віддзеркалення створюють класичний кадр.',
        },
        {
          title: 'Річка вздовж парку',
          text: 'По краю парку протікає річка Мокра Московка. Заболочені береги творять особливий прибережний світ і зберігають часточку дикої природи в центрі міста.',
        },
        {
          title: 'Міський «пункт спостереження за птахами»',
          text: 'Високі крони та спокійна вода приваблюють безліч птахів. Біля ставків плавають качки й гуси, у вітті не стихає спів — чудове місце, щоб наблизитися до міської природи.',
        },
      ],
      note: 'Будь ласка, бережіть природу: не турбуйте водоплавних птахів і не кидайте сміття у воду. Якщо годуєте птахів, обирайте відповідний корм або дотримуйтеся вказівок парку, щоб цей зелений оазис залишався затишним для всіх.',
    },
    amenities: {
      title: 'Корисні зручності для туристів',
      subtitle: 'Туалети, паркування, їжа, житло, магазини, пальне та зарядка — зазирніть сюди перед поїздкою',
      intro:
        'Дубовий Гай — відкритий безкоштовний парк, в основі якого прогулянкові алеї та зелені зони. Нижче ми за категоріями зібрали інформацію про зручності, які можуть знадобитися під час візиту, щоб ви могли спокійно спланувати подорож.',
      items: {
        toilet: {
          title: 'Громадські туалети',
          text: 'Громадські туалети є біля головних входів, у зоні атракціонів та біля майданчиків заходів. У свята та вихідні вони можуть бути зайняті, тож зручності біля входів — хороший перший вибір; зважайте також на години їхньої роботи.',
        },
        parking: {
          title: 'Паркування',
          text: 'Поруч із парком та вздовж набережної є обмежена кількість громадських паркомісць, частина з них платна. У вихідні та свята місць бракує — приїжджайте заздалегідь або скористайтеся громадським транспортом чи таксі.',
        },
        dining: {
          title: 'Де поїсти',
          text: 'На території парку працюють кав’ярні та кіоски із закусками, гарячими та прохолодними напоями. У центрі міста поряд із парком є ресторани української кухні, заклади інших кухонь і вулична їжа. Актуальний режим роботи уточнюйте на місці.',
        },
        hotel: {
          title: 'Де переночувати',
          text: 'Парк — відкритий громадський простір, і ночівлі в ньому не передбачено. Для ночівлі обирайте готелі, гостьові будинки та апартаменти в центрі Запоріжжя та околицях; дістатися звідти до парку легко на таксі чи громадському транспорті.',
        },
        shopping: {
          title: 'Супермаркети та магазини',
          text: 'Супермаркети, магазини крокової доступності та аптеки є поруч із парком і на головних вулицях міста — легко придбати воду, перекус або дрібниці. Банки та банкомати розташовані в центрі міста.',
        },
        fuel: {
          title: 'Пальне та зарядка',
          text: 'Автомобілісти знайдуть автозаправні станції на основних магістралях міста; кількість публічних зарядних станцій для електромобілів поступово зростає. Перед виїздом сплануйте зручну станцію за мапою та переконайтеся, що вона працює.',
        },
      },
      disclaimer:
        'Зауваження про нейтральність: цей сайт — некомерційний науково-популярний і туристичний інформаційний проєкт. Ми даємо лише загальні орієнтири за типами зручностей і не рекомендуємо та не представляємо жодні конкретні заклади, бренди чи сервіси. Доступність, ціни та режим роботи можуть змінюватися — орієнтуйтеся на актуальну інформацію на місці.',
    },
    weather: {
      title: 'Погода та поради для прогулянки',
      subtitle: 'Район парку «Дубовий Гай» · поточна погода та прогноз',
      currentTitle: 'Зараз',
      forecastTitle: 'Прогноз на 5 днів',
      feels: 'Відчувається як',
      humidity: 'Вологість',
      wind: 'Вітер',
      precipNow: 'Опади',
      precipChance: 'Ймовірність опадів',
      tempMax: 'Макс',
      tempMin: 'Мін',
      condition: {
        clear: 'Ясно',
        partly: 'Мінлива хмарність',
        cloud: 'Хмарно',
        fog: 'Туман',
        drizzle: 'Мряка',
        rain: 'Дощ',
        snow: 'Сніг',
        showers: 'Зливи',
        snowShowers: 'Снігопади',
        thunderstorm: 'Гроза',
      },
      advice: {
        clear: 'Гарна погода — чудово підходить для прогулянки чи пікніка.',
        warm: 'Досить спекотно — не забудьте захист від сонця та воду.',
        cold: 'Досить холодно — одягайтеся тепліше перед виходом.',
        umbrella: 'Можливі опади — парасолька не буде зайвою.',
        mild: 'Погода м’яка — приємний день для прогулянок.',
      },
      note: 'Прогноз на цьому сайті регулярно оновлюється й має довідковий характер; для важливих планів орієнтуйтеся на офіційний прогноз місцевої метеослужби.',
      unavailable:
        'Інформацію про погоду тимчасово не вдалося отримати. Спробуйте оновити сторінку пізніше або перевірте свіжий офіційний прогноз.',
    },
  },
};

for (const locale of Object.keys(content)) {
  const file = join(messagesDir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  for (const [ns, value] of Object.entries(content[locale])) {
    data[ns] = value;
  }
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Updated ${locale}.json (added: ${Object.keys(content[locale]).join(', ')})`);
}
console.log('Done.');
