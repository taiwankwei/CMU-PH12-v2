// ==========================================================================
// WEATHER DATA & API FETCH
// ==========================================================================
const WEATHER_CODES = {
  0: ['☀️', '晴朗'],
  1: ['🌤️', '大致晴朗'],
  2: ['⛅', '局部多雲'],
  3: ['☁️', '陰天'],
  45: ['🌫️', '有霧'],
  48: ['🌫️', '霧凇'],
  51: ['🌦️', '毛毛雨'],
  53: ['🌦️', '毛毛雨'],
  55: ['🌧️', '毛毛雨'],
  61: ['🌧️', '小雨'],
  63: ['🌧️', '中雨'],
  65: ['🌧️', '大雨'],
  71: ['❄️', '小雪'],
  73: ['❄️', '中雪'],
  75: ['❄️', '大雪'],
  80: ['🌦️', '局部陣雨'],
  81: ['🌦️', '陣雨'],
  82: ['⛈️', '大陣雨'],
  85: ['🌨️', '陣雪'],
  86: ['🌨️', '陣雪'],
  95: ['⛈️', '雷陣雨'],
  96: ['⛈️', '雷雨伴有冰雹'],
  99: ['⛈️', '強雷雨']
};

async function loadWeather() {
  const emojiEl = document.getElementById('w-emoji');
  const tempEl = document.getElementById('w-temp');
  const feelEl = document.getElementById('w-feel');
  const descEl = document.getElementById('w-desc');
  const humidityEl = document.getElementById('w-humidity');
  const windEl = document.getElementById('w-wind');
  const timeEl = document.getElementById('w-time');

  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=25.136&longitude=121.501&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia%2FTaipei'
    );
    if (!response.ok) throw new Error('Weather API request failed');
    const data = await response.json();
    const current = data.current;

    const [emoji, desc] = WEATHER_CODES[current.weather_code] || ['🌡️', '未知天氣'];

    emojiEl.textContent = emoji;
    tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
    feelEl.textContent = `體感 ${Math.round(current.apparent_temperature)}°C`;
    descEl.textContent = desc;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    windEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    
    const now = new Date();
    timeEl.textContent = `更新時間：${now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    emojiEl.textContent = '⚠️';
    tempEl.textContent = '--°C';
    descEl.textContent = '無法取得即時天氣';
    feelEl.textContent = '';
  }
}

// ==========================================================================
// BIBLE VERSE LIST & RANDOMIZER
// ==========================================================================
const BIBLE_VERSES = [
  ['約hn福音 3:16', '神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。'],
  ['腓立比書 4:13', '我靠著那加給我力量的，凡事都能做。'],
  ['詩篇 23:1', '耶和華是我的牧者，我必不至缺乏。'],
  ['以賽亞書 40:31', '但那等候耶和華的，必重新得力；他們必如鷹展翅上騰，他們奔跑卻不困倦，行走卻不疲乏。'],
  ['耶利米書 29:11', '耶和華說：我知道我向你們所懷的意念，是賜平安的意念，不是降災禍的意念，要叫你們末後有指望。'],
  ['羅馬書 8:28', '我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。'],
  ['哥林多前書 13:4-5', '愛是恆久忍耐，又有恩慈；愛是不嫉妒，愛是不自誇，不張狂，不求自己的益處，不輕易發怒，不計算人的惡。'],
  ['馬太福音 11:28', '凡勞苦擔重擔的人，可以到我這裡來，我就使你們得安息。'],
  ['詩篇 118:24', '這是耶和華所定的日子，我們在其中要高興歡喜。'],
  ['約hn福音 15:13', '人為朋友捨命，人的愛心沒有比這個大的。'],
  ['箴言 3:5-6', '你要專心仰賴耶和華，不可倚靠自己的聰明，在你一切所行的事上，都要認定他，他必指引你的路。'],
  ['馬太福音 5:9', '使人和睦的人有福了！因為他們必稱為神的兒子。'],
  ['詩篇 121:1-2', '我要向山舉目；我的幫助從何而來？我的幫助從造天地的耶和華而來。'],
  ['帖撒羅尼迦前書 5:16-18', '要常常喜樂，不住地禱告，凡事謝恩；因為這是神在基督耶穌裡向你們所定的旨意。']
];

let lastVerseIndex = -1;

function loadBibleVerse() {
  let index;
  do {
    index = Math.floor(Math.random() * BIBLE_VERSES.length);
  } while (index === lastVerseIndex && BIBLE_VERSES.length > 1);
  
  lastVerseIndex = index;
  const [ref, text] = BIBLE_VERSES[index];
  
  const textEl = document.getElementById('bible-text');
  const refEl = document.getElementById('bible-ref');
  
  textEl.style.opacity = 0;
  refEl.style.opacity = 0;
  
  setTimeout(() => {
    textEl.textContent = `“ ${text} ”`;
    refEl.textContent = `— ${ref}`;
    textEl.style.opacity = 1;
    refEl.style.opacity = 1;
  }, 200);
}

// ==========================================================================
// ACTIVE TAB SELECTION LOGIC
// ==========================================================================
function setActiveTab(tabId) {
  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(el => {
    el.classList.remove('active');
  });
  
  // Deactivate all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show target tab content
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.add('active');
  }
  
  // Activate target tab button
  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    
    // Smoothly scroll active button to the center of tab list (for mobile)
    const container = document.getElementById('tab-nav');
    const btnLeft = activeBtn.offsetLeft;
    const btnWidth = activeBtn.offsetWidth;
    const containerWidth = container.offsetWidth;
    container.scrollTo({
      left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
      behavior: 'smooth'
    });
  }
  
  // Smooth scroll back to top of the content area
  if (window.innerWidth <= 768) {
    const contentArea = document.querySelector('.content-area');
    window.scrollTo({
      top: contentArea.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Bind tab click events
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveTab(btn.dataset.tab);
  });
});

// ==========================================================================
// DARK / LIGHT THEME TOGGLE
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark');
    updateThemeIcon(false);
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  if (isDark) {
    // Sun icon for dark mode (click to switch to light)
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
  } else {
    // Moon icon for light mode (click to switch to dark)
    themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  }
}

themeToggleBtn.addEventListener('click', toggleTheme);

// ==========================================================================
// CHATBOT WIDGET LOGIC (LOCAL SMART BOT + GEMINI KEY INTEGRATION)
// ==========================================================================
const chatToggleBtn = document.getElementById('chat-toggle');
const chatCloseBtn = document.getElementById('chat-close');
const chatPanel = document.getElementById('chat-panel');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const chatToggleIcon = document.getElementById('chat-toggle-icon');

let isChatOpen = false;

function toggleChat() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatPanel.classList.add('active');
    chatToggleIcon.innerHTML = `
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    `;
    chatInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    chatPanel.classList.remove('active');
    chatToggleIcon.innerHTML = `
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    `;
  }
}

chatToggleBtn.addEventListener('click', toggleChat);
chatCloseBtn.addEventListener('click', toggleChat);

function appendMessage(sender, text) {
  const msgRow = document.createElement('div');
  msgRow.className = `chat-msg-row ${sender}`;
  
  const bubble = document.createElement('div');
  bubble.className = 'chat-msg-bubble';
  bubble.textContent = text;
  
  msgRow.appendChild(bubble);
  chatMessages.appendChild(msgRow);
  
  // Smooth scroll to bottom
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: 'smooth'
  });
}

function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'chat-typing-indicator';
  indicator.className = 'chat-msg-row bot';
  
  indicator.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatMessages.appendChild(indicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('chat-typing-indicator');
  if (indicator) indicator.remove();
}

// Local intelligence QA engine
const LOCAL_RESPONSES = [
  {
    keywords: ['你好', '哈囉', '嗨', 'hello', 'hi', '您好'],
    response: '您好！我是您的「北投來走走」旅遊小助手。很高興為您服務！今天想了解什麼呢？您可以問我關於：行程時間、中心新村、溫泉博物館、或者銀光食驗室的美味午餐菜單喔！'
  },
  {
    keywords: ['行程', '時間', '時程', '幾點', '出發', '說明', '規劃'],
    response: '當天（2026 年 11 月 28 日，星期六）的漫遊行程規劃如下：\n• 10:00 - 捷運新北投站1號出口集合\n• 10:10 - 正式出發探索北投\n• 12:00 - 午餐饗宴（前往奇岩三合街的「銀光食驗室」用餐）\n• 14:40 - 離塵不離城（散步奇岩生態綠洲與磺港溪）\n• 15:10 - 賦歸，平安返家。'
  },
  {
    keywords: ['吃', '午餐', '菜單', '餐點', '銀光', '食驗室', '對味廚房', '料理', '套餐', '主菜'],
    response: '中午我們會在「對味廚房銀光食驗室」用餐。菜單包含七款義大利麵：蕃茄臘肉麵、蕃茄乳酪麵、清炒蕃茄香腸肉麵、青醬透抽麵、青醬乳酪與風乾蕃茄麵、清炒松露野菇麵（蛋奶素）、酒醋時蔬麵（全素）；以及六款燒烤主菜：燒烤透抽、燒烤鮮魚、燒烤雞腿排、油封鴨腿、蒜味油封蝦、瑪莎曼咖哩燉牛筋。實際餐點依餐廳當日供應為準。'
  },
  {
    keywords: ['捷運', '怎麼去', '地址', '交通', '地圖', '奇岩站', '導航'],
    response: '銀光食驗室的地址為：台北市北投區三合街一段119號1樓。\n• 首選路線：從「捷運奇岩站」步行僅需約 5-8 分鐘即可到達。\n• 替代路線：從「捷運新北投站」步行約 10-12 分鐘。您可以切換至「午餐饗宴」頁籤，底部有直接導航的 Google Maps 連結哦！'
  },

  {
    keywords: ['中心新村', '眷村', '軍醫'],
    response: '中心新村是全台灣唯一被保存下來的「溫泉軍醫眷村」！曾是國軍衛戍醫院（現三總北投分院）的眷舍，完整保存了日式木造眷舍、紅磚矮牆與溫泉公共浴室，充滿濃濃時代感與文化底蘊，非常值得參觀！'
  },
  {
    keywords: ['溫泉博物館', '博物館', '古蹟', '榻榻米', '開放'],
    response: '北投溫泉博物館建於 1913 年，是百年國定古蹟。原為東亞最大的日式公共浴場，內有壯觀的羅馬拱廊浴池、二樓榻榻米涼亭。開放時間為週二至週日 09:00-17:00（週一休館，免費入場），還有一部好看的介紹影片在「溫泉博物館」頁籤下可以收看喔！'
  },
  {
    keywords: ['天氣', '下雨', '氣溫'],
    response: '您可以在頁面下方的「即時天氣 widget」查看北投最新的即時氣溫、體感溫度與濕度。資料每小時都會更新。如果氣溫高，請多帶水防中暑；若有短暫雨，別忘了帶把傘唷！'
  },
  {
    keywords: ['聖經', '金句', '祝福', '耶和華', '神'],
    response: '為您隨機挑選一句祝福金句：\n“ 但那等候耶和華的，必重新得力；他們必如鷹展翅上騰，他們奔跑卻不困倦，行走卻不疲乏。— 以賽亞書 40:31 ”\n願主祝福您今天滿有平安與喜樂！'
  },
  {
    keywords: ['離塵不離城', '奇岩里', '重劃區', '生態', '磺港溪'],
    response: '北投奇岩里是一塊純淨的綠色重劃區，擁有一條整治復育的生態磺港溪。全區高度限制 32 米，大樓建蔽率低且綠覆率極高，推動了溪水復育親水計畫，讓城市人可以在溪畔聽見蟬鳴水聲、觀察水鳥生態，真正做到「離塵不離城」！'
  }
];

// Handle Local Matching
function getLocalAnswer(query) {
  const lowercaseQuery = query.toLowerCase();
  
  // Secret API Key configuration Command: /apikey YOUR_KEY
  if (lowercaseQuery.startsWith('/apikey ')) {
    const key = query.substring(8).trim();
    if (key) {
      localStorage.setItem('gemini_api_key', key);
      return '您的 Gemini API Key 設定成功！接下來小助手將切換為 Gemini AI 模式，能進行更聰明且客製化的問答囉！🔑✨ (若要清除金鑰，請輸入 /clearkey)';
    }
  }
  
  if (lowercaseQuery === '/clearkey') {
    localStorage.removeItem('gemini_api_key');
    return '已成功清除您的 API 金鑰。小助手已切換回本地問答模式！';
  }

  for (const item of LOCAL_RESPONSES) {
    if (item.keywords.some(keyword => lowercaseQuery.includes(keyword))) {
      return item.response;
    }
  }
  return '謝謝您的提問！關於這點我還在學習中。不過我可以為您提供今天「北投來走走」的相關資訊：包含漫遊行程規劃、中心新村與溫泉古蹟導覽，以及午餐銀光食驗室的菜單與交通路線喔！您想先了解哪一部分呢？';
}

// Call Gemini API (if user set their own key via /apikey)
async function callGeminiAPI(apiKey, query) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const promptContext = `
    你是「北投來走走」單頁網頁的旅遊小助手。活動舉辦日期是 2026 年 11 月 28 日（星期六）。
    這個活動主要分為幾個部分：
    1. 時代眷村情：參觀北投中心新村（全台唯一的溫泉軍醫眷村，文史活化）。
    2. 溫泉博物館：百年國定古蹟，羅馬浴池與榻榻米。
    3. 午餐饗宴：銀光食驗室（地址：台北市北投區三合街一段119號1樓。捷運奇岩站走路5-8分。菜單包含七款義大利麵：蕃茄臘肉麵、蕃茄乳酪麵、清炒蕃茄香腸肉麵、青醬透抽麵、青醬乳酪與風乾蕃茄麵、清炒松露野菇麵（蛋奶素）、酒醋時蔬麵（全素）；以及六款燒烤主菜：燒烤透抽、燒烤鮮魚、燒烤雞腿排、油封鴨腿、蒜味油封蝦、瑪莎曼咖哩燉牛筋）。
    4. 離塵不離城：奇岩重劃區生態、限高與磺港溪溪流整治。
    
    請以親切、專業、溫暖的口吻回答旅客關於此行程的任何問題。
    問題：${query}
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptContext }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error details:', errorText);
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '抱歉，Gemini 小助手剛才發了一下呆，請再問我一次。';
  } catch (error) {
    console.error('Failed to call Gemini API:', error);
    return '連接 Gemini API 時發生異常，可能您的 API Key 不正確或網路中斷。目前暫時改用本地引擎為您服務。\n\n答覆：' + getLocalAnswer(query);
  }
}

