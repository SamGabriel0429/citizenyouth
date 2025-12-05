

// ============================================
// 1. POLL ALGORITHM - Track & Analyze Youth Priorities
// ============================================

class PollAlgorithm {
    constructor() {
        this.pollResponses = {
            climate: { count: 0, options: {} },
            education: { count: 0, options: {} },
            livelihood: { count: 0, options: {} }
        };
        this.userProfile = {
            topPriorities: [],
            engagementLevel: 0,
            bookmarkedArticles: [],
            votedPolls: []
        };
        this.loadPollData();
    }

    loadPollData() {
        const savedData = localStorage.getItem('pollData');
        if (savedData) {
            this.pollResponses = JSON.parse(savedData);
        }
    }

    recordVote(pollId, option) {
        if (!this.pollResponses[pollId]) {
            this.pollResponses[pollId] = { count: 0, options: {} };
        }

        if (!this.pollResponses[pollId].options[option]) {
            this.pollResponses[pollId].options[option] = 0;
        }

        this.pollResponses[pollId].options[option]++;
        this.pollResponses[pollId].count++;
        this.userProfile.votedPolls.push(pollId);
        this.userProfile.engagementLevel += 5;

        this.savePollData();
        this.updateTrendingTopics();
    }

    getTrendingTopics() {
        const allVotes = [];
        for (const [pollId, data] of Object.entries(this.pollResponses)) {
            for (const [option, count] of Object.entries(data.options)) {
                allVotes.push({ pollId, option, count });
            }
        }
        return allVotes.sort((a, b) => b.count - a.count).slice(0, 3);
    }

    updateTrendingTopics() {
        const trending = this.getTrendingTopics();
        const trendCount = trending.reduce((sum, t) => sum + t.count, 0);
        const trendElement = document.querySelector('.trend-count');
        if (trendElement) {
            trendElement.textContent = `${trendCount} responses`;
        }
    }

    savePollData() {
        localStorage.setItem('pollData', JSON.stringify(this.pollResponses));
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    }

    getRecommendedActions() {
        // Recommend actions based on top voting priorities
        const trending = this.getTrendingTopics();
        const recommendations = {
            climate: ['Manila Bay Cleanup Drive', 'Zero Waste Movement in Barangays'],
            education: ['Free STEM Scholarship Program', 'STEM Workshop & Mentorship'],
            livelihood: ['Free Skills Training Programs', 'Startup Funding & Mentorship']
        };

        const recommended = [];
        trending.forEach(t => {
            if (recommendations[t.pollId]) {
                recommended.push(...recommendations[t.pollId]);
            }
        });
        return recommended;
    }
}

const pollAlgorithm = new PollAlgorithm();

// ============================================
// 2. TAB NAVIGATION
// ============================================

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

        // Add active class to clicked button and corresponding tab
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        // Track engagement
        pollAlgorithm.userProfile.engagementLevel += 2;
    });
});

// ============================================
// 3. FILTER FUNCTIONALITY
// ============================================

document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.getAttribute('data-filter');
        const newsCards = document.querySelectorAll('.news-card');

        newsCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('active'), 0);
            } else {
                const category = card.getAttribute('data-category');
                card.style.display = category === filter ? 'block' : 'none';
            }
        });
    });
});

// ============================================
// 4. NEWS CARD INTERACTIONS
// ============================================

document.querySelectorAll('.news-card').forEach(card => {
    // Like button
    const likeBtn = card.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            likeBtn.classList.toggle('liked');
            if (likeBtn.classList.contains('liked')) {
                likeBtn.textContent = '❤️';
                pollAlgorithm.userProfile.engagementLevel += 3;
                showToast('❤️ Article liked!');
            } else {
                likeBtn.textContent = '🤍';
            }
        });
    }

    // Bookmark button
    const bookmarkBtn = card.querySelector('.bookmark-btn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bookmarkBtn.classList.toggle('bookmarked');
            if (bookmarkBtn.classList.contains('bookmarked')) {
                bookmarkBtn.textContent = '🔖';
                pollAlgorithm.userProfile.bookmarkedArticles.push(card.querySelector('h3').textContent);
                showToast('📌 Article bookmarked!');
            } else {
                bookmarkBtn.textContent = '🔖';
            }
        });
    }

    // Share button
    const shareBtn = card.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = card.querySelector('h3').textContent;
            showToast(`📤 Sharing "${title}"...`);
            // Simulate share (in production, use Web Share API)
            if (navigator.share) {
                navigator.share({
                    title: 'Citizen Youth PH',
                    text: title,
                });
            }
        });
    }
});

// NOTE: Consolidated poll voting handler exists later to update counts and UI.

// ============================================
// 6. CITY SELECTOR
// ============================================

