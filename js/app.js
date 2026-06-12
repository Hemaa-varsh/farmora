/* ============================================
   FARMORA — app.js FINAL FIXED VERSION
   Only this file needs to be replaced!
============================================ */

/* GPS coordinates per state */
const stateCoords = {
  "Maharashtra":    { lat: 19.07, lon: 72.87, city: "Mumbai"      },
  "Tamil Nadu":     { lat: 13.08, lon: 80.27, city: "Chennai"     },
  "Andhra Pradesh": { lat: 17.38, lon: 78.48, city: "Hyderabad"   },
  "Uttar Pradesh":  { lat: 26.85, lon: 80.94, city: "Lucknow"     },
  "Madhya Pradesh": { lat: 23.25, lon: 77.41, city: "Bhopal"      },
  "Punjab":         { lat: 30.73, lon: 76.78, city: "Chandigarh"  },
  "Karnataka":      { lat: 12.97, lon: 77.59, city: "Bangalore"   },
  "Rajasthan":      { lat: 26.91, lon: 75.78, city: "Jaipur"      },
  "Gujarat":        { lat: 23.02, lon: 72.57, city: "Ahmedabad"   },
  "West Bengal":    { lat: 22.57, lon: 88.36, city: "Kolkata"     },
  "Bihar":          { lat: 25.59, lon: 85.13, city: "Patna"       },
  "Odisha":         { lat: 20.29, lon: 85.82, city: "Bhubaneswar" },
};

/* ── WEATHER RISK LABELS in all 6 languages ── */
const weatherLabels = {
  low:    { en:"Low Risk 🟢",      hi:"कम जोखिम 🟢",       ta:"குறைந்த அபாயம் 🟢", te:"తక్కువ రిస్క్ 🟢",  mr:"कमी धोका 🟢",    kn:"ಕಡಿಮೆ ಅಪಾಯ 🟢"   },
  medium: { en:"Moderate Risk 🟡", hi:"मध्यम जोखिम 🟡",    ta:"மிதமான அபாயம் 🟡",  te:"మధ్యస్థ రిస్క్ 🟡", mr:"मध्यम धोका 🟡",  kn:"ಮಧ್ಯಮ ಅಪಾಯ 🟡"  },
  high:   { en:"High Risk 🔴",     hi:"उच्च जोखिम 🔴",     ta:"அதிக அபாயம் 🔴",    te:"అధిక రిస్క్ 🔴",    mr:"जास्त धोका 🔴",  kn:"ಅಧಿಕ ಅಪಾಯ 🔴"   },
};