async function handleSendMessage() {
  const query = chatInput.value.trim();
  if (!query) return;

  // Add User bubble
  appendMessage('user', query);
  chatInput.value = '';
  
  // Show Typing...
  showTypingIndicator();
  
  // Simulate network latency (500ms - 1000ms) for high-end feeling
  await new Promise(resolve => setTimeout(resolve, 600));

  const apiKey = localStorage.getItem('gemini_api_key');
  let responseText = '';

  if (apiKey) {
    responseText = await callGeminiAPI(apiKey, query);
  } else {
    responseText = getLocalAnswer(query);
  }

  // Remove typing indicator and append bot message
  removeTypingIndicator();
  appendMessage('bot', responseText);
}

// Bind Chat Send Buttons
chatSendBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleSendMessage();
  }
});

// ==========================================================================
// REGISTRATION FORM & FIREBASE INTEGRATION LOGIC
// ==========================================================================
const regModal = document.getElementById('register-modal');
const heroRegBtn = document.getElementById('hero-register-btn');
const modalCloseBtn = document.getElementById('modal-close');
const regForm = document.getElementById('register-form');
const regStatus = document.getElementById('reg-status');

// Config Fields
const fbApiKeyInput = document.getElementById('fb-apikey');
const fbProjectIdInput = document.getElementById('fb-projectid');
const fbAppIdInput = document.getElementById('fb-appid');
const configFieldsContainer = document.getElementById('firebase-config-fields');
const configArrow = document.getElementById('config-arrow');