const citySelector = document.getElementById('citySelect');
if (citySelector) {
    // richer city data with real establishments, types and coordinates (approx.)
    const cityData = {
        manila: {
            name: 'Metro Manila',
            events: [
                { name: 'Rizal Park (Luneta)', icon: '🌳', type: 'park', coords: [120.9790, 14.5829], info: 'Historic national park and public space' },
                { name: 'University of the Philippines Manila', icon: '🎓', type: 'school', coords: [120.9747, 14.5872], info: 'Public university campus (UP Manila)' },
                { name: 'Manila City Hall', icon: '🏛️', type: 'government', coords: [120.9822, 14.6060], info: 'City government center' },
                { name: 'Manila Bay (Roxas Blvd)', icon: '🌊', type: 'landmark', coords: [120.9610, 14.5824], info: 'Coastal bay area and foreshore' }
            ]
        },
        cebu: {
            name: 'Cebu City',
            events: [
                { name: "Magellan's Cross", icon: '✝️', type: 'landmark', coords: [123.9009, 10.2939], info: 'Historical cross in downtown Cebu' },
                { name: 'University of San Carlos (Downtown)', icon: '🎓', type: 'school', coords: [123.9000, 10.3220], info: 'Established private university' },
                { name: 'Cebu Provincial Capitol', icon: '🏛️', type: 'government', coords: [123.9017, 10.3157], info: 'Provincial government offices' },
                { name: 'SM Seaside City Cebu', icon: '🏬', type: 'mall', coords: [123.8480, 10.2890], info: 'Large regional shopping center' }
            ]
        },
        davao: {
            name: 'Davao City',
            events: [
                { name: "People's Park", icon: '🌳', type: 'park', coords: [125.6248, 7.0741], info: 'Popular urban park' },
                { name: 'Davao City Hall', icon: '🏛️', type: 'government', coords: [125.6320, 7.0731], info: 'City government center' },
                { name: 'University of Southeastern Philippines', icon: '🎓', type: 'school', coords: [125.6480, 7.0740], info: 'Public university (USEP)' },
                { name: 'Southern Philippines Medical Center', icon: '🏥', type: 'hospital', coords: [125.6240, 7.0730], info: 'Major regional hospital' }
            ]
        },
        iloilo: {
            name: 'Iloilo City',
            events: [
                { name: 'Iloilo River Esplanade', icon: '🌊', type: 'park', coords: [122.5647, 10.7189], info: 'Riverside park and promenade' },
                { name: 'Iloilo City Hall', icon: '🏛️', type: 'government', coords: [122.5605, 10.6959], info: 'City government center' },
                { name: 'Jaro Cathedral', icon: '⛪', type: 'landmark', coords: [122.5580, 10.7142], info: 'Historic cathedral in Jaro' },
                { name: 'West Visayas State University', icon: '🎓', type: 'school', coords: [122.5530, 10.6960], info: 'Public university (WVSU)' }
            ]
        },
        quezon: {
            name: 'Quezon City',
            events: [
                { name: 'Quezon Memorial Circle', icon: '🕊️', type: 'park', coords: [121.0498, 14.6488], info: 'National park and memorial' },
                { name: 'University of the Philippines Diliman', icon: '🎓', type: 'school', coords: [121.0733, 14.6556], info: 'Main UP Diliman campus' },
                { name: 'Quezon City Hall', icon: '🏛️', type: 'government', coords: [121.0409, 14.6495], info: 'City government center' },
                { name: 'National Kidney and Transplant Institute', icon: '🏥', type: 'hospital', coords: [121.0460, 14.6480], info: 'Specialized medical center' }
            ]
        },
        cagayan: {
            name: 'Cagayan de Oro',
            events: [
                { name: 'Macahambus Cave', icon: '🏜️', type: 'landmark', coords: [124.6432, 8.5101], info: 'Scenic cave with river' },
                { name: 'Xavier University', icon: '🎓', type: 'school', coords: [124.6421, 8.5025], info: 'Private university campus' },
                { name: 'City Hall of Cagayan de Oro', icon: '🏛️', type: 'government', coords: [124.6327, 8.4875], info: 'City government center' },
                { name: 'Northern Mindanao Medical Center', icon: '🏥', type: 'hospital', coords: [124.6430, 8.5090], info: 'Regional medical facility' }
            ]
        },
        bacolod: {
            name: 'Bacolod City',
            events: [
                { name: 'The Ruins of Bacolod', icon: '🏯', type: 'landmark', coords: [122.9748, 10.6788], info: 'Historic mansion ruins' },
                { name: 'Negros Oriental University', icon: '🎓', type: 'school', coords: [122.9712, 10.6952], info: 'Private educational institution' },
                { name: 'Bacolod City Hall', icon: '🏛️', type: 'government', coords: [122.9805, 10.6965], info: 'City government center' },
                { name: 'Corazon Locsin Montelibano Memorial Regional Hospital', icon: '🏥', type: 'hospital', coords: [122.9750, 10.6850], info: 'Major hospital facility' }
            ]
        },
        zamboanga: {
            name: 'Zamboanga City',
            events: [
                { name: 'Fort Pilar Museum', icon: '🏰', type: 'landmark', coords: [122.0738, 6.9212], info: 'Historic Spanish fort' },
                { name: 'Zamboanga State College of Agriculture', icon: '🎓', type: 'school', coords: [122.0612, 6.9150], info: 'Agricultural college' },
                { name: 'Zamboanga City Hall', icon: '🏛️', type: 'government', coords: [122.0723, 6.9244], info: 'City government center' },
                { name: 'Zamboanga Medical Center', icon: '🏥', type: 'hospital', coords: [122.0740, 6.9300], info: 'Major city hospital' }
            ]
        },
        lapu: {
            name: 'Lapu-Lapu City',
            events: [
                { name: 'Lapu-Lapu Monument', icon: '🗿', type: 'landmark', coords: [124.0112, 10.3180], info: 'Monument to Philippine national hero' },
                { name: 'Mactan Doctors\' College', icon: '🎓', type: 'school', coords: [124.0130, 10.3220], info: 'Medical educational institution' },
                { name: 'Lapu-Lapu City Hall', icon: '🏛️', type: 'government', coords: [124.0140, 10.3200], info: 'City government center' },
                { name: 'Mactan Doctors\' Hospital', icon: '🏥', type: 'hospital', coords: [124.0100, 10.3150], info: 'Private hospital facility' }
            ]
        },
        imus: {
            name: 'Imus, Cavite',
            events: [
                { name: 'Imus Eco-Park', icon: '🌳', type: 'park', coords: [120.7452, 14.3085], info: 'Municipal ecological park' },
                { name: 'De La Salle University - Dasmariñas', icon: '🎓', type: 'school', coords: [120.7480, 14.3050], info: 'Private university extension' },
                { name: 'Imus Municipal Hall', icon: '🏛️', type: 'government', coords: [120.7560, 14.3100], info: 'Municipal government center' },
                { name: 'Imus District Hospital', icon: '🏥', type: 'hospital', coords: [120.7420, 14.3120], info: 'Municipal hospital' }
            ]
        },
        dumaguete: {
            name: 'Dumaguete City',
            events: [
                { name: 'Siliman University', icon: '🎓', type: 'school', coords: [123.3018, 9.3064], info: 'Historic private university' },
                { name: 'Rizal Boulevard', icon: '🌳', type: 'park', coords: [123.3065, 9.3080], info: 'Scenic waterfront boulevard' },
                { name: 'Dumaguete City Hall', icon: '🏛️', type: 'government', coords: [123.3055, 9.3120], info: 'City government center' },
                { name: 'Negros Oriental Provincial Hospital', icon: '🏥', type: 'hospital', coords: [123.3040, 9.3090], info: 'Provincial medical facility' }
            ]
        }
    };

    // Map-related state
    let mapInstance = null;
    let cityMarkers = [];
    let routeSource = null;
    let routeLayer = null;

    const cityCenters = {
        manila: [120.9842, 14.5995],
        cebu: [123.8854, 10.3157],
        davao: [125.6133, 7.1907],
        iloilo: [122.5656, 10.7202],
        quezon: [121.0437, 14.6760],
        cagayan: [124.6350, 8.5050],
        bacolod: [122.9750, 10.6900],
        zamboanga: [122.0730, 6.9200],
        lapu: [124.0120, 10.3190],
        imus: [120.7500, 14.3100],
        dumaguete: [123.3050, 9.3070]
    };

    // initialize MapLibre map if library is available
    function initMap() {
        if (!window.maplibregl) {
            console.warn('MapLibre GL not available — fallback to SVG map');
            showToast('3D map is unavailable — using fallback view');
            return;
        }

        try {
            mapInstance = new maplibregl.Map({
                container: 'cityMap',
                // use Carto Positron style for a clean, realistic basemap similar to Google Maps
                style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
                center: cityCenters.manila,
                zoom: 11,
                pitch: 60,
                bearing: -10,
                antialias: true
            });

            mapInstance.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

            mapInstance.on('load', () => {
                // hide decorative SVG background when the real map is active
                const bg = document.querySelector('.map-background-3d');
                if (bg) bg.style.display = 'none';

                // Move legend into the map container so it appears above the map
                const legend = document.querySelector('.map-legend');
                const mapContainer = document.getElementById('cityMap');
                if (legend && mapContainer && !mapContainer.querySelector('.map-legend')) {
                    const legendClone = legend.cloneNode(true);
                    mapContainer.parentElement.style.position = 'relative';
                    mapContainer.parentElement.appendChild(legendClone);
                }

                // add subtle sky layer if supported by the style
                try {
                    if (!mapInstance.getLayer('sky')) {
                        mapInstance.addLayer({
                            id: 'sky',
                            type: 'sky',
                            paint: {
                                'sky-type': 'atmosphere',
                                'sky-atmosphere-sun-intensity': 15
                            }
                        });
                    }
                } catch (e) { /* ignore if unsupported */ }

                // Try to add 3D building extrusion if the vector tiles contain building data
                try {
                    const style = mapInstance.getStyle();
                    const buildingLayers = style.layers.filter(l => 
                        l.id && l.id.toLowerCase().includes('building') && 
                        (l.type === 'fill' || l.type === 'fill-extrusion')
                    );
                    
                    buildingLayers.forEach(buildingLayer => {
                        if (!mapInstance.getLayer('3d-buildings-extrusion-' + buildingLayer.id)) {
                            try {
                                const source = buildingLayer.source;
                                const sourceLayer = buildingLayer['source-layer'] || 'building';

                                mapInstance.addLayer({
                                    id: '3d-buildings-extrusion-' + buildingLayer.id,
                                    source: source,
                                    'source-layer': sourceLayer,
                                    type: 'fill-extrusion',
                                    filter: ['has', 'height'],
                                    paint: {
                                        'fill-extrusion-color': '#c7d2e0',
                                        'fill-extrusion-height': ['get', 'height'],
                                        'fill-extrusion-base': 0,
                                        'fill-extrusion-opacity': 0.85
                                    }
                                }, buildingLayer.id);
                            } catch (e) {}
                        }
                    });
                } catch (err) {
                    console.warn('3D building extrusion not available for this style.', err);
                }
            });
        } catch (err) {
            console.error('Map initialization failed', err);
            showToast('Failed to initialize 3D map — fallback view active');
        }
    }

    // Build markers for a city and fly to center
    function showCityOnMap(selectedCity, cityInfo) {
        const center = cityCenters[selectedCity] || cityCenters.manila;
        if (!mapInstance) return;

        // remove old markers
        cityMarkers.forEach(m => m.remove());
        cityMarkers = [];

        // create markers with provided coordinates for each event
        cityInfo.events.forEach((ev, i) => {
            // use provided coordinates if available; otherwise fall back to a small offset from center
            const coords = ev.coords && ev.coords.length === 2 ? ev.coords : [center[0] + (i - 1.5) * 0.02, center[1] + (Math.sin(i) * 0.01)];

            const el = document.createElement('div');
            el.className = 'map-marker-lib';

            // color markers by type
            const typeColor = {
                school: '#3b82f6',
                hospital: '#ef4444',
                park: '#10b981',
                government: '#6b7280',
                mall: '#8b5cf6',
                landmark: '#f97316'
            };
            const color = typeColor[ev.type] || '#111827';

            el.innerHTML = `<div class="marker-pin-lib" title="${ev.name}" style="background:${color}; color:#fff">${ev.icon}</div>`;

            const marker = new maplibregl.Marker({ element: el })
                .setLngLat(coords)
                .setPopup(new maplibregl.Popup({ offset: 24 }).setText(ev.name + ' — ' + (ev.info || '')))
                .addTo(mapInstance);

            cityMarkers.push(marker);
        });

        // Draw route connecting all POIs
        drawRoute(cityInfo.events, selectedCity);

        mapInstance.flyTo({ center, zoom: 12.5, pitch: 60, bearing: -20, speed: 0.8 });
    }

    // Draw a route polyline connecting all events in order
    function drawRoute(events, cityName) {
        if (!mapInstance) return;

        // extract coordinates from events
        const coords = events
            .filter(ev => ev.coords && ev.coords.length === 2)
            .map(ev => ev.coords);

        if (coords.length < 2) return; // need at least 2 points for a route

        // remove old route layer and source if they exist
        if (routeLayer && mapInstance.getLayer(routeLayer.id)) {
            mapInstance.removeLayer(routeLayer.id);
        }
        if (routeSource && mapInstance.getSource(routeSource.id)) {
            mapInstance.removeSource(routeSource.id);
        }

        // create a GeoJSON feature for the route
        const routeGeoJSON = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: coords
            }
        };

        // add route source
        mapInstance.addSource('route-source', {
            type: 'geojson',
            data: routeGeoJSON
        });
        routeSource = { id: 'route-source' };

        // add route layer with gradient effect
        mapInstance.addLayer({
            id: 'route-layer',
            type: 'line',
            source: 'route-source',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#ff9a3c',
                'line-width': 4,
                'line-opacity': 0.8
            }
        });
        routeLayer = { id: 'route-layer' };

        // add faint glow beneath the route for depth
        mapInstance.addLayer({
            id: 'route-glow',
            type: 'line',
            source: 'route-source',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#ff9a3c',
                'line-width': 8,
                'line-opacity': 0.2
            }
        }, 'route-layer');

        showToast(`🗺️ Route created for ${cityName} with ${events.length} stops`);
    }

    // attach change handler that also updates the map
    citySelector.addEventListener('change', (e) => {
        const selectedCity = e.target.value;
        const cityInfo = cityData[selectedCity];

        // find the existing location list container (multiple possible names in markup)
        const locationList = document.querySelector('.location-list-3d') || document.querySelector('.location-list') || document.getElementById('location-list');
        if (!locationList) return;

        // Clear existing cards completely
        locationList.innerHTML = '';
        
        // Force reflow to ensure cleared state
        void locationList.offsetHeight;

        // build .location-card items
        cityInfo.events.forEach((event, idx) => {
            // calculate approx distance to next stop
            let nextStopInfo = '';
            if (idx < cityInfo.events.length - 1) {
                const current = event.coords || [center[0], center[1]];
                const next = cityInfo.events[idx + 1].coords || [center[0], center[1]];
                const approxDist = Math.round(
                    Math.sqrt(Math.pow(next[0] - current[0], 2) + Math.pow(next[1] - current[1], 2)) * 111 * 1000
                ) / 1000;
                nextStopInfo = `<p class="route-segment" style="font-size:12px; color:#64748b; margin-top:4px;">→ ${approxDist.toFixed(1)} km to next stop</p>`;
            }

            const div = document.createElement('div');
            div.className = 'location-card';
            div.setAttribute('data-location', event.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            div.setAttribute('data-index', idx);
            
            div.innerHTML = `
                <div class="location-left">
                    <div class="location-emoji">${event.icon}</div>
                    <div class="location-info">
                        <h3>${event.name}</h3>
                        <p class="location-event">${event.type.charAt(0).toUpperCase() + event.type.slice(1)} • ${event.info}</p>
                        <p class="location-time">Stop ${idx + 1} of ${cityInfo.events.length}</p>
                        ${nextStopInfo}
                    </div>
                </div>
                <div class="location-right">
                    <span class="location-distance-badge">${idx + 1}</span>
                    <span class="location-status">Route</span>
                </div>
            `;

            // Set animation - use will-change for performance
            const delay = idx * 0.06;
            div.style.willChange = 'opacity, transform';
            div.style.animation = `slideUp 0.3s ease-out ${delay}s forwards`;

            // Add click handler
            const cardIndex = idx;
            div.addEventListener('click', () => {
                if (cityMarkers[cardIndex] && mapInstance) {
                    const lngLat = cityMarkers[cardIndex].getLngLat();
                    mapInstance.flyTo({ center: [lngLat.lng, lngLat.lat], zoom: 15, pitch: 60, speed: 0.9 });
                    
                    div.style.backgroundColor = '#f0f9ff';
                    setTimeout(() => {
                        div.style.backgroundColor = '';
                    }, 600);
                }
            });

            locationList.appendChild(div);
        });

        // update the map markers and view
        if (mapInstance) {
            showCityOnMap(selectedCity, cityInfo);
        }

        showToast(`📍 Switched to ${cityInfo.name}`);
        pollAlgorithm.userProfile.engagementLevel += 2;
    });

    // Initialize the map immediately (maplibre script is loaded before app.js in index.html)
    initMap();

    // Render initial city view (use current value)
    (function initCity() {
        const evt = new Event('change');
        citySelector.dispatchEvent(evt);
    })();
}

