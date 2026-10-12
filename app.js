// app.js - The Agronomic Data Engine for El Niño 2026

// Mock Weather Database for Offline Demonstration Mode (October 2026 El Niño Season)
const mockWeatherData = {
    "Nairobi": {
        name: "Nairobi Central Hub",
        temp: 21.4,
        humidity: 88,
        description: "heavy intermittent rainfall, flash flood warnings active"
    },
    "Kakamega": {
        name: "Kakamega Agrometeorological Station",
        temp: 23.1,
        humidity: 94,
        description: "continuous torrential downpours, high waterlogging risk"
    },
    "Machakos": {
        name: "Machakos ASAL Monitoring Station",
        temp: 24.8,
        humidity: 79,
        description: "moderate convective storms, high runoff velocity observed"
    },
    "Nyeri": {
        name: "Nyeri Highland Hub",
        temp: 18.5,
        humidity: 91,
        description: "dense mist, heavy rainfall over sloped surfaces"
    },
    "Taita Taveta": {
        name: "Taita Taveta Meteorological Station",
        temp: 22.6,
        humidity: 82,
        description: "light orographic showers along hills, dry cloud layers over the plains"
    }
};

const agricultureData = {
   "machakos": {
        en: {
            countyName: "Machakos & Lower Eastern",
            zone: "Arid & Semi-Arid Lands (ASAL)",
            soilProfile: "Sandy loam, quick draining but low organic matter. Highly responsive to rainfall spikes.",
            crops: ["Green Grams (Ndengu)", "Short-duration Maize", "Pigeon Peas", "Sweet Potatoes"],
            plantingTime: "Optimal Window: October 10th – October 25th. Plant immediately after the second consistent downpour.",
            landPrep: "Implement earth basins and contour ridges to trap running water. Add organic manure heavily to retain moisture when rains peak.",
            harvestMethod: "Harvest pods manually as soon as they dry to avoid rot. Use canvas tarpaulins for sun-drying; strictly avoid drying directly on bare soil.",
            paybill: "PAYBILL: 400200 A/C: MKS-SHAMBA"
        },
        sw: {
            countyName: "Machakos na Ukambani ya Chini",
            zone: "Maeneo Kavu na Nusu Kavu (ASAL)",
            soilProfile: "Udongo wa kichanga na mchanga, unapitisha maji haraka lakini una mbolea kidogo. Huathiriwa haraka na kuongezeka kwa mvua.",
            crops: ["Ndengu", "Mahindi ya Muda Mfupi (Katumani)", "Mbaazi", "Viazi Vitamu vya Njano"],
            plantingTime: "Wakati Bora: Oktoba 10 – Oktoba 25. Panda mara baada ya mvua ya pili mfululizo kunyesha.",
            landPrep: "Tengeneza mashimo ya kuvuna maji (earth basins) na mitaro ya mteremko ili kuzuia mmomonyoko. Weka mbolea ya kutosha ili kuhifadhi unyevu.",
            harvestMethod: "Vuna mapema yakikauka ili kuzuia kuoza. Kausha juu ya turubai safi; usikaushe kamwe kwenye udongo wazi.",
            paybill: "PAYBILL: 400200 A/C: MKS-SHAMBA"
        }
    },
    "kakamega": {
        en: {
            countyName: "Kakamega & Western Region",
            zone: "Lake Victoria Basin (High Rainfall)",
            soilProfile: "Deep fertile clay loams. Prone to waterlogging, flash flooding, and severe leaching of nutrients.",
            crops: ["Arrowroots (Nduma)", "High-yield Kales (Sukuma Wiki)", "Indigenous Vegetables", "Irish Potatoes"],
            plantingTime: "Optimal Window: Late September – Mid October. Stagger plantings 7 days apart to reduce crop loss risk.",
            landPrep: "Mandatory construction of raised beds (at least 30cm high). Dig deep, clear cutoff drains around the perimeter of the shamba to channel away excess rainwater.",
            harvestMethod: "Lift tubers immediately upon maturity; sitting in wet soil triggers rapid rot. Store harvested maize and beans on elevated wooden pallets inside well-ventilated structures.",
            paybill: "PAYBILL: 400200 A/C: KKM-SHAMBA"
        },
        sw: {
            countyName: "Kakamega na Ukanda wa Magharibi",
            zone: "Bonde la Ziwa Victoria (Mvua Nyingi)",
            soilProfile: "Udongo wa tifutifu wa mfinyanzi wenye rutuba tele. Huwa na hatari kubwa ya kujaa maji na mmomonyoko wa virutubisho.",
            crops: ["Nduma", "Sukuma Wiki ya Mavuno Mengi", "Mboga za Kienyeji (Managu, Terere)", "Viazi Mviringo"],
            plantingTime: "Wakati Bora: Mwishoni mwa Septemba hadi Katikati ya Oktoba. Achanisha siku za kupanda kwa wiki moja ili kupunguza athari.",
            landPrep: "Ni lazima kutengeneza matuta yaliyoinuliwa (angalau sentimita 30). Chimba mitaro mirefu ya mifereji pembezoni mwa shamba ili kupitisha maji ya ziada.",
            harvestMethod: "Vuna viazi na nduma mara tu vinapokomaa; vikikaa kwenye udongo ulioloana vitaoza haraka. Hifadhi mahindi juu ya chanja zilizoinuliwa.",
            paybill: "PAYBILL: 400200 A/C: KKM-SHAMBA"
        }
    },
    "nyeri": {
        en: {
            countyName: "Nyeri & Central Highlands",
            zone: "High-Altitude Highland",
            soilProfile: "Volcanic soils. Highly fertile but subject to extreme soil erosion and landslides on sloped terrains.",
            crops: ["Snow Peas", "Mid-altitude Maize Hybrids", "Spinach & Broccoli", "Bush Beans"],
            plantingTime: "Optimal Window: October 1st – October 15th. Avoid planting too late into November due to dropping temperatures.",
            landPrep: "Build or repair bench terraces. Plant Napier grass or Vetiver grass along contour lines to anchor topsoil against heavy El Niño downpours.",
            harvestMethod: "Utilize plastic crates for delicate vegetable harvesting to avoid bruising in wet weather. Ensure immediate transport to charcoal-coolers or shaded transit areas.",
            paybill: "PAYBILL: 400200 A/C: NYR-SHAMBA"
        },
        sw: {
            countyName: "Nyeri na Nyanda za Juu Kati",
            zone: "Eneo la Nyanda za Juu",
            soilProfile: "Udongo wa volkano wenye rutuba ya juu lakini uko hatarini kwa mmomonyoko mkubwa wa udongo na maporomoko kwenye miteremko.",
            crops: ["Mbaazi za Snow Peas", "Mahindi ya Maeneo ya Juu", "Spinach na Brokoli", "Maharagwe ya Kawaida"],
            plantingTime: "Wakati Bora: Oktoba 1 hadi Oktoba 15. Epuka kupanda marehemu mnamo Novemba kwa sababu ya baridi kali.",
            landPrep: "Jenga au ukarabati matuta ya mteremko (bench terraces). Panda majani ya Napier au Vetiver kando ya miteremko ili kushikilia udongo wa juu.",
            harvestMethod: "Tumia kreti za plastiki kuvuna mboga laini ili zisiharibike kwenye mvua. Safirisha haraka hadi kwenye ghala baridi za mkaa.",
            paybill: "PAYBILL: 400200 A/C: NYR-SHAMBA"
        }
    },
    "taita_taveta": {
        en: {
            countyName: "Taita Taveta County",
            zone: "Mixed Terrain (ASAL Plains & Highland Ridges)",
            soilProfile: "Varies significantly: Rich volcanic loams in the upper Taita Hills, transitioning down to fast-draining sandy clay loams in the lower plains.",
            crops: ["Drought-tolerant early Maize", "Green Grams (Ndengu) & Cowpeas", "Sweet Potatoes", "French Beans"],
            plantingTime: "Optimal Window: October 5th – October 20th. Plant immediately with the first two steady rains to maximize the seasonal profile.",
            landPrep: "Highland slopes require contour grass strips and check-dams to prevent landslide erosion. Lower plains should utilize broad earth basins and tied-ridges to harvest flood runoff efficiently.",
            harvestMethod: "Harvest grains as soon as physiological maturity is reached to safeguard crops against field molding. Store tightly inside Hermetic (PICS) bags placed on elevated wooden floor pallets.",
            paybill: "PAYBILL: 400200 A/C: TVT-SHAMBA"
        },
        sw: {
            countyName: "Kaunti ya Taita Taveta",
            zone: "Mchanganyiko (Miteremko ya Juu na Tambarare Kavu)",
            soilProfile: "Inatofautiana: Tifutifu yenye rutuba kwenye Milima ya Taita, na udongo wa mchanga unaopitisha maji haraka kwenye nyanda za chini.",
            crops: ["Mahindi yanayovumilia ukame", "Ndengu na Kunde", "Viazi Vitamu", "Maharagwe ya Mishiri (Kandoni mwa Milima)"],
            plantingTime: "Wakati Bora: Oktoba 5 hadi Oktoba 20. Panda mapema baada ya mvua mbili za kwanza za mfululizo kunyesha.",
            landPrep: "Miteremko ya milimani inahitaji upandaji wa nyasi kando ya mistari na vizuizi vya maji. Nyanda za chini zitumie mashimo mapana kuvuna maji.",
            harvestMethod: "Vuna nafaka mara tu zinapokomaa ili kuzuia ukungu shambani kutokana na unyevu mwingi. Hifadhi kwenye mifuko ya kisasa ya Hermetic (PICS).",
            paybill: "PAYBILL: 400200 A/C: TVT-SHAMBA"
        }
    }
};