let firestoreDB = null;
let isFirebaseConnected = false;
let hasWarnedMismatch = false;

// Open/Close Modal
if (heroRegBtn) {
  heroRegBtn.addEventListener('click', () => {
    regModal.classList.add('active');
    
    // Reset form inputs to defaults
    regForm.reset();
    hasWarnedMismatch = false;
    
    // Pre-fill config values if stored
    fbApiKeyInput.value = localStorage.getItem('fb_apikey') || 'AIzaSyCJkm_eA-BJtFzbxO1CyxwK8PbmgHmqq7U';
    fbProjectIdInput.value = localStorage.getItem('fb_projectid') || 'mydesignproject-f22d5';
    fbAppIdInput.value = localStorage.getItem('fb_appid') || '1:940076219394:web:0a8a4b738359378e0c7b1b';
    
    const gasUrlInput = document.getElementById('gas-url');
    if (gasUrlInput) {
      gasUrlInput.value = localStorage.getItem('gas_url') || '';
    }
    
    // Clear status
    regStatus.style.display = 'none';
    regStatus.className = 'reg-status-box';

    // Manually trigger child section hiding and menu status updates
    const childDetailsSection = document.getElementById('child-details-section');
    if (childDetailsSection) childDetailsSection.style.display = 'none';
    
    const menuSelectedStatus = document.getElementById('menu-selected-status');
    if (menuSelectedStatus) {
      menuSelectedStatus.textContent = '已選 0 / 1 份';
      menuSelectedStatus.style.color = '#ef4444';
    }
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', () => {
    regModal.classList.remove('active');
  });
}