// ============================================
// 7. INTERACTIVE MODALS FOR TAKE ACTION
// ============================================

// Modal management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Open modals on action button click
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modalId = btn.getAttribute('data-modal');
        if (modalId) {
            openModal(modalId);
            pollAlgorithm.userProfile.engagementLevel += 3;
        }
    });
});

// Close modals on close button or cancel button
document.querySelectorAll('.modal-close, .cancel-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modal = btn.closest('.modal');
        if (modal) {
            const modalId = modal.id;
            closeModal(modalId);
        }
    });
});

// Close modal when clicking outside (on background)
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// ============================================
// DONATION MODAL FUNCTIONALITY
// ============================================

let selectedDonationAmount = 500;

document.querySelectorAll('.donation-card').forEach(card => {
    card.addEventListener('click', () => {
        // Remove selection from all cards
        document.querySelectorAll('.donation-card').forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        selectedDonationAmount = parseInt(card.getAttribute('data-amount'));
        
        showToast(`💰 Selected ₱${selectedDonationAmount.toLocaleString()}`);
    });
});

// Set default selection
document.querySelector('.donation-card[data-amount="500"]').classList.add('selected');

document.getElementById('donate-confirm').addEventListener('click', () => {
    const selectedCause = document.querySelector('input[name="cause"]:checked').value;
    showToast(`🎉 Thank you for donating ₱${selectedDonationAmount.toLocaleString()} to ${selectedCause}!`);
    closeModal('donate-modal');
    pollAlgorithm.userProfile.engagementLevel += 10;
});