/* ── WEATHER ADVICE in all 6 languages ── */
const weatherAdvice = {
  heavy: {
    en: "Very heavy rain this week. Do NOT harvest — serious crop damage risk.",
    hi: "इस हफ्ते बहुत भारी बारिश। कटाई न करें — फसल नुकसान का खतरा।",
    ta: "இந்த வாரம் மிகவும் கனமழை. அறுவடை வேண்டாம் — பயிர் சேதம் ஆகலாம்.",
    te: "ఈ వారం చాలా భారీ వర్షం. పంట కోయవద్దు — పంట నష్టం జరగవచ్చు.",
    mr: "या आठवड्यात खूप जड पाऊस. कापणी करू नका — पिकाचे नुकसान होऊ शकते.",
    kn: "ಈ ವಾರ ತುಂಬಾ ಭಾರೀ ಮಳೆ. ಕಟಾವು ಮಾಡಬೇಡಿ — ಬೆಳೆ ನಷ್ಟ ಆಗಬಹುದು.",
  },
  moderate: {
    en: "Rain expected this week. Plan field work on dry days. Check drainage.",
    hi: "इस हफ्ते बारिश की संभावना। सूखे दिनों में काम करें। नाली जांचें।",
    ta: "இந்த வாரம் மழை எதிர்பார்க்கப்படுகிறது. வறண்ட நாட்களில் வேலை செய்யுங்கள்.",
    te: "ఈ వారం వర్షం అంచనా. పొడి రోజుల్లో పని చేయండి. కాలువలు తనిఖీ చేయండి.",
    mr: "या आठवड्यात पाऊस अपेक्षित. कोरड्या दिवशी काम करा. चर तपासा.",
    kn: "ಈ ವಾರ ಮಳೆ ನಿರೀಕ್ಷಿತ. ಒಣ ದಿನಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡಿ. ಚರಂಡಿ ಪರೀಕ್ಷಿಸಿ.",
  },
  light: {
    en: "Light rain possible. Plan outdoor work carefully this week.",
    hi: "हल्की बारिश संभव। इस हफ्ते बाहरी काम सावधानी से करें।",
    ta: "லேசான மழை சாத்தியம். இந்த வாரம் வெளிப்புற வேலையை கவனமாக திட்டமிடுங்கள்.",
    te: "తేలికపాటి వర్షం సాధ్యం. ఈ వారం బయటి పని జాగ్రత్తగా ప్లాన్ చేయండి.",
    mr: "हलका पाऊस शक्य. या आठवड्यात बाहेरचे काम काळजीपूर्वक करा.",
    kn: "ಹಗುರ ಮಳೆ ಸಾಧ್ಯ. ಈ ವಾರ ಹೊರಗಿನ ಕೆಲಸ ಎಚ್ಚರಿಕೆಯಿಂದ ಮಾಡಿ.",
  },
  clear: {
    en: "Mostly dry and clear. Excellent conditions for harvesting this week.",
    hi: "ज्यादातर सूखा और साफ। इस हफ्ते कटाई के लिए बढ़िया मौसम।",
    ta: "பெரும்பாலும் வறண்டது. இந்த வாரம் அறுவடைக்கு சிறந்த நிலைமைகள்.",
    te: "చాలావరకు పొడి మరియు స్పష్టంగా ఉంది. ఈ వారం పంట కోయడానికి అద్భుతమైన పరిస్థితులు.",
    mr: "बहुतांश कोरडे आणि स्वच्छ. या आठवड्यात कापणीसाठी उत्तम हवामान.",
    kn: "ಹೆಚ್ಚಾಗಿ ಒಣ ಮತ್ತು ಸ್ಪಷ್ಟ. ಈ ವಾರ ಕಟಾವಿಗೆ ಅತ್ಯುತ್ತಮ ಸ್ಥಿತಿ.",
  },
};

/* ── "Right now" city text in all languages ── */
const nowText = {
  en: " right now in ", hi: " अभी ", ta: " இப்போது ",
  te: " ఇప్పుడు ", mr: " आत्ता ", kn: " ಈಗ "
};

/* ── Weather code → description ── */
function getWeatherDesc(code) {
  if (code === 0) return { text:"Clear Sky ☀️",    risk:"low"    };
  if (code <= 3)  return { text:"Partly Cloudy ⛅", risk:"low"    };
  if (code <= 48) return { text:"Foggy 🌫️",        risk:"medium" };
  if (code <= 67) return { text:"Rainy 🌧️",        risk:"high"   };
  if (code <= 82) return { text:"Rain Showers 🌦️", risk:"medium" };
  if (code <= 99) return { text:"Thunderstorm ⛈️", risk:"high"   };
  return                 { text:"Variable 🌤️",     risk:"medium" };
}

/* ── Fetch with 5s timeout — prevents infinite loading ── */
function fetchWithTimeout(url, seconds) {
  var t = new Promise(function(_,reject){
    setTimeout(function(){ reject(new Error("timeout")); }, seconds*1000);
  });
  return Promise.race([fetch(url), t]);
}