// Close modal on clicking overlay
regModal.addEventListener('click', (e) => {
  if (e.target === regModal) {
    regModal.classList.remove('active');
  }
});

// Toggle Firebase configuration fields panel
function toggleConfigSection() {
  const isHidden = configFieldsContainer.style.display === 'none';
  if (isHidden) {
    configFieldsContainer.style.display = 'block';
    configArrow.classList.add('open');
  } else {
    configFieldsContainer.style.display = 'none';
    configArrow.classList.remove('open');
  }
}

// Toggle Email configuration fields panel
function toggleEmailConfigSection() {
  const fields = document.getElementById('email-config-fields');
  const arrow = document.getElementById('email-config-arrow');
  if (fields && arrow) {
    const isHidden = fields.style.display === 'none';
    if (isHidden) {
      fields.style.display = 'block';
      arrow.classList.add('open');
    } else {
      fields.style.display = 'none';
      arrow.classList.remove('open');
    }
  }
}

// Save Firebase config values to localStorage
function saveFirebaseConfig() {
  const key = fbApiKeyInput.value.trim();
  const project = fbProjectIdInput.value.trim();
  const app = fbAppIdInput.value.trim();

  if (!key || !project || !app) {
    showRegStatus('error', '⚠️ 請完整填寫 Firebase 設定項目！');
    return;
  }

  localStorage.setItem('fb_apikey', key);
  localStorage.setItem('fb_projectid', project);
  localStorage.setItem('fb_appid', app);

  showRegStatus('success', '🔑 Firebase 設定已儲存！正在重新初始化...');
  setTimeout(() => {
    location.reload();
  }, 1000);
}