// ============================================
// VOLUNTEER MODAL FUNCTIONALITY
// ============================================

document.querySelectorAll('.vol-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const cardTitle = btn.closest('.volunteer-card').querySelector('h3').textContent;
        btn.textContent = '✓ Joined';
        btn.style.background = 'linear-gradient(135deg, #81c784, #66bb6a)';
        showToast(`🤝 Great! You joined "${cardTitle}"`);
        pollAlgorithm.userProfile.engagementLevel += 8;
        
        setTimeout(() => {
            btn.textContent = 'Join Now';
            btn.style.background = '';
        }, 2000);
    });
});

// ============================================
// EVENTS MODAL FUNCTIONALITY
// ============================================

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        showToast(`📅 Filtering: ${btn.textContent}`);
    });
});

document.querySelectorAll('.event-join-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('joined')) {
            const eventTitle = btn.closest('.event-item').querySelector('h3').textContent;
            btn.textContent = '✓ Joined';
            btn.classList.add('joined');
            showToast(`✨ You joined "${eventTitle}"!`);
            
            // Update events joined counter
            const eventsJoined = document.getElementById('eventsJoined');
            if (eventsJoined) {
                eventsJoined.textContent = String(parseInt(eventsJoined.textContent) + 1);
            }
            
            pollAlgorithm.userProfile.engagementLevel += 7;
        }
    });
});

