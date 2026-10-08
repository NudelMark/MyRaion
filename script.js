(() => {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const icon = (name, className = "ico") => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
    const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
    const pluralize = (count, one, few, many) => {
        const mod100 = count % 100;
        const mod10 = count % 10;
        if (mod100 >= 11 && mod100 <= 14) return many;
        if (mod10 === 1) return one;
        if (mod10 >= 2 && mod10 <= 4) return few;
        return many;
    };
    const resident = { name: "Жаркова Лора", initials: "ЖЛ" };

    const places = [
        { id: "park", title: "Парк Победы", kind: "Парк и прогулки", category: "park", icon: "park", distance: "Центр Белгорода", lat: 50.5992, lng: 36.5857, color: "sage", text: "Любимое место для прогулок, спорта и семейных выходных. В парке работают детские и спортивные площадки." },
        { id: "school", title: "Школа № 20", kind: "Образование", category: "education", icon: "school", distance: "Центральный район", lat: 50.6037, lng: 36.6016, color: "gold", text: "Школа рядом с домом: учебные классы, спортивный зал и бесплатные кружки после уроков." },
        { id: "clinic", title: "Поликлиника № 4", kind: "Здоровье", category: "medicine", icon: "hospital", distance: "Центральный район", lat: 50.5968, lng: 36.5735, color: "rose", text: "Взрослое отделение, приём специалистов и профилактические осмотры." },
        { id: "library", title: "Городская библиотека", kind: "Культура", category: "culture", icon: "culture", distance: "Центральный район", lat: 50.5922, lng: 36.601, color: "lilac", text: "Книги, лекции, кинопоказы и уютное пространство для работы." },
        { id: "stadium", title: "Стадион «Салют»", kind: "Спорт", category: "sport", icon: "sport", distance: "Центральный район", lat: 50.593, lng: 36.571, color: "mint", text: "Открытые тренировки, беговые дорожки и игровые площадки." },
        { id: "square", title: "Сквер у фонтана", kind: "Парк и прогулки", category: "park", icon: "leaf", distance: "Белгород", lat: 50.5882, lng: 36.5884, color: "sage", text: "Тихий зелёный сквер с местами для отдыха и вечерними прогулками." }
    ];

    const projects = [
        { id: "embankment", title: "Новая набережная Везёлки", kind: "Благоустройство", category: "build", icon: "park", status: "В работе", statusClass: "work", progress: 68, year: "2026", color: "sage", place: "Центральный район", text: "Продолжаем создавать удобный маршрут вдоль реки: велодорожки, освещение и места для отдыха." },
        { id: "school-renovation", title: "Школа будущего № 20", kind: "Образование", category: "build", icon: "school", status: "В работе", statusClass: "work", progress: 42, year: "2026", color: "gold", place: "Харьковская гора", text: "Обновляем учебные пространства, спортивный зал и территорию школы." },
        { id: "square-renovation", title: "Сквер «Молодёжный»", kind: "Благоустройство", category: "build", icon: "leaf", status: "Скоро", statusClass: "build", progress: 18, year: "2027", color: "mint", place: "Западный район", text: "В сквере появятся новые деревья, тихие зоны и площадка для соседских встреч." },
        { id: "road-repair", title: "Улица Гостёнская", kind: "Дороги", category: "build", icon: "road", status: "В работе", statusClass: "work", progress: 76, year: "2026", color: "lilac", place: "Центр", text: "Ремонтируем тротуары и обновляем освещение на одном из главных пешеходных маршрутов." },
        { id: "sports-center", title: "Соседский спортивный центр", kind: "Спорт", category: "future", icon: "sport", status: "В планах", statusClass: "idea", progress: 12, year: "2027", color: "rose", place: "Северный район", text: "Новый центр объединит секции, тренажёрный зал и площадку для командных игр." },
        { id: "river-park", title: "Зелёный маршрут у реки", kind: "Экология", category: "future", icon: "leaf", status: "Проектирование", statusClass: "work", progress: 34, year: "2028", color: "sage", place: "Южный район", text: "Свяжем существующие парки непрерывным пешеходным маршрутом с тенистыми зонами." }
    ];

    const events = [
        { id: "jazz", title: "Джаз в городском парке", kind: "Музыка", category: "Музыка", icon: "event", day: "12", month: "июн", time: "18:00", color: "lilac", place: "Парк Победы", text: "Тёплый летний вечер, живая музыка и любимые мелодии под открытым небом." },
        { id: "market", title: "Маркет местных мастеров", kind: "Городская жизнь", category: "Город", icon: "idea", day: "14", month: "июн", time: "12:00", color: "gold", place: "Соборная площадь", text: "Керамика, украшения и домашние угощения от белгородских авторов." },
        { id: "run", title: "Забег «Бежим вместе»", kind: "Спорт", category: "Спорт", icon: "sport", day: "15", month: "июн", time: "09:00", color: "mint", place: "Набережная Везёлки", text: "Дистанции для любого темпа, разминка с тренером и медали участникам." },
        { id: "cinema", title: "Кино под звёздами", kind: "Кино", category: "Культура", icon: "event", day: "18", month: "июн", time: "20:30", color: "rose", place: "Парк Победы", text: "Большой экран, пледы на траве и хороший фильм в компании соседей." }
    ];

    const clubs = [
        { id: "robotics", title: "Юные инженеры", kind: "Наука и технологии", category: "Наука", icon: "idea", color: "lilac", place: "Детский технопарк, ул. Королёва, 5", text: "Робототехника и первые проекты для детей 8–14 лет. Первое занятие — бесплатно." },
        { id: "football", title: "Футбольная секция «Старт»", kind: "Спорт", category: "Спорт", icon: "sport", color: "mint", place: "Стадион «Салют»", text: "Тренировки для детей и подростков любого уровня подготовки." },
        { id: "painting", title: "Рисуем вместе", kind: "Творчество", category: "Творчество", icon: "culture", color: "rose", place: "Городская библиотека", text: "Неспешные занятия живописью для взрослых и детей от 10 лет." },
        { id: "dance", title: "Танцы для всех", kind: "Танцы", category: "Спорт", icon: "groups", color: "gold", place: "Центр молодёжных инициатив", text: "Современная хореография, новые друзья и хорошее настроение." }
    ];

    const services = [
        { id: "transport", title: "Транспорт", kind: "Маршруты и расписание", icon: "bus", color: "mint", text: "Проверьте маршруты, расписание и полезную информацию для поездок по городу." },
        { id: "documents", title: "Документы", kind: "Городские услуги", icon: "doc", color: "gold", text: "Куда обратиться за справкой, оформить документы или получить консультацию." },
        { id: "report", title: "Сообщить о проблеме", kind: "Обратная связь", icon: "message", color: "rose", text: "Расскажите о городской проблеме — ваше обращение будет сохранено в профиле." },
        { id: "health", title: "Здоровье", kind: "Полезные контакты", icon: "hospital", color: "lilac", text: "Адреса поликлиник, расписание и телефоны городских медицинских учреждений." },
        { id: "education", title: "Образование", kind: "Школы и кружки", icon: "school", color: "gold", text: "Найдите школу, кружок или секцию рядом с домом." },
        { id: "emergency", title: "Важные телефоны", kind: "Всегда под рукой", icon: "message", color: "rose", text: "Единый номер экстренных служб — 112. Звонок бесплатный." }
    ];

    const districts = ["Болховец", "Центральный", "Харьковская гора", "Северный", "Западный", "Южный"];
    const categories = [
        { id: "all", label: "Всё рядом" },
        { id: "build", label: "Стройки" },
        { id: "future", label: "Будущее" },
        { id: "education", label: "Образование" },
        { id: "medicine", label: "Здоровье" },
        { id: "sport", label: "Спорт" },
        { id: "culture", label: "Культура" },
        { id: "park", label: "Парки" },
        { id: "event", label: "События" }
    ];
    const mapItems = [
        ...places,
        ...projects.map((item, index) => ({
            ...item, category: item.category, kind: "Городской проект",
            lat: [50.5947, 50.6055, 50.5816, 50.5982, 50.6121, 50.5784][index],
            lng: [36.5796, 36.5991, 36.5683, 36.6094, 36.5862, 36.6117][index],
            distance: item.place
        })),
        ...events.map((item, index) => ({
            ...item, category: "event", kind: "Событие",
            lat: [50.5992, 50.5958, 50.5947, 50.5992][index],
            lng: [36.5857, 36.5875, 36.5796, 36.5857][index],
            distance: `${item.day} ${item.month}`
        }))
    ];

    const defaultState = {
        district: "Болховец",
        profileInitialized: false,
        saved: [],
        proposals: [],
        supported: [],
        joinedEvents: [],
        votes: {},
        readNotifications: false
    };
    let state = { ...defaultState };
    let currentSection = "home";
    let mapCategory = "all";
    let mapSelection = null;
    let activeModal = null;
    const liveMaps = new Map();
    const filters = { build: "all", futureYear: "all", futureStatus: "all", proposal: "all", eventTime: "all", eventCategory: "all", club: "all" };

    const readState = () => {
        try {
            const saved = localStorage.getItem("myrayon-state");
            if (saved) state = { ...defaultState, ...JSON.parse(saved) };
        } catch (error) {
            console.error("Не удалось восстановить данные района:", error);
            showToast("Не удалось прочитать сохранённые данные. Продолжаем без них.");
        }
        if (!state.profileInitialized) {
            state.district = defaultState.district;
            state.profileInitialized = true;
            persist();
        }
    };
    const persist = () => {
        try {
            localStorage.setItem("myrayon-state", JSON.stringify(state));
        } catch (error) {
            console.error("Не удалось сохранить данные района:", error);
            showToast("Не удалось сохранить изменения в браузере.");
        }
    };

    function showToast(message) {
        const container = $("#toasts");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `${icon("check")}<span>${escapeHTML(message)}</span>`;
        container.append(toast);
        window.setTimeout(() => {
            toast.classList.add("is-out");
            window.setTimeout(() => toast.remove(), 240);
        }, 3000);
    }

    function artwork(item, extra = "") {
        const color = escapeHTML(item.color || "sage");
        const artIcon = escapeHTML(item.icon || "pin");
        return `<div class="card__media art art--${color} ${extra}"><span class="art__sun"></span><span class="art__shape art__shape--one"></span><span class="art__shape art__shape--two"></span><span class="art__icon">${icon(artIcon)}</span><span class="art__caption">${escapeHTML(item.kind || "")}</span></div>`;
    }

    function card(item, options = {}) {
        const saved = state.saved.includes(item.id);
        const status = item.status ? `<span class="badge badge--${escapeHTML(item.statusClass || "idea")}"><span class="badge__dot"></span>${escapeHTML(item.status)}</span>` : "";
        const progress = typeof item.progress === "number" ? `<div class="progress"><div class="progress__track"><div class="progress__bar" style="width:${item.progress}%"></div></div><div class="progress__labels"><span>Готовность</span><b>${item.progress}%</b></div></div>` : "";
        const date = item.day ? `<span>${icon("calendar")} ${escapeHTML(item.day)} ${escapeHTML(item.month)}, ${escapeHTML(item.time)}</span>` : "";
        const actionLabel = options.actionLabel || (item.day ? (state.joinedEvents.includes(item.id) ? "Вы записаны" : "Буду") : "Подробнее");
        return `<article class="card" data-card="${escapeHTML(item.id)}">
            ${artwork(item)}
            <div class="card__body">
                ${status}
                <h3 class="card__title">${escapeHTML(item.title)}</h3>
                <div class="card__meta">${date || `<span>${icon("pin")} ${escapeHTML(item.place || item.kind || "")}</span>`}</div>
                <p class="card__text">${escapeHTML(item.text || "")}</p>
                ${progress}
                <div class="card__foot">
                    <button class="btn btn--soft btn--sm" data-action="${item.day ? "join" : "details"}" data-id="${escapeHTML(item.id)}">${escapeHTML(actionLabel)}</button>
                    <button class="icon-btn save-btn ${saved ? "is-saved" : ""}" data-action="save" data-id="${escapeHTML(item.id)}" aria-label="${saved ? "Убрать из сохранённого" : "Сохранить"}" aria-pressed="${saved}">${icon("star")}</button>
                </div>
            </div>
        </article>`;
    }

    function filterButtons(items, active, key, label) {
        return items.map((item) => `<button class="chip ${active === item.id ? "is-active" : ""}" role="tab" aria-selected="${active === item.id}" data-filter="${key}" data-value="${escapeHTML(item.id)}">${escapeHTML(item.label)}</button>`).join("");
    }

    function renderMap(hostId) {
        const host = $("#" + hostId);
        if (!host || liveMaps.has(hostId)) return;
        host.dataset.ready = "true";
        host.innerHTML = `
            <div class="map__filters" role="group" aria-label="Фильтр объектов на карте"></div>
            <div class="map__canvas" id="${hostId}Canvas" role="application" aria-label="Интерактивная карта Белгорода"></div>
            <div class="map__status" role="status" aria-live="polite" hidden></div>
            <div class="map__zoom" aria-label="Масштаб карты">
                <button data-action="zoom-in" aria-label="Приблизить">${icon("zoom-in")}</button>
                <button data-action="zoom-out" aria-label="Отдалить">${icon("zoom-out")}</button>
                <button data-action="locate" aria-label="Показать мой район">${icon("locate")}</button>
            </div>
            <div class="map__card-slot"></div>`;
        $(".map__filters", host).innerHTML = filterButtons(categories, mapCategory, "map", "");
        if (!window.L) {
            showMapStatus(host, "Не удалось загрузить карту. Проверьте подключение к интернету.");
            return;
        }
        createMap(host, $("#" + hostId + "Canvas", host), hostId, { showPlaces: true });
        if (hostId === "mapHostPage") renderMapList();
    }

    function createMap(host, canvas, key, options = {}) {
        const map = L.map(canvas, {
            center: [50.596, 36.587],
            zoom: options.zoom || 13,
            maxZoom: 20,
            zoomControl: false,
            scrollWheelZoom: false,
            tap: true,
            attributionControl: false
        });
        L.control.attribution({ prefix: false }).addTo(map);
        const markerLayer = options.showPlaces
            ? L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: 46,
                disableClusteringAtZoom: 16,
                iconCreateFunction: (cluster) => L.divIcon({
                    className: "map-cluster",
                    html: `<span>${cluster.getChildCount()}</span>`,
                    iconSize: [44, 44]
                })
            }).addTo(map)
            : L.layerGroup().addTo(map);
        const record = { host, map, markerLayer, markers: new Map(), key, showPlaces: options.showPlaces === true };
        liveMaps.set(key, record);
        let hasLoadedTiles = false;
        let failureTimer = 0;
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>',
            maxZoom: 20
        }).on("tileload", () => {
            hasLoadedTiles = true;
            window.clearTimeout(failureTimer);
            const status = $(".map__status", host);
            if (status) status.hidden = true;
        }).on("tileerror", () => {
            if (hasLoadedTiles || failureTimer) return;
            failureTimer = window.setTimeout(() => {
                if (!host.isConnected || hasLoadedTiles) return;
                showMapStatus(host, "Не удалось загрузить карту. Проверьте подключение к интернету.");
            }, 7000);
        }).addTo(map);
        refreshMapMarkers(record);
        map.invalidateSize({ pan: false });
        map.on("click", (event) => {
            if (key !== "proposal") return;
            const { lat, lng } = event.latlng;
            record.selectedMarker?.remove();
            record.selectedMarker = L.marker([lat, lng], {
                title: "Выбранное место",
                keyboard: true
            }).addTo(map);
            const input = $("input[name='location']", host);
            const hint = $(".pick-map__hint", host);
            if (input) input.value = JSON.stringify({ lat, lng });
            if (hint) hint.textContent = `Место отмечено: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        });
        return record;
    }

    function showMapStatus(host, message) {
        const status = $(".map__status", host);
        if (!status) return;
        status.replaceChildren(document.createTextNode(message + " "));
        const link = document.createElement("a");
        link.href = "https://www.openstreetmap.org/#map=14/50.596/36.587";
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = "Открыть OpenStreetMap";
        status.append(link);
        status.hidden = false;
    }

    function allMapItems() {
        const proposals = state.proposals.filter((proposal) => proposal.location).map((proposal) => ({
            ...proposal, category: "proposal", lat: proposal.location.lat, lng: proposal.location.lng, distance: proposal.place
        }));
        return [...mapItems, ...proposals];
    }

    function refreshMapMarkers(record) {
        if (!record.showPlaces) return;
        record.markerLayer.clearLayers();
        record.markers.clear();
        const visible = allMapItems().filter((item) => mapCategory === "all" || item.category === mapCategory);
        for (const item of visible) {
            if (!Number.isFinite(item.lat) || !Number.isFinite(item.lng)) continue;
            const marker = L.marker([item.lat, item.lng], {
                title: item.title,
                alt: `${item.title}, ${item.kind}`,
                keyboard: true,
                icon: L.divIcon({
                    className: "map-marker-shell",
                    html: `<span class="map-pin ${item.id === mapSelection ? "is-selected" : ""}" data-marker="${escapeHTML(item.id)}">${icon(item.icon || "pin", "map-pin__icon")}</span>`,
                    iconSize: [42, 48],
                    iconAnchor: [21, 44]
                })
            }).addTo(record.markerLayer);
            marker.on("click", () => setMapSelection(item.id));
            record.markers.set(item.id, marker);
        }
    }

    function renderMapList() {
        const list = $("#mapListItems");
        if (!list) return;
        const visible = allMapItems().filter((item) => mapCategory === "all" || item.category === mapCategory);
        $("#mapListCount").textContent = `${visible.length} ${pluralize(visible.length, "место рядом", "места рядом", "мест рядом")}`;
        list.innerHTML = visible.map((item) => `<button class="map-item ${item.id === mapSelection ? "is-active" : ""}" data-action="select-map-item" data-id="${escapeHTML(item.id)}"><span class="map-item__ico">${icon(item.icon)}</span><span><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.kind)} · ${escapeHTML(item.distance)}</small></span>${icon("chevron")}</button>`).join("");
    }

    function showMapCard(host, item) {
        if (!host) return;
        const slot = $(".map__card-slot", host);
        if (!slot) return;
        if (!item) {
            slot.innerHTML = "";
            return;
        }
        slot.innerHTML = `<article class="map__card">
            <button class="icon-btn map__card-close" data-action="close-map-card" aria-label="Закрыть">${icon("close")}</button>
            ${artwork(item, "map__card-media")}
            <div class="map__card-body">
                <span class="badge badge--accent">${escapeHTML(item.kind)}</span>
                <h3>${escapeHTML(item.title)}</h3>
                <small class="muted">${escapeHTML(item.distance || item.place || "")}</small>
                <p class="card__text">${escapeHTML(item.text || "")}</p>
                <div class="map__card-actions"><button class="btn btn--accent btn--sm" data-action="details" data-id="${escapeHTML(item.id)}">Подробнее</button><button class="btn btn--ghost btn--sm" data-action="save" data-id="${escapeHTML(item.id)}">${state.saved.includes(item.id) ? "Сохранено" : "Сохранить"}</button></div>
            </div>
        </article>`;
    }

    function setMapSelection(id) {
        mapSelection = id;
        for (const record of liveMaps.values()) {
            const highlight = () => record.markers.forEach((marker, markerId) => {
                const pin = marker.getElement() && $(".map-pin", marker.getElement());
                if (pin) pin.classList.toggle("is-selected", markerId === id);
            });
            highlight();
            if (record.markers.has(id) && record.host.isConnected && record.host.closest(".section")?.classList.contains("is-active")) {
                const marker = record.markers.get(id);
                if (marker) {
                    record.markerLayer.zoomToShowLayer(marker, () => {
                        highlight();
                        record.map.flyTo(marker.getLatLng(), Math.max(record.map.getZoom(), 16), { duration: .35 });
                    });
                }
            }
            showMapCard(record.host, allMapItems().find((item) => item.id === id));
        }
        renderMapList();
    }

    function locateOnMap(record) {
        if (!navigator.geolocation) {
            showToast("Браузер не поддерживает определение местоположения.");
            return;
        }
        const status = $(".map__status", record.host);
        if (status) {
            status.textContent = "Определяем ваше местоположение…";
            status.hidden = false;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const point = [position.coords.latitude, position.coords.longitude];
            record.userMarker?.remove();
            record.userMarker = L.circleMarker(point, {
                radius: 8,
                color: "#fff",
                weight: 3,
                fillColor: "#285b4d",
                fillOpacity: 1
            }).addTo(record.map).bindTooltip("Вы здесь");
            record.map.flyTo(point, 16, { duration: .5 });
            if (status) status.hidden = true;
            showToast("Показано ваше местоположение");
        }, (error) => {
            const message = error.code === error.PERMISSION_DENIED
                ? "Разрешите доступ к геопозиции в настройках браузера."
                : "Не удалось определить местоположение. Попробуйте ещё раз.";
            if (status) status.hidden = true;
            showToast(message);
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
    }

    function renderPoll(target) {
        if (!target) return;
        const options = ["Больше зелени и тенистых мест", "Удобные тротуары и велодорожки", "Площадки для отдыха и спорта"];
        const vote = state.votes.neighborhood || "";
        const counts = options.map((_, index) => [42, 31, 27][index] + (vote === String(index) ? 1 : 0));
        const total = counts.reduce((sum, count) => sum + count, 0);
        target.innerHTML = `<div class="vote"><h3 class="vote__q">Каким сделать наш двор?</h3><p class="vote__sub">Выберите, что важнее для соседей · ${total} голосов</p>${options.map((option, index) => {
            const percentage = Math.round(counts[index] / total * 100);
            return `<button class="vote__opt ${vote ? "is-voted" : ""} ${vote === String(index) ? "is-mine" : ""}" data-action="vote" data-value="${index}" aria-pressed="${vote === String(index)}"><span class="vote__fill" style="width:${vote ? percentage : 0}%"></span><span class="vote__row"><b>${option}</b><span class="vote__pct">${vote ? `${percentage}%` : ""}</span></span></button>`;
        }).join("")}${vote ? `<p class="vote__done">${icon("check")} Ваш голос учтён</p>` : ""}</div>`;
    }

    function renderProposals() {
        const userProposals = state.proposals;
        const defaults = [
            { id: "proposal-light", title: "Добавить освещение на аллее", kind: "Благоустройство", icon: "idea", category: "proposal", color: "gold", place: "Центральный район", text: "Вечером на дорожке темно — давайте сделаем прогулки безопаснее.", support: 84, status: "На рассмотрении", statusClass: "work" },
            { id: "proposal-bench", title: "Скамейки у остановки «Парк»", kind: "Комфорт", icon: "park", category: "proposal", color: "sage", place: "Харьковская гора", text: "Здесь ждут автобус семьи с детьми и пожилые соседи. Пара скамеек очень поможет.", support: 56, status: "Собираем голоса", statusClass: "idea" },
            { id: "proposal-bike", title: "Велопарковка у библиотеки", kind: "Транспорт", icon: "road", category: "proposal", color: "mint", place: "Центр", text: "Удобная велопарковка поможет чаще выбирать велосипед для поездок в библиотеку.", support: 31, status: "Собираем голоса", statusClass: "idea" }
        ];
        const all = [...userProposals, ...defaults];
        const visible = filters.proposal === "all" ? all : all.filter((proposal) => proposal.status === filters.proposal);
        $("#proposalGrid").innerHTML = visible.length ? visible.map((proposal) => `<article class="card">${artwork(proposal)}<div class="card__body"><span class="badge badge--${escapeHTML(proposal.statusClass)}"><span class="badge__dot"></span>${escapeHTML(proposal.status)}</span><h3 class="card__title">${escapeHTML(proposal.title)}</h3><div class="card__meta">${icon("pin")} ${escapeHTML(proposal.place)}</div><p class="card__text">${escapeHTML(proposal.text)}</p><div class="support-row"><button class="btn btn--soft btn--sm" data-action="support" data-id="${escapeHTML(proposal.id)}" ${state.supported.includes(proposal.id) ? "disabled" : ""}>${state.supported.includes(proposal.id) ? "Поддержано" : "Поддержать"}</button><span class="support-count"><b>${proposal.support + (state.supported.includes(proposal.id) ? 1 : 0)}</b> голосов</span></div></div></article>`).join("") : `<div class="empty">Пока нет предложений в этой категории.</div>`;
    }

    function renderAll() {
        const allCards = [...places, ...projects, ...events, ...clubs, ...services];
        $("#nearbyRow").innerHTML = `<div class="stack">${places.slice(0, 4).map((place) => `<button class="mini" data-action="select-map-item" data-id="${place.id}"><span class="mini__ico">${icon(place.icon)}</span><span class="mini__text"><b>${escapeHTML(place.title)}</b><small>${escapeHTML(place.kind)}</small></span><span class="mini__dist">${escapeHTML(place.distance)}</span></button>`).join("")}</div>`;
        $("#homeBuildRow").innerHTML = projects.slice(0, 3).map((project) => card(project)).join("");
        $("#homeAfishaRow").innerHTML = events.slice(0, 3).map((event) => card(event)).join("");
        renderPoll($("#homeVote"));

        $("#buildFilters").innerHTML = filterButtons([{ id: "all", label: "Все проекты" }, { id: "work", label: "В работе" }, { id: "build", label: "Скоро" }], filters.build, "build", "Стройки");
        renderProjects();
        $("#futureTimeline").innerHTML = ["all", "2026", "2027", "2028"].map((year, index) => `${index ? '<span class="timeline__connector"></span>' : ""}<button class="timeline__year ${filters.futureYear === year ? "is-active" : ""}" data-filter="futureYear" data-value="${year}">${year === "all" ? "Все годы" : year}</button>`).join("");
        $("#futureFilters").innerHTML = filterButtons([{ id: "all", label: "Все статусы" }, { id: "idea", label: "В планах" }, { id: "work", label: "Проектирование" }], filters.futureStatus, "futureStatus", "Статусы");
        renderFuture();

        $("#proposalFilters").innerHTML = filterButtons([{ id: "all", label: "Все предложения" }, { id: "Собираем голоса", label: "Собираем голоса" }, { id: "На рассмотрении", label: "На рассмотрении" }], filters.proposal, "proposal", "Предложения");
        renderProposals();
        renderPoll($("#voteBlock"));

        $("#eventTimeFilters").innerHTML = filterButtons([{ id: "all", label: "Все даты" }, { id: "soon", label: "На этой неделе" }], filters.eventTime, "eventTime", "Даты");
        $("#eventCatFilters").innerHTML = filterButtons([{ id: "all", label: "Все категории" }, ...["Музыка", "Город", "Спорт", "Культура"].map((category) => ({ id: category, label: category }))], filters.eventCategory, "eventCategory", "Категории");
        renderEvents();
        $("#eventsReset").addEventListener("click", () => {
            filters.eventTime = "all";
            filters.eventCategory = "all";
            renderAll();
        });

        $("#clubFilters").innerHTML = filterButtons([{ id: "all", label: "Все занятия" }, ...["Спорт", "Наука", "Творчество", "Танцы"].map((category) => ({ id: category, label: category }))], filters.club, "club", "Кружки");
        renderClubs();
        $("#servicesGrid").innerHTML = services.map((service) => `<button class="service" data-action="service" data-id="${service.id}"><span class="service__ico art--${service.color}">${icon(service.icon)}</span><span class="service__title">${escapeHTML(service.title)}</span><span class="service__text">${escapeHTML(service.kind)}</span>${icon("chevron", "service__arrow")}</button>`).join("");

        $("#districtChips").innerHTML = districts.map((district) => `<button class="chip ${state.district === district ? "is-active" : ""}" data-action="district" data-id="${escapeHTML(district)}" aria-pressed="${state.district === district}">${escapeHTML(district)}</button>`).join("");
        $("#avatarBtn").textContent = resident.initials;
        $("#avatarBtn").setAttribute("aria-label", `Профиль: ${resident.name}`);
        $("#profileName").textContent = resident.name;
        $("#districtLabel").textContent = state.district;
        $("#profileDistrict").textContent = state.district;
        $("#profileNearby").innerHTML = `<div class="profile__district-summary">${icon("pin")}<span>Ваш район — <b>${escapeHTML(state.district)}</b></span></div><p class="card__text">События, места и городские проекты Белгорода с указанием района на карте.</p><button class="btn btn--ghost btn--sm" data-nav="map">Смотреть на карте</button>`;
        $("#profileSaved").innerHTML = state.saved.length ? state.saved.map((id) => {
            const item = allCards.find((entry) => entry.id === id) || mapItems.find((entry) => entry.id === id);
            return item ? `<button class="profile-row" data-action="details" data-id="${escapeHTML(item.id)}">${icon(item.icon || "star")}<span><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.kind || "")}</small></span>${icon("chevron")}</button>` : "";
        }).join("") : `<p class="muted">Сохраняйте интересные места и события — они появятся здесь.</p>`;
        $("#profileProposals").innerHTML = state.proposals.length ? state.proposals.map((item) => `<div class="profile-row">${icon("idea")}<span><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.status)}</small></span></div>`).join("") : `<p class="muted">Ваши предложения появятся здесь.</p>`;
        $("#profileVotes").innerHTML = Object.keys(state.votes).length ? `<div class="profile-row">${icon("vote")}<span><b>Каким сделать наш двор?</b><small>${escapeHTML(["Больше зелени и тенистых мест", "Удобные тротуары и велодорожки", "Площадки для отдыха и спорта"][Number(state.votes.neighborhood)])}</small></span></div>` : `<p class="muted">Вы ещё не участвовали в голосованиях.</p>`;
        $("#profileEvents").innerHTML = state.joinedEvents.length ? state.joinedEvents.map((id) => events.find((event) => event.id === id)).filter(Boolean).map((event) => `<div class="profile-row">${icon("calendar")}<span><b>${escapeHTML(event.title)}</b><small>${event.day} ${event.month} · ${event.time}</small></span></div>`).join("") : `<p class="muted">Запишитесь на интересное событие, и оно появится здесь.</p>`;
        renderNotifications();
        renderMap("mapHostHome");
        liveMaps.forEach(refreshMapMarkers);
    }

    function renderProjects() {
        const visible = projects.filter((item) => item.category === "build" && (filters.build === "all" || item.statusClass === filters.build));
        $("#buildGrid").innerHTML = visible.map((item) => card(item)).join("") || `<div class="empty">В этом разделе пока нет проектов.</div>`;
    }

    function renderFuture() {
        let visible = projects.filter((item) => item.category === "future");
        if (filters.futureYear !== "all") visible = visible.filter((item) => item.year === filters.futureYear);
        if (filters.futureStatus !== "all") visible = visible.filter((item) => item.statusClass === filters.futureStatus);
        $("#futureGrid").innerHTML = visible.length ? visible.map((item) => card(item)).join("") : `<div class="empty">Пока нет проектов на выбранный год.</div>`;
    }

    function renderEvents() {
        const visible = events.filter((event) => (filters.eventCategory === "all" || event.category === filters.eventCategory) && (filters.eventTime === "all" || ["12", "14", "15"].includes(event.day)));
        $("#eventsGrid").innerHTML = visible.map((item) => card(item)).join("");
        $("#eventsEmpty").hidden = visible.length > 0;
    }

    function renderClubs() {
        const visible = filters.club === "all" ? clubs : clubs.filter((club) => club.category === filters.club);
        $("#clubsGrid").innerHTML = visible.map((item) => card(item, { actionLabel: "Узнать больше" })).join("");
    }

    function renderNotifications() {
        const notices = [
            { title: "Обновление набережной Везёлки", text: "Проект готов уже на 68% — следите за изменениями.", icon: "crane", date: "Сегодня" },
            { title: "Афиша на выходные", text: "В парке Победы будет джазовый вечер.", icon: "calendar", date: "Вчера" },
            { title: "Ваш голос важен", text: "Соседи выбирают, каким сделать наш двор.", icon: "idea", date: "2 дня назад" }
        ];
        $("#notifList").innerHTML = notices.map((notice) => `<div class="notif ${state.readNotifications ? "" : "is-unread"}">${icon(notice.icon)}<span><b>${notice.title}</b><small>${notice.text}</small><small>${notice.date}</small></span></div>`).join("");
        const badge = $("#bellBadge");
        badge.hidden = state.readNotifications;
        badge.textContent = state.readNotifications ? "" : "3";
        $("#profileNotifications").innerHTML = state.readNotifications ? `<p class="muted">Вы прочитали все уведомления.</p>` : `<p class="muted">У вас 3 новых уведомления.</p><button class="btn btn--ghost btn--sm" data-action="notifications">Открыть уведомления</button>`;
    }

    function allSearchItems() {
        return [...places, ...projects, ...events, ...clubs, ...services, ...state.proposals];
    }

    function updateSearch(query) {
        const results = $("#searchResults");
        const normalized = query.trim().toLocaleLowerCase("ru");
        if (!normalized) {
            results.hidden = true;
            $("#searchInput").setAttribute("aria-expanded", "false");
            return;
        }
        const matches = allSearchItems().filter((item) => `${item.title} ${item.kind || ""} ${item.place || ""}`.toLocaleLowerCase("ru").includes(normalized)).slice(0, 7);
        results.innerHTML = matches.length ? matches.map((item) => `<button class="search__item" role="option" data-action="search-result" data-id="${escapeHTML(item.id)}">${icon(item.icon || "pin")}<span><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.kind || item.place || "")}</small></span></button>`).join("") : `<p class="search__empty">Ничего не найдено. Попробуйте другое слово.</p>`;
        results.hidden = false;
        $("#searchInput").setAttribute("aria-expanded", "true");
    }

    function itemById(id) {
        return allSearchItems().find((item) => item.id === id) || allMapItems().find((item) => item.id === id);
    }

    function openModal(content, onSubmit) {
        const root = $("#modalRoot");
        const modal = $("#modal");
        activeModal = document.activeElement;
        modal.innerHTML = content;
        root.hidden = false;
        document.body.classList.add("modal-open");
        const close = $(".modal__close", modal);
        if (close) close.focus();
        const form = $("form", modal);
        if (form && onSubmit) form.addEventListener("submit", (event) => {
            event.preventDefault();
            onSubmit(new FormData(form), form);
        });
    }

    function closeModal() {
        if ($("#modalRoot").hidden) return;
        const proposalMap = liveMaps.get("proposal");
        if (proposalMap) {
            proposalMap.map.remove();
            liveMaps.delete("proposal");
        }
        $("#modalRoot").hidden = true;
        $("#modal").innerHTML = "";
        document.body.classList.remove("modal-open");
        if (activeModal instanceof HTMLElement) activeModal.focus();
        activeModal = null;
    }

    function detailModal(item) {
        if (!item) return;
        openModal(`<header class="modal__head"><div><span class="badge badge--accent">${escapeHTML(item.kind || "Город рядом")}</span><h2>${escapeHTML(item.title)}</h2><p>${escapeHTML(item.place || item.distance || "")}</p></div><button class="icon-btn modal__close" data-action="close-modal" aria-label="Закрыть">${icon("close")}</button></header><div class="modal__body">${artwork(item, "modal-detail__media")}<div class="modal-detail__meta">${item.status ? `<span class="badge badge--${escapeHTML(item.statusClass)}">${escapeHTML(item.status)}</span>` : ""}${item.day ? `<span class="badge">${escapeHTML(item.day)} ${escapeHTML(item.month)} · ${escapeHTML(item.time)}</span>` : ""}</div><p>${escapeHTML(item.text || "")}</p>${typeof item.progress === "number" ? `<div class="hero__progress"><div class="progress"><div class="progress__track"><div class="progress__bar" style="width:${item.progress}%"></div></div><div class="progress__labels"><span>Ход работ</span><b>${item.progress}%</b></div></div></div>` : ""}</div><footer class="modal__foot"><button class="btn btn--ghost modal__close" data-action="close-modal">Закрыть</button><button class="btn btn--accent" data-action="${item.day ? "join" : "save"}" data-id="${escapeHTML(item.id)}">${item.day ? (state.joinedEvents.includes(item.id) ? "Вы записаны" : "Буду") : (state.saved.includes(item.id) ? "Сохранено" : "Сохранить")}</button></footer>`);
    }

    function proposalModal() {
        const cats = ["Благоустройство", "Дороги", "Здоровье", "Спорт", "Другое"];
        openModal(`<header class="modal__head"><div><h2>Идея для района</h2><p>Хорошие перемены начинаются с соседей.</p></div><button class="icon-btn modal__close" data-action="close-modal" aria-label="Закрыть">${icon("close")}</button></header>
            <form><div class="modal__body">
                <div class="field"><label for="proposalTitle">Коротко опишите идею</label><input id="proposalTitle" name="title" type="text" maxlength="80" placeholder="Например, добавить освещение в сквере" required></div>
                <div class="field"><label for="proposalCategory">Тема</label><select id="proposalCategory" name="category">${cats.map((category) => `<option>${category}</option>`).join("")}</select></div>
                <div class="field"><label for="proposalText">Почему это важно?</label><textarea id="proposalText" name="text" maxlength="500" placeholder="Расскажите, как это поможет вам и соседям" required></textarea></div>
                <div class="field"><label for="proposalDistrict">Район</label><select id="proposalDistrict" name="district">${districts.map((district) => `<option ${district === state.district ? "selected" : ""}>${district}</option>`).join("")}</select></div>
                <p class="form-note">${icon("pin")} Укажите место на карте Белгорода (необязательно)</p>
                <div class="pick-map"><div class="pick-map__canvas" id="proposalMapCanvas" role="application" aria-label="Карта Белгорода. Нажмите, чтобы отметить место"></div><p class="pick-map__hint">Нажмите на карту, чтобы поставить метку</p><div class="map__status" role="status" aria-live="polite" hidden></div><input type="hidden" name="location"></div>
            </div><footer class="modal__foot"><button type="button" class="btn btn--ghost modal__close" data-action="close-modal">Отмена</button><button class="btn btn--accent" type="submit">Отправить идею ${icon("chevron")}</button></footer></form>`, (data) => {
            const title = String(data.get("title") || "").trim();
            const text = String(data.get("text") || "").trim();
            if (!title || !text) return;
            const locationValue = String(data.get("location") || "");
            const proposal = {
                id: `user-${Date.now()}`, title, kind: String(data.get("category")), icon: "idea",
                category: "proposal", color: "gold", place: String(data.get("district")),
                text, location: locationValue ? JSON.parse(locationValue) : null,
                support: 0, status: "Собираем голоса", statusClass: "idea"
            };
            state.proposals.unshift(proposal);
            persist();
            renderAll();
            closeModal();
            showToast("Идея опубликована — спасибо, что меняете город!");
        });
        if (window.L) {
            createMap($(".pick-map", $("#modal")), $("#proposalMapCanvas"), "proposal", { zoom: 14 });
        } else {
            showMapStatus($(".pick-map", $("#modal")), "Не удалось загрузить карту. Проверьте подключение к интернету.");
        }
    }

    function serviceModal(item) {
        const emergency = item.id === "emergency";
        openModal(`<header class="modal__head"><div><span class="badge badge--accent">${escapeHTML(item.kind)}</span><h2>${escapeHTML(item.title)}</h2></div><button class="icon-btn modal__close" data-action="close-modal" aria-label="Закрыть">${icon("close")}</button></header><div class="modal__body"><div class="service-detail">${icon(item.icon, "service__ico art--" + item.color)}<p>${escapeHTML(item.text)}</p>${emergency ? `<a class="btn btn--accent" href="tel:112">${icon("message")} Позвонить 112</a>` : `<ul class="detail-list"><li>${icon("check")} Информация доступна в любое время</li><li>${icon("check")} Актуальные городские контакты</li><li>${icon("check")} Поддержка жителей Белгорода</li></ul>`}</div></div><footer class="modal__foot"><button class="btn btn--ghost modal__close" data-action="close-modal">Понятно</button></footer>`);
    }

    function changeSection(section) {
        if (!$(`#section-${section}`)) return;
        currentSection = section;
        $$(".section").forEach((node) => node.classList.toggle("is-active", node.dataset.section === section));
        $$("[data-nav]").forEach((node) => {
            const active = node.dataset.nav === section;
            node.classList.toggle("is-active", active);
            if (node.matches("button.nav__item, button.bottom-nav__item")) node.setAttribute("aria-current", active ? "page" : "false");
        });
        $("#sidebar").classList.remove("is-open");
        $("#sidebarBackdrop").hidden = true;
        if (section === "map") {
            renderMap("mapHostPage");
            requestAnimationFrame(() => liveMaps.get("mapHostPage")?.map.invalidateSize({ pan: false }));
        }
        if (section === "profile") renderAll();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function saveItem(id) {
        state.saved = state.saved.includes(id) ? state.saved.filter((savedId) => savedId !== id) : [id, ...state.saved];
        persist();
        renderAll();
        if (mapSelection) setMapSelection(mapSelection);
        const modalButton = $(`#modal [data-action="save"][data-id="${CSS.escape(id)}"]`);
        if (modalButton) modalButton.textContent = state.saved.includes(id) ? "Сохранено" : "Сохранить";
        showToast(state.saved.includes(id) ? "Добавлено в сохранённое" : "Удалено из сохранённого");
    }

    document.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;
        const nav = target.closest("[data-nav]");
        if (nav) {
            event.preventDefault();
            changeSection(nav.dataset.nav);
            return;
        }
        const filter = target.closest("[data-filter]");
        if (filter) {
            const { filter: filterName, value } = filter.dataset;
            if (filterName === "map") {
                mapCategory = value;
                liveMaps.forEach((record) => {
                    if (!record.showPlaces) return;
                    const host = record.host;
                    $$(".map__filters .chip", host).forEach((chip) => {
                        const active = chip.dataset.value === value;
                        chip.classList.toggle("is-active", active);
                        chip.setAttribute("aria-selected", String(active));
                    });
                    refreshMapMarkers(record);
                });
                if (mapSelection && value !== "all" && !allMapItems().some((item) => item.id === mapSelection && item.category === value)) setMapSelection(null);
                renderMapList();
                return;
            }
            if (filterName === "build") filters.build = value;
            if (filterName === "futureYear") filters.futureYear = value;
            if (filterName === "futureStatus") filters.futureStatus = value;
            if (filterName === "proposal") filters.proposal = value;
            if (filterName === "eventTime") filters.eventTime = value;
            if (filterName === "eventCategory") filters.eventCategory = value;
            if (filterName === "club") filters.club = value;
            renderAll();
            return;
        }
        const actionElement = target.closest("[data-action]");
        if (!actionElement) return;
        const id = actionElement.dataset.id;
        switch (actionElement.dataset.action) {
            case "save": saveItem(id); break;
            case "details": detailModal(itemById(id)); break;
            case "join": {
                const wasJoined = state.joinedEvents.includes(id);
                state.joinedEvents = wasJoined ? state.joinedEvents.filter((eventId) => eventId !== id) : [id, ...state.joinedEvents];
                persist();
                renderAll();
                showToast(wasJoined ? "Вы отменили запись" : "Вы записаны на событие!");
                break;
            }
            case "support": {
                if (!state.supported.includes(id)) {
                    state.supported.push(id);
                    persist();
                    renderProposals();
                    showToast("Спасибо, голос учтён!");
                }
                break;
            }
            case "vote": {
                if (!state.votes.neighborhood) {
                    state.votes.neighborhood = actionElement.dataset.value;
                    persist();
                    renderPoll($("#homeVote"));
                    renderPoll($("#voteBlock"));
                    renderAll();
                    showToast("Ваш голос учтён");
                } else showToast("Вы уже проголосовали — спасибо!");
                break;
            }
            case "district":
                state.district = id;
                state.profileInitialized = true;
                persist();
                renderAll();
                showToast(`Район изменён: ${id}`);
                break;
            case "service": serviceModal(itemById(id)); break;
            case "search-result": {
                const item = itemById(id);
                $("#searchResults").hidden = true;
                $("#searchInput").value = "";
                if (item && events.some((event) => event.id === id)) changeSection("afisha");
                else if (item && clubs.some((club) => club.id === id)) changeSection("clubs");
                else if (item && services.some((service) => service.id === id)) changeSection("services");
                else if (item && projects.some((project) => project.id === id)) changeSection(project.category === "future" ? "future" : "build");
                else if (item && allMapItems().some((entry) => entry.id === id)) {
                    changeSection("map");
                    setMapSelection(id);
                }
                if (item) detailModal(item);
                break;
            }
            case "select-map-item":
                if (currentSection !== "map") changeSection("map");
                setMapSelection(id);
                break;
            case "zoom-in": {
                const record = [...liveMaps.values()].find((entry) => entry.host.contains(actionElement));
                record?.map.zoomIn();
                break;
            }
            case "zoom-out": {
                const record = [...liveMaps.values()].find((entry) => entry.host.contains(actionElement));
                record?.map.zoomOut();
                break;
            }
            case "locate": {
                const record = [...liveMaps.values()].find((entry) => entry.host.contains(actionElement));
                if (record) locateOnMap(record);
                break;
            }
            case "close-map-card": setMapSelection(null); break;
            case "notifications":
                $("#notifPanel").hidden = !$("#notifPanel").hidden;
                break;
            case "close-modal": closeModal(); break;
        }
    });

    document.addEventListener("submit", (event) => {
        if (event.target instanceof HTMLFormElement && event.target.closest("#modal")) event.preventDefault();
    });

    $("#searchInput").addEventListener("input", (event) => updateSearch(event.target.value));
    $("#searchInput").addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            $("#searchResults").hidden = true;
            event.currentTarget.setAttribute("aria-expanded", "false");
        }
        if (event.key === "Enter") {
            const first = $(".search__item");
            if (first) first.click();
        }
    });
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".search")) {
            $("#searchResults").hidden = true;
            $("#searchInput").setAttribute("aria-expanded", "false");
        }
        if (!event.target.closest("#notifPanel, #bellBtn")) $("#notifPanel").hidden = true;
    });

    $("#newProposalBtn").addEventListener("click", proposalModal);
    $("#fabProposal").addEventListener("click", proposalModal);
    $("#avatarBtn").addEventListener("click", () => changeSection("profile"));
    $("#districtBtn").addEventListener("click", () => changeSection("profile"));
    $("#bellBtn").addEventListener("click", () => {
        $("#notifPanel").hidden = !$("#notifPanel").hidden;
    });
    $("#notifReadAll").addEventListener("click", () => {
        state.readNotifications = true;
        persist();
        renderNotifications();
        showToast("Все уведомления прочитаны");
    });
    $("#menuBtn").addEventListener("click", () => {
        $("#sidebar").classList.add("is-open");
        $("#sidebarBackdrop").hidden = false;
        $("#sidebarClose").focus();
    });
    $("#sidebarClose").addEventListener("click", () => {
        $("#sidebar").classList.remove("is-open");
        $("#sidebarBackdrop").hidden = true;
        $("#menuBtn").focus();
    });
    $("#sidebarBackdrop").addEventListener("click", () => {
        $("#sidebar").classList.remove("is-open");
        $("#sidebarBackdrop").hidden = true;
    });
    $("#modalBackdrop").addEventListener("click", closeModal);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
            $("#notifPanel").hidden = true;
            $("#sidebar").classList.remove("is-open");
            $("#sidebarBackdrop").hidden = true;
        }
    });

    readState();
    renderAll();
})();