// Clear Firebase config
function clearFirebaseConfig() {
  localStorage.removeItem('fb_apikey');
  localStorage.removeItem('fb_projectid');
  localStorage.removeItem('fb_appid');
  
  fbApiKeyInput.value = '';
  fbProjectIdInput.value = '';
  fbAppIdInput.value = '';

  showRegStatus('info', '🗑️ 已清除 Firebase 設定，回復為本機預覽模式。');
  setTimeout(() => {
    location.reload();
  }, 1000);
}

// Save Email config values to localStorage
function saveEmailConfig() {
  const urlInput = document.getElementById('gas-url');
  const url = urlInput ? urlInput.value.trim() : '';

  if (!url) {
    showRegStatus('error', '⚠️ 請輸入 Google Apps Script 網址！');
    return;
  }

  localStorage.setItem('gas_url', url);
  showRegStatus('success', '📧 Email 通知設定已儲存！');

  setTimeout(() => {
    const fields = document.getElementById('email-config-fields');
    const arrow = document.getElementById('email-config-arrow');
    if (fields && arrow) {
      fields.style.display = 'none';
      arrow.classList.remove('open');
    }
  }, 1000);
}

// Clear Email config
function clearEmailConfig() {
  localStorage.removeItem('gas_url');
  const urlInput = document.getElementById('gas-url');
  if (urlInput) urlInput.value = '';

  showRegStatus('info', '🗑️ 已清除 Email 通知設定。');
}