// ============================================
// AWARENESS MODAL FUNCTIONALITY
// ============================================

const awarenessTextarea = document.querySelector('.awareness-textarea');
const charCount = document.querySelector('.char-count');

if (awarenessTextarea) {
    awarenessTextarea.addEventListener('input', () => {
        const current = awarenessTextarea.value.length;
        charCount.textContent = `${current}/280`;
    });
}

document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.getAttribute('data-platform');
        const message = awarenessTextarea.value;
        
        if (message.trim().length === 0) {
            showToast('⚠️ Please write a message first!');
            return;
        }
        
        showToast(`📤 Shared on ${platform.toUpperCase()}!`);
        pollAlgorithm.userProfile.engagementLevel += 5;
    });
});

document.getElementById('awareness-confirm').addEventListener('click', () => {
    const issue = document.querySelector('.awareness-select').value;
    const message = awarenessTextarea.value;
    
    if (message.trim().length === 0) {
        showToast('⚠️ Please write a message first!');
        return;
    }
    
    showToast(`🎉 Your awareness post about "${issue}" has been shared!`);
    closeModal('awareness-modal');
    
    // Reset form
    awarenessTextarea.value = '';
    charCount.textContent = '0/280';
    
    pollAlgorithm.userProfile.engagementLevel += 8;
});

// ============================================
// 8. POLL VOTING SYSTEM
// ============================================

const pollVotes = {
    climate: { climate: 42, waste: 35, water: 18, air: 5 },
    education: { vocational: 45, mental: 32, scholar: 17, digital: 6 },
    livelihood: { skills: 50, startup: 28, jobboard: 17, subsidies: 5 },
    health: { 'mental-health': 48, obesity: 28, substance: 18, reproductive: 6 },
    technology: { coding: 52, cybersecurity: 25, ai: 18, design: 5 },
    politics: { corruption: 55, inflation: 26, crime: 14, healthcare: 5 },
    culture: { language: 38, arts: 32, festivals: 22, museums: 8 },
    remittance: { education: 51, business: 28, skills: 15, healthcare: 6 },
    barangay: { community: 42, sports: 31, arts: 19, governance: 8 },
    jeepney: { affordable: 48, safety: 27, frequency: 18, environment: 7 }
};
// Render poll cards from `pollVotes` data
function renderPolls() {
    document.querySelectorAll('.poll-card').forEach(card => {
        const pollId = card.getAttribute('data-poll-id');
        if (!pollId) return;
        const data = pollVotes[pollId];
        if (!data) return;
        const total = Object.values(data).reduce((a, b) => a + b, 0) || 0;

        card.querySelectorAll('.poll-option').forEach(option => {
            const radio = option.querySelector('input[type="radio"]');
            if (!radio) return;
            const value = radio.value;
            const count = data[value] || 0;
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            const bar = option.querySelector('.poll-bar');
            const percentSpan = option.querySelector('.poll-percent');
            if (bar) bar.style.width = percentage + '%';
            if (percentSpan) percentSpan.textContent = percentage + '%';
        });

        const info = card.querySelector('.poll-info');
        if (info) info.textContent = `📊 ${total.toLocaleString()} votes`;
    });
}