// Global Translation Object for Layout Labels
const uiTranslations = {
    en: {
        "app-title": "🌱 Shamba El Niño 2026",
        "app-subtitle": "Smart Farming Advisory Dashboard for Kenya's Short Rains Season",
        "select-label": "Select Target Agricultural Zone:",
        "header-soil": "⏳ Soil Profile & Condition",
        "header-crops": "🌾 Best Crops to Plant",
        "header-planting": "📅 Ideal Planting Window",
        "header-prep": "🚜 Land Prep & Infrastructure",
        "header-harvest": "🧺 Harvesting & Safe Storage",
        "sim-title": "🌊 Quick Drainage Tool",
        "sim-desc": "Simulate how your farm's soil will handle massive El Niño runoff.",
        "sim-label": "What is your shamba's primary soil type?",
        "sim-btn": "Analyze Drainage Risk",
        "sms-title": "📨 SMS & M-Pesa Format Generator",
        "sms-desc": "Convert this county advisory into a short text message format with standard checkout reminders for field distribution.",
        "sms-btn-copy": "📋 Copy SMS to Clipboard"
    },
    sw: {
        "app-title": "🌱 Shamba El Niño 2026",
        "app-subtitle": "Ushauri wa Kilimo cha Busara Wakati wa Mvua Fupi za El Niño Kenya",
        "select-label": "Chagua Eneo Lako la Kilimo (Kaunti):",
        "header-soil": "⏳ Hali na Tabia ya Udongo",
        "header-crops": "🌾 Mboga na Mazao Bora ya Kupanda",
        "header-planting": "📅 Kipindi Bora cha Kupanda Malengo",
        "header-prep": "🚜 Maandalizi ya Shamba na Mitaro",
        "header-harvest": "🧺 Uvunaji na Uhifadhi Salama wa Mazao",
        "sim-title": "🌊 Chombo cha Kupima Unyevu wa Udongo",
        "sim-desc": "Pima jinsi udongo wako utakavyokabiliana na mafuriko na mtiririko mkubwa wa maji ya El Niño.",
        "sim-label": "Je, shamba lako lina aina gani ya udongo?",
        "sim-btn": "Changanua Hatari ya Udongo",
        "sms-title": "📨 Chombo cha Kutengeneza Ujumbe wa SMS na M-Pesa",
        "sms-desc": "Badilisha ushauri huu kuwa ujumbe mfupi wa maandishi (SMS) unaoweza kutumwa kwa wakulima mashambani kwa urahisi.",
        "sms-btn-copy": "📋 Nakili SMS kwenye Simu Yako"
    }
};