// Initialize Firebase SDK
function initFirebase() {
  const apiKey = localStorage.getItem('fb_apikey') || 'AIzaSyCJkm_eA-BJtFzbxO1CyxwK8PbmgHmqq7U';
  const projectId = localStorage.getItem('fb_projectid') || 'mydesignproject-f22d5';
  const appId = localStorage.getItem('fb_appid') || '1:940076219394:web:0a8a4b738359378e0c7b1b';

  if (apiKey && projectId && appId) {
    try {
      if (typeof firebase !== 'undefined') {
        if (firebase.apps.length === 0) {
          firebase.initializeApp({
            apiKey: apiKey,
            authDomain: `${projectId}.firebaseapp.com`,
            projectId: projectId,
            storageBucket: `${projectId}.appspot.com`,
            appId: appId
          });
        }
        firestoreDB = firebase.firestore();
        isFirebaseConnected = true;
        console.log("Firebase Firestore successfully initialized!");
        return true;
      }
    } catch (error) {
      console.error("Error initializing Firebase Web SDK:", error);
    }
  }
  return false;
}

function showRegStatus(type, message) {
  if (type === 'success') {
    regStatus.textContent = '🎉 報名成功！';
    regStatus.innerHTML = `
      <div style="font-size: 2.2rem; margin-bottom: 12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">🎉</div>
      <div style="font-size: 1.45rem; font-weight: 800; color: var(--emerald-dark); margin-bottom: 20px;">報名成功！</div>
      <button type="button" onclick="document.getElementById('reg-status').style.display='none'; document.getElementById('register-modal').classList.remove('active');" style="background: linear-gradient(135deg, var(--emerald) 0%, #10b981 100%); color: white; border: none; padding: 10px 28px; border-radius: 50px; font-size: 0.9rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); transition: all 0.2s ease;">OK</button>
    `;
  } else {
    regStatus.textContent = message;
  }
  regStatus.className = `reg-status-box ${type}`;
  regStatus.style.display = 'block';
}

// ==========================================================================
// DYNAMIC REGISTRATION FORM LOGIC (ADULTS/CHILDREN & MENU SELECTION)
// ==========================================================================
function setupFormListeners() {
  const regCount = document.getElementById('reg-count');
  const regAdults = document.getElementById('reg-adults');
  const regChildren = document.getElementById('reg-children');
  const childDetailsSection = document.getElementById('child-details-section');
  const regChildChair = document.getElementById('reg-child-chair');
  const menuSelectedStatus = document.getElementById('menu-selected-status');
  const menuItemQties = document.querySelectorAll('.menu-item-qty');

  if (!regCount || !regAdults || !regChildren) return;

  // Function to update the menu selected status display
  function updateMenuStatus() {
    const totalCount = parseInt(regCount.value) || 0;
    
    // Main Course
    let selectedSum = 0;
    menuItemQties.forEach(input => {
      input.max = totalCount;
      selectedSum += parseInt(input.value) || 0;
    });

    if (menuSelectedStatus) {
      menuSelectedStatus.textContent = `已選 ${selectedSum} / ${totalCount} 份`;
      if (selectedSum !== totalCount) {
        menuSelectedStatus.style.color = '#ef4444'; // Red if mismatch
      } else {
        menuSelectedStatus.style.color = 'var(--emerald-dark)'; // Green if match
      }
    }

  }

  // Function to update child chair dropdown options based on children count
  function updateChildChairOptions() {
    if (!regChildChair) return;
    const childrenCount = parseInt(regChildren.value) || 0;
    const currentSelected = regChildChair.value;

    regChildChair.innerHTML = '';

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '否';
    defaultOpt.textContent = '不需要孩童椅';
    regChildChair.appendChild(defaultOpt);

    for (let i = 1; i <= childrenCount; i++) {
      const opt = document.createElement('option');
      opt.value = i.toString();
      opt.textContent = `需要 ${i} 張`;
      regChildChair.appendChild(opt);
    }

    if (currentSelected !== '否' && parseInt(currentSelected) <= childrenCount) {
      regChildChair.value = currentSelected;
    } else {
      regChildChair.value = '否';
    }
  }

  function handleAdultsChildrenChange() {
    const children = parseInt(regChildren.value) || 0;

    // Toggle child details section
    if (childDetailsSection) {
      if (children > 0) {
        childDetailsSection.style.display = 'block';
      } else {
        childDetailsSection.style.display = 'none';
        if (regChildChair) regChildChair.value = '否';
      }
    }

    updateMenuStatus();
    updateChildChairOptions();
  }

  // Bind change/input events for adults and children
  regAdults.addEventListener('input', handleAdultsChildrenChange);
  regChildren.addEventListener('input', handleAdultsChildrenChange);

  // When total count is edited directly
  regCount.addEventListener('input', () => {
    const totalCount = parseInt(regCount.value) || 0;
    let remaining = totalCount;
    menuItemQties.forEach(input => {
      const qty = Math.min(parseInt(input.value) || 0, remaining);
      input.value = qty;
      remaining -= qty;
    });
    updateMenuStatus();
  });

  // Bind menu item changes
  menuItemQties.forEach(input => {
    input.addEventListener('input', () => {
      let val = parseInt(input.value) || 0;
      if (val < 0) input.value = 0;
      const totalCount = parseInt(regCount.value) || 0;
      const selectedElsewhere = Array.from(menuItemQties)
        .filter(other => other !== input)
        .reduce((sum, other) => sum + (parseInt(other.value) || 0), 0);
      const available = Math.max(0, totalCount - selectedElsewhere);
      if (val > available) input.value = available;
      updateMenuStatus();
    });
  });

  // Initial call to setup correct displays
  updateMenuStatus();
  updateChildChairOptions();
}