/* ── FETCH LIVE WEATHER — Open-Meteo (free, no key) ── */
async function fetchRealWeather(state) {
  var c = stateCoords[state];
  if (!c) return null;
  var url = "https://api.open-meteo.com/v1/forecast"+
    "?latitude="+c.lat+"&longitude="+c.lon+
    "&current=temperature_2m,weathercode,windspeed_10m"+
    "&daily=precipitation_sum,temperature_2m_max,weathercode"+
    "&timezone=Asia%2FKolkata&forecast_days=7";
  try {
    var res  = await fetchWithTimeout(url, 5);
    if (!res.ok) throw new Error("status "+res.status);
    var data = await res.json();
    var cur  = data.current;
    var day  = data.daily;
    var desc = getWeatherDesc(cur.weathercode);
    return {
      condition : desc.text,
      risk      : desc.risk,
      temp      : cur.temperature_2m,
      windspeed : cur.windspeed_10m,
      rainyDays : day.precipitation_sum.filter(function(r){return r>1;}).length,
      totalRain : day.precipitation_sum.reduce(function(a,b){return a+b;},0).toFixed(1),
      maxTemp   : Math.max.apply(null,day.temperature_2m_max).toFixed(1),
      city      : c.city,
      isLive    : true
    };
  } catch(e) { return null; }
}

/* ── FETCH LIVE MANDI PRICE — data.gov.in (key from config.js) ── */
async function fetchMandiPrice(state, crop) {
  var MY_API_KEY = "579b464db66ec23bdd000001ee0bd475d6f744e355b157c55c6188ad";
  var cropMap = {
    "Rice (Paddy)":"Rice","Wheat":"Wheat","Cotton":"Cotton",
    "Sugarcane":"Sugarcane","Soybean":"Soybean","Maize (Corn)":"Maize",
    "Tomato":"Tomato","Onion":"Onion","Potato":"Potato",
    "Groundnut":"Groundnut","Turmeric":"Turmeric","Chilli":"Dry Chillies"
  };
  var commodity = cropMap[crop] || crop;
  var url = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"+
    "?api-key="+MY_API_KEY+
    "&format=json&limit=5"+
    "&filters%5Bstate%5D="+encodeURIComponent(state)+
    "&filters%5Bcommodity%5D="+encodeURIComponent(commodity);
  try {
    var res  = await fetchWithTimeout(url, 5);
    var data = await res.json();
    if (data.records && data.records.length > 0) {
      var r = data.records[0];
      return { modal:r.modal_price, min:r.min_price, max:r.max_price,
               market:r.market, date:r.arrival_date, isLive:true };
    }
    return null;
  } catch(e) { return null; }
}

/* ── Update result card HTML ── */
function setResult(valId, detailId, cardId, val, detail, badge, isLive) {
  document.getElementById(valId).textContent    = val;
  document.getElementById(detailId).textContent = detail;
  var card = document.getElementById(cardId);
  var old  = card.querySelector('.live-badge');
  if (old) old.remove();
  if (badge) {
    var b = document.createElement('div');
    b.className   = 'live-badge';
    b.textContent = badge;
    b.style.cssText = "margin-top:0.6rem;font-size:0.72rem;font-weight:600;"+
      "letter-spacing:0.3px;color:"+(isLive?'#95D5B2':'rgba(255,255,255,0.35)')+";";
    card.appendChild(b);
  }
}