// Track current global language state active
let currentLanguage = "en"; 
        
// --- Step 4: UI Controller & Event Listeners ---

document.addEventListener("DOMContentLoaded", () => {
    // 1. Gather UI Element References
    const printAdvisoryBtn = document.getElementById("print-advisory-btn");
    const countySelector = document.getElementById("county-selector");
    const advisoryDisplay = document.getElementById("advisory-display");
    
    const countyTitle = document.getElementById("county-title");
    const countyZone = document.getElementById("county-zone");
    const soilProfile = document.getElementById("soil-profile");
    const cropList = document.getElementById("crop-list");
    const plantingTime = document.getElementById("planting-time");
    const landPrep = document.getElementById("land-prep");
    const harvestMethod = document.getElementById("harvest-method");

    const simulateBtn = document.getElementById("simulate-btn");
    const soilTypeSelect = document.getElementById("soil-type");
    const simulationResult = document.getElementById("simulation-result");

    // 2. County Selection Change Handler
    countySelector.addEventListener("change", (event) => {
        printAdvisoryBtn.addEventListener("click", () => {
    window.print(); // Triggers native browser print dialog (Save as PDF profile)
});
        const selectedKey = event.target.value;
        const targetData = agricultureData[selectedKey] ? agricultureData[selectedKey][currentLanguage] : null;

        if (targetData) {
            // Update Text Nodes dynamically
            countyTitle.innerText = `Advisory for ${targetData.countyName}`;
            countyZone.innerText = targetData.zone;
            soilProfile.innerText = targetData.soilProfile;
            plantingTime.innerText = targetData.plantingTime;
            landPrep.innerText = targetData.landPrep;
            harvestMethod.innerText = targetData.harvestMethod;

            // Map and safely build out crop bullet fragments 
            cropList.innerHTML = targetData.crops
                .map(crop => `<li>🌱 ${crop}</li>`)
                .join('');

            // Compile a highly compressed text message layout string
const smsTemplate = currentLanguage === "en" 
            ? `SHAMBA ADVISORY [2026 EL NIÑO]: ${targetData.countyName.toUpperCase()}\n*Crops:* ${targetData.crops.join(', ')}.\n*M-Pesa:* ${targetData.paybill}`
            : `USHAURI WA KILIMO [EL NIÑO 2026]: ${targetData.countyName.toUpperCase()}\n*Mazao:* ${targetData.crops.join(', ')}.\n*M-Pesa:* ${targetData.paybill}`;
            
const smsTextArea = document.getElementById("sms-text-area").value = smsTemplate;
advisoryDisplay.classList.remove("hidden");

// Wire up the Copy to Clipboard Action Button
document.getElementById("copy-sms-btn").onclick = () => {
    smsTextArea.select();
    navigator.clipboard.writeText(smsTextArea.value);
    alert("🚀 SMS advisory snippet successfully copied to clipboard!");
};

// Wire up WhatsApp API Link Click Trigger 
document.getElementById("whatsapp-share-btn").onclick = () => {
    const encodedText = encodeURIComponent(smsTextArea.value);
    window.open(`https://whatsapp.com{encodedText}`, '_blank');
};    

            // Smoothly remove the hidden state utility class to show dashboard
            advisoryDisplay.classList.remove("hidden");
            
            // Scroll view down to the dynamic details on mobile configurations
            advisoryDisplay.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // 3. Drainage Simulation Engine Logic
    simulateBtn.addEventListener("click", () => {
        const selectedSoil = soilTypeSelect.value;
        let responseHTML = "";

        // Evaluate soil constraints and render contextual field operations
        switch(selectedSoil) {
            case "clay":
                responseHTML = `
                    <h4 style="color: #b71c1c;">⚠️ High Saturation & Waterlogging Risk</h4>
                    <p style="margin-top: 0.4rem;"><strong>El Niño Impact:</strong> Clay soils capture water too well, which suffocates roots within 48 hours of heavy rain.</p>
                    <p style="margin-top: 0.4rem; font-size: 0.9rem;"><strong>Action Plan:</strong> Dig 1-meter deep open perimeter ditches. Elevate planting beds to 30cm high. Do not apply nitrogen fertilizers during active heavy downpours to prevent deep leaching.</p>
                `;
                break;
            case "loam":
                responseHTML = `
                    <h4 style="color: #2e7d32;">✅ Optimal Infiltration & High Yield Potential</h4>
                    <p style="margin-top: 0.4rem;"><strong>El Niño Impact:</strong> Excellent moisture-retention balances. However, nutrients can wash away quickly down steep sloped profiles.</p>
                    <p style="margin-top: 0.4rem; font-size: 0.9rem;"><strong>Action Plan:</strong> Use contour grass barriers to anchor soil lines. Apply split-dose organic mulches to stabilize structure against intense rain drop impacts.</p>
                `;
                break;
            case "sandy":
                responseHTML = `
                    <h4 style="color: #e65100;">⚡ High Leaching & Erosion Threat</h4>
                    <p style="margin-top: 0.4rem;"><strong>El Niño Impact:</strong> Water moves through rapidly, meaning minimal waterlogging but high risk of completely washing away topsoil and organic compounds.</p>
                    <p style="margin-top: 0.4rem; font-size: 0.9rem;"><strong>Action Plan:</strong> Construct broad earth basins to trap water gently. Prioritize fast-growing groundcover crops like sweet potatoes to lock down loose topsoil layers.</p>
                `;
                break;
            default:
                responseHTML = "<p>Please select a valid local soil configuration profile.</p>";
        }

        // Display results to user
        simulationResult.innerHTML = responseHTML;
        simulationResult.classList.remove("hidden");
    });
});

// --- Multi-Page Navigation Switching Router Engine ---
function switchView(viewId) {
    // Hide all view content structures
    const contents = document.querySelectorAll('.tab-content-panel');
    contents.forEach(panel => panel.classList.add('hidden'));
    
    // Deactivate all styling tabs 
    const tabs = document.querySelectorAll('.tab-link');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Reveal selected view container
    document.getElementById(viewId).classList.remove('hidden');
    
    // Add active styling back to matching clicked button
    const activeBtn = Array.from(tabs).find(tab => tab.innerText.toLowerCase().includes(viewId.split('-')[0]));
    if(activeBtn) activeBtn.classList.add('active');
}

// --- Asynchronous Weather API Data Pipeline Fetcher ---
document.getElementById("fetch-weather-btn").addEventListener("click", async () => {
    const apiKey = document.getElementById("api-key-input").value.trim();
    const city = document.getElementById("weather-city").value;
    const outputContainer = document.getElementById("weather-stream-output");

    // --- Updated Asynchronous Weather API Data Pipeline with Offline Fail-safe ---
document.getElementById("fetch-weather-btn").addEventListener("click", async () => {
    const apiKey = document.getElementById("api-key-input").value.trim();
    const city = document.getElementById("weather-city").value;
    const outputContainer = document.getElementById("weather-stream-output");

    outputContainer.classList.remove("hidden");

    // OFFLINE MODE TRIGGER: Activated if API key is blank or explicitly labeled "demo"
    if (!apiKey || apiKey.toLowerCase() === "demo") {
        outputContainer.innerHTML = `<p style="color: #ef6c00;">📡 <em>Running in Offline Demo Mode (No API key provided)...</em></p>`;
        
        // Artificially pause for 400ms to simulate real network loading behavior
        setTimeout(() => {
            const localData = mockWeatherData[city];
            if (localData) {
                outputContainer.innerHTML = `
                    <h4 style="color: #e65100; font-size: 1.2rem; margin-bottom: 0.5rem;">🌍 Offline Stream: ${localData.name}</h4>
                    <p><strong>Current Temperature:</strong> ${localData.temp} °C</p>
                    <p><strong>Humidity Levels:</strong> ${localData.humidity}% (El Niño Moisture Alert)</p>
                    <p><strong>Atmospheric Summary:</strong> "${localData.description}"</p>
                    <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">ℹ️ <em>Displaying cached localized telemetry for the current October 2026 weather setup.</em></p>
                `;
            }
        }, 400);
        return;
    }

    // ONLINE MODE: Executes real network request if an API key is entered
    outputContainer.innerHTML = `<p style="color: #0288d1;">🔄 Querying live meteorological arrays for ${city}...</p>`;

    try {
        const url = `https://openweathermap.org{city},KE&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Failed to retrieve valid API mapping values.");
        
        const data = await response.json();
        
        outputContainer.innerHTML = `
            <h4 style="color: #0288d1; font-size: 1.2rem; margin-bottom: 0.5rem;">🌍 Live Stream: ${data.name} Hub</h4>
            <p><strong>Current Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Humidity Levels:</strong> ${data.main.humidity}% (High water retention danger marker)</p>
            <p><strong>Atmospheric Summary:</strong> "${data.weather[0].description}"</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #555;">🌤️ <em>Data updated automatically via live JSON endpoint.</em></p>
        `;
    } catch (error) {
        outputContainer.innerHTML = `
            <p style="color: #c62828;">❌ <strong>API Fetch Failure:</strong> The key provided could not be authenticated. Leave the field blank to test the offline demo profile instead.</p>
        `;
    }
});

    if (!apiKey) {
        alert("Please input a valid Weather API key configuration string first.");
        return;
    }

    outputContainer.innerHTML = `<p style="color: #666;">🔄 Querying live meteorological arrays for ${city}...</p>`;
    outputContainer.classList.remove("hidden");

    try {
        // Asynchronous structural fetch block to gather real weather configurations
        const url = `https://openweathermap.org{city},KE&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Failed to retrieve valid API mapping values.");
        
        const data = await response.json();
        
        // Render functional UI blocks mapping live telemetric weather components
        outputContainer.innerHTML = `
            <h4 style="color: #0288d1; font-size: 1.2rem; margin-bottom: 0.5rem;">🌍 Live Stream: ${data.name} Hub</h4>
            <p><strong>Current Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Humidity Levels:</strong> ${data.main.humidity}% (High water retention danger marker)</p>
            <p><strong>Atmospheric Summary:</strong> "${data.weather[0].description}"</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #555;">🌤️ <em>Data updated automatically via JSON endpoint loop.</em></p>
        `;
    } catch (error) {
        outputContainer.innerHTML = `
            <p style="color: #c62828;">❌ <strong>API Fetch Failure:</strong> Ensure your API configuration key parameter is fully authenticated.</p>
        `;
    }
});

// --- Core Dynamic Language Switcher Routine Router ---
function setLanguage(langCode) {
    currentLanguage = langCode;
    
    // 1. Update active styling across navigation header toggle buttons
    document.getElementById("btn-lang-en").classList.toggle("active", langCode === "en");
    document.getElementById("btn-lang-sw").classList.toggle("active", langCode === "sw");
    
    // 2. Loop through and map translations over static DOM data attributes
    const elementsToTranslate = document.querySelectorAll("[data-i18n]");
    elementsToTranslate.forEach(element => {
        const translationKey = element.getAttribute("data-i18n");
        if (uiTranslations[langCode] && uiTranslations[langCode][translationKey]) {
            element.innerText = uiTranslations[langCode][translationKey];
        }
    });
    
    // 3. Force active reload of select drop menu data if a county is currently open
    const countySelector = document.getElementById("county-selector");
    if (countySelector.value) {
        countySelector.dispatchEvent(new Event('change'));
    }
}