// Handle Form Submission
async function handleRegisterSubmit() {
  const name = document.getElementById('reg-name').value.trim();
  const count = parseInt(document.getElementById('reg-count').value) || 0;
  const adults = parseInt(document.getElementById('reg-adults').value) || 0;
  const children = parseInt(document.getElementById('reg-children').value) || 0;

  if (!name) {
    showRegStatus('error', '❌ 請輸入您的姓名！');
    return;
  }

  // 1. Validate Adults + Children == Count
  if (adults + children !== count) {
    showRegStatus('error', '❌ 大人人數加上小孩人數必須等於報名總人數！');
    return;
  }

  // 2. Validate Children details if Children > 0
  let childChair = '否';

  if (children > 0) {
    childChair = document.getElementById('reg-child-chair').value;
  }

  // Validate that child chair count does not exceed children count
  if (childChair !== '否') {
    const chairCount = parseInt(childChair) || 0;
    if (chairCount > children) {
      showRegStatus('error', '❌ 孩童椅需求的數量不能大於小孩人數！');
      return;
    }
  }

  // 3. Validate Menu Order Qty Sum == Count
  const menuItemQties = document.querySelectorAll('.menu-item-qty');
  let selectedSum = 0;
  const orders = {};
  menuItemQties.forEach(input => {
    const qty = parseInt(input.value) || 0;
    const dish = input.dataset.dish;
    orders[dish] = qty;
    selectedSum += qty;
  });

  if (selectedSum !== count) {
    showRegStatus('error', `❌ 每人限選一份主餐；目前選了 ${selectedSum} 份，必須與報名總人數 ${count} 人一致！`);
    return;
  }

  showRegStatus('info', '⏳ 正在提交報名資料，請稍候...');
  const submitBtn = document.getElementById('reg-submit');
  submitBtn.disabled = true;

  // Format orders text for display/email
  const ordersListText = Object.entries(orders)
    .filter(([_, qty]) => qty > 0)
    .map(([dish, qty]) => `${dish}: ${qty}份`)
    .join(', ');

  let dbSuccess = false;
  let dbMsg = '';

  const registrationData = {
    name: name,
    count: count,
    adults: adults,
    children: children,
    childChair: childChair,
    orders: orders,
    eventId: 'cmu_ph12_v2_20261128',
    eventDate: '2026-11-28',
    source: 'CMU-PH12-v2',
    timestamp: isFirebaseConnected && window.firebase
      ? firebase.firestore.FieldValue.serverTimestamp()
      : new Date().toISOString()
  };

  if (isFirebaseConnected && firestoreDB) {
    // Use the dedicated collection first, then the original site collection
    // for projects whose deployed rules have not yet added CMU-PH12.
    try {
      await firestoreDB.collection("cmu_ph12_registrations").add(registrationData);
      dbSuccess = true;
      dbMsg = '已上傳至雲端 Firebase';
    } catch (primaryError) {
      console.warn("Dedicated Firestore collection unavailable:", primaryError);
      try {
        await firestoreDB.collection("beitou_registrations").add(registrationData);
        dbSuccess = true;
        dbMsg = '已上傳至雲端活動資料庫';
      } catch (fallbackError) {
        console.error("Firestore fallback submit error:", fallbackError);
        const savedLocal = saveToLocalFallbackData(name, count, adults, children, childChair, orders);
        dbSuccess = savedLocal;
        dbMsg = savedLocal
          ? '雲端暫時無法連線，已儲存於此裝置並繼續送出通知'
          : `資料儲存失敗 (${fallbackError.message})`;
      }
    }
  } else {
    // Local fallback when Firebase config is missing
    const savedLocal = saveToLocalFallbackData(name, count, adults, children, childChair, orders);
    dbSuccess = savedLocal;
    dbMsg = savedLocal ? '已儲存至瀏覽器（本機預覽模式）' : '本機儲存失敗';
  }

  // Handle email notification via GAS or FormSubmit.co
  let emailMsg = '';
  if (dbSuccess) {
    const gasUrl = localStorage.getItem('gas_url');
    
    // Build unified data payload for email
    const emailPayload = {
      "姓名": name,
      "總人數": `${count} 人`,
      "大人人數": `${adults} 人`,
      "小孩人數": `${children} 人`
    };

    if (children > 0) {
      emailPayload["需要孩童椅數量"] = childChair;
    }

    emailPayload["午餐點餐明細"] = ordersListText;
    emailPayload["報名時間"] = new Date().toLocaleString('zh-TW');

    if (gasUrl) {
      // Send via Google Apps Script (No verification required, sends immediately)
      try {
        await fetch(gasUrl, {
          method: 'POST',
          mode: 'no-cors', // Avoid CORS issues
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });
        emailMsg = '，且已成功發送通知信 (透過 Google Apps Script)';
      } catch (e) {
        console.error("GAS Email send error:", e);
        emailMsg = '，但 Google Apps Script 發送失敗';
      }
    } else {
      // Fallback to FormSubmit.co (Requires one-time verification click)
      try {
        const response = await fetch('https://formsubmit.co/ajax/taiwan.kwei@ceci.com.tw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `【北投來走走】新報名通知：${name}`,
            _cc: 'taiwan.kwei@gmail.com,g0306@ceci.com.tw',
            ...emailPayload,
            _template: 'box'
          })
        });
        const result = await response.json().catch(() => ({}));
        if (response.ok && (result.success === true || result.success === 'true')) {
          emailMsg = '，且已發送通知信 (請確認主信箱是否已點擊 FormSubmit 驗證連結)';
        } else if (String(result.message || '').toLowerCase().includes('activation')) {
          emailMsg = '，但通知服務尚待主要信箱點擊啟用連結';
        } else {
          emailMsg = '，但 Email 通知發送失敗';
        }
      } catch (e) {
        console.error("FormSubmit send error:", e);
        emailMsg = '，但 Email 通知發送時發生錯誤';
      }
    }
  }

  if (dbSuccess) {
    showRegStatus('success', `🎉 報名成功！${dbMsg}${emailMsg}`);
    regForm.reset();
    hasWarnedMismatch = false;
    
    // Reset elements manually
    const childDetailsSection = document.getElementById('child-details-section');
    if (childDetailsSection) childDetailsSection.style.display = 'none';
    
    const menuSelectedStatus = document.getElementById('menu-selected-status');
    if (menuSelectedStatus) {
      menuSelectedStatus.textContent = '已選 0 / 1 份';
      menuSelectedStatus.style.color = '#ef4444';
    }
  } else {
    showRegStatus('error', `❌ 報名失敗：${dbMsg}。`);
  }
  submitBtn.disabled = false;
}

// Fallback logic to save registration data in localStorage (with details)
function saveToLocalFallbackData(name, count, adults, children, childChair, orders) {
  try {
    const localData = JSON.parse(localStorage.getItem('cmu_ph12_registrations') || '[]');
    localData.push({
      name: name,
      count: count,
      adults: adults,
      children: children,
      childChair: childChair,
      orders: orders,
      eventId: 'cmu_ph12_v2_20261128',
      eventDate: '2026-11-28',
      source: 'CMU-PH12-v2',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('cmu_ph12_registrations', JSON.stringify(localData));
    return true;
  } catch (e) {
    console.error("Failed to write to localStorage:", e);
    return false;
  }
}

// ==========================================================================
// PAGE INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadWeather();
  loadBibleVerse();
  initFirebase(); // Try initializing Firebase
  setupFormListeners(); // Set up registration form handlers
});