// Centralized vote handler (defensive)
document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const pollCard = btn.closest('.poll-card');
        if (!pollCard) return;
        const pollId = pollCard.getAttribute('data-poll-id');
        if (!pollId) { showToast('Poll id not found'); return; }

        const selectedOption = pollCard.querySelector('input[type="radio"]:checked');
        if (!selectedOption) { showToast('⚠️ Please select an option first!'); return; }

        const selectedValue = selectedOption.value;

        // Ensure pollVotes structure exists
        if (!pollVotes[pollId]) pollVotes[pollId] = {};
        if (!pollVotes[pollId][selectedValue]) pollVotes[pollId][selectedValue] = 0;

        // Update vote count
        pollVotes[pollId][selectedValue]++;

        // Re-render polls to update percentages and totals
        renderPolls();

        // Disable voting UI for this poll
        btn.disabled = true;
        btn.textContent = '✓ Vote Recorded';
        btn.style.opacity = '0.65';
        pollCard.querySelectorAll('input[type="radio"]').forEach(radio => radio.disabled = true);

        const optionText = selectedOption.parentElement.querySelector('span')?.textContent || selectedValue;
        showToast(`✨ Your vote for "${optionText}" recorded!`, { position: 'top', duration: 3500 });

        // Update engagement and analytics
        pollAlgorithm.userProfile.engagementLevel += 5;
        pollAlgorithm.recordVote(pollId, selectedValue);
    });
});

// Ensure polls render on load
renderPolls();

// Poll option selection visual feedback
document.querySelectorAll('.poll-option label').forEach(label => {
    label.addEventListener('change', function() {
        const option = this.closest('.poll-option');
        option.closest('.poll-options').querySelectorAll('.poll-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});

// ============================================
// 8. TOAST NOTIFICATION
// ============================================

function showToast(message, opts = {}) {
    // opts: { position: 'top'|'bottom', duration: ms }
    const position = opts.position || 'top';
    const duration = typeof opts.duration === 'number' ? opts.duration : 3000;

    // find or create a toast for the requested position
    let toast = document.querySelector('.toast.' + (position === 'top' ? 'top' : 'bottom') );
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast ' + (position === 'top' ? 'top' : 'bottom');
        // Accessibility
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('aria-hidden', 'true');
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    // ensure visible
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('show');

    // hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
        toast.setAttribute('aria-hidden', 'true');
    }, duration);
}

// ============================================
// 9. SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const newsCards = document.querySelectorAll('.news-card');

        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || content.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        if (query.length > 0) {
            pollAlgorithm.userProfile.engagementLevel += 1;
        }
    });
}

// ============================================
// 10. ENGAGEMENT TRACKING & LOCAL STORAGE
// ============================================

window.addEventListener('beforeunload', () => {
    pollAlgorithm.savePollData();
    localStorage.setItem('lastEngagementLevel', pollAlgorithm.userProfile.engagementLevel);
});

// Display engagement level on page load
window.addEventListener('load', () => {
    const saved = localStorage.getItem('lastEngagementLevel');
    if (saved) {
        pollAlgorithm.userProfile.engagementLevel = parseInt(saved);
        console.log('Welcome back! Your engagement level:', pollAlgorithm.userProfile.engagementLevel);
    }
});

// ============================================
// 11. COMMUNITY: Chat, Reports, Basic Moderation, Privacy
// ============================================

// Simple client-side message store (for prototype/demo)
const LOCAL_MESSAGES_KEY = 'communityMessages_v1';
const LOCAL_REPORTS_KEY = 'communityReports_v1';
const LOCAL_BANNED_KEY = 'communityBanned_v1';

function loadLocalMessages() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_MESSAGES_KEY) || '[]');
    } catch (e) { return []; }
}

function saveLocalMessages(msgs) {
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(msgs));
}

function loadReports() {
    try { return JSON.parse(localStorage.getItem(LOCAL_REPORTS_KEY) || '[]'); } catch (e) { return []; }
}

function saveReports(reports) {
    localStorage.setItem(LOCAL_REPORTS_KEY, JSON.stringify(reports));
}

function loadBanned() {
    try { return JSON.parse(localStorage.getItem(LOCAL_BANNED_KEY) || '[]'); } catch (e) { return []; }
}

function saveBanned(list) { localStorage.setItem(LOCAL_BANNED_KEY, JSON.stringify(list)); }

// Demo user id (in a real app, use authenticated user)
const CURRENT_USER = localStorage.getItem('citizen_username') || 'You';

// Profanity simple filter (editable)
const PROFANITY = ['badword1','badword2'];

function censorText(text) {
    let t = text;
    PROFANITY.forEach(w => {
        const rx = new RegExp(w, 'ig');
        t = t.replace(rx, '****');
    });
    return t;
}

// Render messages
function renderMessages() {
    const messages = loadLocalMessages();
    const banned = loadBanned();
    const container = document.getElementById('messages');
    if (!container) return;
    container.innerHTML = '';
    if (!messages || messages.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'messages-empty';
        empty.textContent = 'No messages yet — start the conversation!';
        container.appendChild(empty);
        return;
    }

    messages.forEach(m => {
        try {
            if (banned.includes(m.sender)) return; // hide messages from banned users
            const div = document.createElement('div');
            div.className = 'message' + (m.sender === CURRENT_USER ? ' you' : '');
            const meta = document.createElement('div'); meta.className = 'meta';
            meta.textContent = `${m.sender} • ${new Date(m.createdAt).toLocaleTimeString()}`;
            const body = document.createElement('div'); body.className = 'body';
            body.textContent = censorText(m.text);

            const actions = document.createElement('div'); actions.className = 'actions';
            const rpt = document.createElement('button'); rpt.className = 'btn small'; rpt.textContent = 'Report';
            rpt.addEventListener('click', () => openReportDialog(m.id));
            actions.appendChild(rpt);

            div.appendChild(meta);
            div.appendChild(body);
            div.appendChild(actions);
            container.appendChild(div);
        } catch (err) {
            console.error('Error rendering message', err, m);
        }
    });
    container.scrollTop = container.scrollHeight;
}

