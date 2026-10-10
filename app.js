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
        countyName: "Machakos & Lower Eastern",
        zone: "Arid & Semi-Arid Lands (ASAL)",
        soilProfile: "Sandy loam, quick draining but low organic matter. Highly responsive to rainfall spikes.",
        crops: [
            "Green Grams (Karembo/Nylon varieties)",
            "Short-duration Maize (e.g., Katumani Composites)",
            "Pigeon Peas",
            "Sweet Potatoes (Orange-Fleshed)"
        ],
        plantingTime: "Optimal Window: October 10th – October 25th. Plant immediately after the second consistent downpour.",
        landPrep: "Implement earth basins and contour ridges to trap running water. Add organic manure heavily to retain moisture when rains peak.",
        harvestMethod: "Harvest pods manually as soon as they dry to avoid rot. Use canvas tarpaulins for sun-drying; strictly avoid drying directly on bare soil."
    },
    "kakamega": {
        countyName: "Kakamega & Western Region",
        zone: "Lake Victoria Basin (High Rainfall)",
        soilProfile: "Deep fertile clay loams. Prone to waterlogging, flash flooding, and severe leaching of nutrients.",
        crops: [
            "Arrowroots (Nduma - planted along drainage pathways)",
            "High-yield Kales (Sukuma Wiki) & Cabbages",
            "Indigenous Vegetables (Managu, Terere)",
            "Irish Potatoes"
        ],
        plantingTime: "Optimal Window: Late September – Mid October. Stagger plantings 7 days apart to reduce crop loss risk.",
        landPrep: "Mandatory construction of raised beds (at least 30cm high). Dig deep, clear cutoff drains around the perimeter of the shamba to channel away excess rainwater.",
        harvestMethod: "Lift tubers immediately upon maturity; sitting in wet soil triggers rapid rot. Store harvested maize and beans on elevated wooden pallets inside well-ventilated structures."
    },
    "nyeri": {
        countyName: "Nyeri & Central Highlands",
        zone: "High-Altitude Highland",
        soilProfile: "Volcanic soils. Highly fertile but subject to extreme soil erosion and landslides on sloped terrains.",
        crops: [
            "Snow Peas & Sugar Snaps",
            "Mid-altitude Maize Hybrids",
            "Spinach & Broccoli",
            "Bush Beans"
        ],
        plantingTime: "Optimal Window: October 1st – October 15th. Avoid planting too late into November due to dropping temperatures.",
        landPrep: "Build or repair bench terraces. Plant Napier grass or Vetiver grass along contour lines to anchor topsoil against heavy El Niño downpours.",
        harvestMethod: "Utilize plastic crates for delicate vegetable harvesting to avoid bruising in wet weather. Ensure immediate transport to charcoal-coolers or shaded transit areas."
    },
    "taita_taveta": {
        countyName: "Taita Taveta County",
        zone: "Mixed Terrain (ASAL Plains & Highland Ridges)",
        soilProfile: "Varies significantly: Rich volcanic loams in the upper Taita Hills, transitioning down to fast-draining sandy clay loams in the lower plains.",
        crops: [
            "Drought-tolerant early Maize (e.g., PH4 or Coast Composites)",
            "Green Grams (Ndengu) & Cowpeas",
            "Sweet Potatoes (Dual-purpose for food and vine groundcover)",
            "High-value French Beans (upper runoff-irrigated zones)"
        ],
        plantingTime: "Optimal Window: October 5th – October 20th. Plant immediately with the first two steady rains to maximize the long seasonal rainfall profile.",
        landPrep: "Highland slopes require contour grass strips and check-dams to prevent landslide erosion. Lower plains should utilize broad earth basins and tied-ridges to harvest flood runoff efficiently.",
        harvestMethod: "Harvest grains as soon as physiological maturity is reached to safeguard crops against field molding. Store tightly inside Hermetic (PICS) bags placed on elevated wooden floor pallets."
    }
};

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
        const targetData = agricultureData[selectedKey];

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