/* ════════════════════════════════════════════
   MAIN FUNCTION — analyzeData()
   Called when "Analyze My Farm" is clicked
════════════════════════════════════════════ */
async function analyzeData() {

  var district = document.getElementById('district').value;
  var crop     = document.getElementById('crop').value;
  var soil     = document.getElementById('soil').value;
  var water    = document.getElementById('water').value;
  var langRaw  = document.getElementById('language').value;

  if (!district || !crop || !soil || !water) {
    alert("Please fill all fields to get your farm advice.");
    return;
  }

  /* Get language code — "Tamil" → "ta" */
  var lang = (typeof langCode!=="undefined" && langCode[langRaw]) ? langCode[langRaw] : "en";

  /* Show loading */
  document.getElementById('loading').classList.add('show');
  document.getElementById('results').classList.remove('show');

  /* Fetch both APIs at same time */
  var weatherData = null;
  var mandiData   = null;
  try {
    var results = await Promise.all([
      fetchRealWeather(district),
      fetchMandiPrice(district, crop)
    ]);
    weatherData = results[0];
    mandiData   = results[1];
  } catch(e) { /* stay null → smart data used */ }

  document.getElementById('loading').classList.remove('show');

  /* ─────────────────────────────────────
     RESULT 1 — SELL DECISION
     Live mandi price if available, else smart
  ───────────────────────────────────── */
  if (mandiData && mandiData.isLive) {
    var smartSell = getText(decisions.sell[crop], lang);
    setResult('sell-val','sell-detail','r-sell',
      "Modal Price: ₹"+mandiData.modal+" /quintal",
      "Min: ₹"+mandiData.min+"  |  Max: ₹"+mandiData.max+
      "  |  "+mandiData.market+(mandiData.date?" ("+mandiData.date+")":"")+
      " — "+smartSell.detail,
      "🛰️ LIVE — data.gov.in Mandi API", true);
  } else {
    var sellText = getText(decisions.sell[crop], lang);
    setResult('sell-val','sell-detail','r-sell',
      sellText.val, sellText.detail,
      "📊 Agmarknet Price Research", false);
  }

  /* ─────────────────────────────────────
     RESULT 2 — NEXT CROP
     Always translated smart data
  ───────────────────────────────────── */
  var cropText = getText(decisions.nextCrop[soil], lang);
  setResult('crop-val','crop-detail','r-crop',
    cropText.val, cropText.detail,
    "📊 Soil Health Research Data", false);

  /* ─────────────────────────────────────
     RESULT 3 — GOVT SCHEME
     Fully translated in all 6 languages ✅
  ───────────────────────────────────── */
  var schemeText = getText(decisions.schemes[district], lang);
  setResult('scheme-val','scheme-detail','r-scheme',
    schemeText.val, schemeText.detail,
    "📊 Ministry of Agriculture Data", false);

  /* ─────────────────────────────────────
     RESULT 4 — WEATHER RISK
     Live data → translated labels + advice ✅
     Fallback → translated smart data ✅
  ───────────────────────────────────── */
  if (weatherData && weatherData.isLive) {

    /* Risk label in user's language */
    var riskLabel = weatherLabels[weatherData.risk][lang] || weatherLabels[weatherData.risk]["en"];

    /* Advice text in user's language */
    var advice =
      weatherData.rainyDays >= 5 ? weatherAdvice.heavy[lang]    :
      weatherData.rainyDays >= 3 ? weatherAdvice.moderate[lang] :
      weatherData.rainyDays >= 1 ? weatherAdvice.light[lang]    :
                                   weatherAdvice.clear[lang];

    /* "Right now in Chennai" in user's language */
    var cityLine = weatherData.condition + (nowText[lang]||" in ") +
                   weatherData.city + " (" + weatherData.temp + "°C). " + advice;

    setResult('weather-val','weather-detail','r-weather',
      riskLabel, cityLine,
      "🛰️ LIVE — Open-Meteo Weather API", true);

  } else {
    /* Smart translated weather fallback */
    var weatherText = getText(decisions.weather[water], lang);
    setResult('weather-val','weather-detail','r-weather',
      weatherText.val, weatherText.detail,
      "📊 IMD Research-based Data", false);
  }

  /* Timestamp */
  var timeEl = document.getElementById('report-time');
  if (timeEl) {
    var now = new Date();
    timeEl.textContent = "Report generated: "+
      now.toLocaleDateString('en-IN')+" at "+now.toLocaleTimeString('en-IN')+
      (weatherData&&weatherData.isLive ? "  |  🛰️ Live data active" : "  |  📊 Smart data mode");
  }

  document.getElementById('results').classList.add('show');
  document.getElementById('results').scrollIntoView({behavior:'smooth',block:'nearest'});
}

/* Scroll animation */
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.6s ease both';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.prob-card, .feat-card, .step').forEach(function(el) {
  el.style.opacity = '0';
  observer.observe(el);
});