// Create a message
function sendMessage(text) {
    if (!text || text.trim().length === 0) return;
    const banned = loadBanned();
    if (banned.includes(CURRENT_USER)) {
        showToast('You are restricted from posting.');
        return;
    }
    const messages = loadLocalMessages();
    const id = 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
    const msg = { id, sender: CURRENT_USER, text: text.trim(), createdAt: Date.now() };
    // Basic local filtering; if contains a high-risk term, auto-flag
    const lowered = text.toLowerCase();
    const hasProfanity = PROFANITY.some(w => lowered.includes(w));
    messages.push(msg);
    saveLocalMessages(messages);
    renderMessages();
    if (hasProfanity) {
        // auto-create a report entry for moderators
        const reports = loadReports();
        reports.push({ id: 'r_' + Date.now(), messageId: id, reason: 'profanity', status: 'new', createdAt: Date.now() });
        saveReports(reports);
        updateModQueue();
    }
    pollAlgorithm.userProfile.engagementLevel += 1;
}

// Report flow
let currentReportTarget = null;
function openReportDialog(messageId) {
    currentReportTarget = messageId;
    openModal('report-modal');
}

document.getElementById('report-confirm')?.addEventListener('click', () => {
    const reason = document.getElementById('reportReason').value;
    const details = document.getElementById('reportDetails').value || '';
    if (!currentReportTarget) { showToast('No message selected.'); return; }
    const reports = loadReports();
    reports.push({ id: 'r_' + Date.now(), messageId: currentReportTarget, reason, details, status: 'new', createdAt: Date.now() });
    saveReports(reports);
    showToast('Thank you — report submitted.');
    closeModal('report-modal');
    updateModQueue();
});

// Moderator queue view (basic)
function updateModQueue() {
    const mod = document.getElementById('modQueue');
    const reports = loadReports();
    if (!mod) return;
    if (reports.length === 0) { mod.textContent = 'No reports'; return; }
    mod.innerHTML = '';
    reports.slice().reverse().forEach(r => {
        const row = document.createElement('div');
        row.className = 'mod-row';
        row.innerHTML = `<div style="font-size:13px;color:#0f172a;">Report: ${r.reason} • <small>${new Date(r.createdAt).toLocaleString()}</small></div>`;
        const openBtn = document.createElement('button'); openBtn.className='btn small'; openBtn.textContent='Review';
        openBtn.addEventListener('click', () => reviewReport(r.id));
        row.appendChild(openBtn);
        mod.appendChild(row);
    });
}

function reviewReport(reportId) {
    const reports = loadReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    // Find message
    const messages = loadLocalMessages();
    const msg = messages.find(m => m.id === report.messageId);
    const preview = msg ? `${msg.sender}: ${msg.text}` : 'Message not found';
    if (confirm(`Report: ${report.reason}\n\n${preview}\n\nTake action: OK = Remove message, Cancel = Dismiss`)) {
        // Remove message from store
        const remaining = messages.filter(m => m.id !== report.messageId);
        saveLocalMessages(remaining);
        // mark report closed
        report.status = 'actioned';
        saveReports(reports);
        showToast('Message removed.');
        renderMessages();
        updateModQueue();
    } else {
        report.status = 'dismissed';
        saveReports(reports);
        showToast('Report dismissed.');
        updateModQueue();
    }
}

// Moderator panel visibility toggle (demo: press modShowBtn to reveal)
// Support both the internal modShowBtn and external modToggle
function toggleModeratorPanel() {
    const panel = document.getElementById('moderatorPanel');
    if (!panel) return;
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    updateModQueue();
}

const modShowBtn = document.getElementById('modShowBtn');
if (modShowBtn) modShowBtn.addEventListener('click', toggleModeratorPanel);
const modToggle = document.getElementById('modToggle');
if (modToggle) modToggle.addEventListener('click', toggleModeratorPanel);

// Privacy settings (simple local store)
function openPrivacySettings() {
    // for demo, show a prompt
    const pref = localStorage.getItem('privacy_dm') || 'everyone';
    const pick = prompt('DMs allowed from (everyone/friends/nobody):', pref);
    if (pick) {
        localStorage.setItem('privacy_dm', pick);
        showToast(`Privacy: DMs set to ${pick}`);
    }
}

document.getElementById('open-privacy')?.addEventListener('click', openPrivacySettings);
document.getElementById('open-guidelines')?.addEventListener('click', () => openModal('guidelines-modal'));

// Send chat
const sendChatBtn = document.getElementById('sendChat');
if (sendChatBtn) {
    sendChatBtn.addEventListener('click', () => {
        const input = document.getElementById('chatInput');
        if (!input) return;
        sendMessage(input.value);
        input.value = '';
    });
}

const chatInputEl = document.getElementById('chatInput');
if (chatInputEl) {
    chatInputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (sendChatBtn) sendChatBtn.click();
        }
    });
}

// Initial render
renderMessages();
updateModQueue();

// ============================================
// 12. NOTIFICATIONS (simple local prototype)
// ============================================

const NOTIFICATIONS_KEY = 'cy_notifications_v1';

function loadNotifications() {
    try { return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]'); } catch (e) { return []; }
}

function saveNotifications(list) { localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(list)); }

function updateNotifBadge() {
    const list = loadNotifications();
    const unread = list.filter(n => !n.read).length;
    const badge = document.getElementById('notifBadge');
    if (!badge) return;
    if (unread > 0) {
        badge.classList.add('show');
        badge.setAttribute('aria-hidden', 'false');
        badge.textContent = String(unread);
    } else {
        badge.classList.remove('show');
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = '0';
    }
}

function renderNotifications() {
    const list = loadNotifications().slice().reverse(); // show newest first
    const asideList = document.getElementById('notificationsList');
    const dropdownList = document.getElementById('notifDropdownList');
    if (asideList) {
        if (list.length === 0) asideList.innerHTML = 'No notifications yet';
        else asideList.innerHTML = list.slice(0,5).map(n => `<div class="notif-item ${n.read? '': 'unread'}" data-id="${n.id}"><div class="left">${n.icon||'🔔'}</div><div><div class="body"><strong>${n.title}</strong><div class="meta">${n.message}</div></div></div></div>`).join('');
    }
    if (dropdownList) {
        if (list.length === 0) dropdownList.innerHTML = '<div class="notif-empty">No notifications</div>';
        else dropdownList.innerHTML = list.map(n => `
            <div class="notif-item ${n.read? '': 'unread'}" data-id="${n.id}">
                <div class="left">${n.icon||'🔔'}</div>
                <div class="body">
                    <div><strong>${n.title}</strong></div>
                    <div class="meta">${n.message}</div>
                    <div class="meta">${new Date(n.createdAt).toLocaleString()}</div>
                </div>
            </div>
        `).join('');
    }

    // Attach click handlers for items in dropdown and aside
    document.querySelectorAll('#notifDropdownList .notif-item, #notificationsList .notif-item').forEach(el => {
        el.addEventListener('click', (e) => {
            const id = el.getAttribute('data-id');
            markAsRead(id);
            const notif = loadNotifications().find(n => n.id === id);
            if (notif && notif.url) {
                window.open(notif.url, '_blank');
            }
        });
    });

    updateNotifBadge();
}

function createNotification({ title, message, category='general', url=null, icon='🔔', urgent=false }) {
    const list = loadNotifications();
    const n = { id: 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2,8), title, message, category, url, icon, read: false, createdAt: Date.now() };
    list.push(n);
    saveNotifications(list);
    renderNotifications();
    // Show prominent toast for urgent government updates
    if (urgent || category === 'government') {
        showToast(`🔔 ${title}`);
        showPopupNotification(n);
    } else {
        // non-urgent: small unobtrusive toast + list update
        updateNotifBadge();
    }
}

// Popup notification helper
function showPopupNotification(n) {
    if (!n) return;
    let container = document.getElementById('popupNotifContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'popupNotifContainer';
        container.className = 'popup-container';
        document.body.appendChild(container);
    }

    const el = document.createElement('div');
    el.className = 'popup-notif entering';
    el.setAttribute('role','status');
    el.setAttribute('aria-live','polite');
    el.innerHTML = `
        <div class="icon">${n.icon||'🔔'}</div>
        <div class="p-body">
            <div class="p-title">${n.title}</div>
            <div class="p-msg">${n.message}</div>
        </div>
        <button class="p-close" aria-label="Close">✕</button>
    `;

    const closeBtn = el.querySelector('.p-close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        el.classList.remove('entering');
        el.classList.add('exiting');
        setTimeout(() => el.remove(), 320);
    });

    // Click the popup to open URL if available and mark read
    el.addEventListener('click', (e) => {
        if (n.url) window.open(n.url, '_blank');
        markAsRead(n.id);
        el.classList.remove('entering');
        el.classList.add('exiting');
        setTimeout(() => el.remove(), 320);
    });

    container.appendChild(el);

    // Auto-dismiss after 5s
    setTimeout(() => {
        if (!document.body.contains(el)) return;
        el.classList.remove('entering');
        el.classList.add('exiting');
        setTimeout(() => { try { el.remove(); } catch(e){} }, 320);
    }, 5000);
}

function markAsRead(id) {
    const list = loadNotifications();
    const item = list.find(n => n.id === id);
    if (item) item.read = true;
    saveNotifications(list);
    renderNotifications();
}

function markAllRead() {
    const list = loadNotifications().map(n => ({ ...n, read: true }));
    saveNotifications(list);
    renderNotifications();
}

function toggleNotifDropdown() {
    const dd = document.getElementById('notifDropdown');
    if (!dd) return;
    dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
    // when opening, mark all visible as read? we'll wait for explicit action
}

// Hook up UI
document.getElementById('notifBell')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNotifDropdown();
    renderNotifications();
});
document.getElementById('markAllReadBtn')?.addEventListener('click', (e) => { e.stopPropagation(); markAllRead(); });

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dd = document.getElementById('notifDropdown');
    const bell = document.getElementById('notifBell');
    if (!dd || !bell) return;
    if (!dd.contains(e.target) && !bell.contains(e.target)) {
        dd.style.display = 'none';
    }
});

// Seed a sample government update once (flagged)
if (!localStorage.getItem('seeded_notifications_v1')) {
    createNotification({ title: 'Government Update: New Student Aid', message: 'DSWD announces ₱1,000 assistance for eligible students — check eligibility details.', category: 'government', url: '#', icon: '🏛️', urgent: true });
    localStorage.setItem('seeded_notifications_v1', 'true');
}

// Render notifications on load
renderNotifications();
updateNotifBadge();

// Expose a small helper for testing moderator access
// In production: role-based auth decides this
if (localStorage.getItem('is_moderator') === 'true') {
    const mp = document.getElementById('moderatorPanel');
    if (mp) mp.style.display = 'block';
    const mt = document.getElementById('modToggle');
    if (mt) mt.style.display = 'inline-block';
}

