chrome.storage.local.get('sbc-settings').then((settings) => {
	settings = settings['sbc-settings'];
	console.log(settings);

	Object.keys(settings).forEach((s) => {
		let toggle = document.getElementById(
			'sbc-' + s + '-toggle'
		).firstElementChild;

		setEventHandler(toggle, 'click', settingsClick);

		if (settings[s]) {
			toggle.checked = true;
		} else {
			toggle.checked = false;
		}
	});
});

function settingsClick() {
	let settingID = this.parentElement.id.substring(
		4,
		this.parentElement.id.length - 7
	);

	// grab the current settings, set the new setting, then update the saved settings
	chrome.storage.local.get('sbc-settings').then((s) => {
		s = s['sbc-settings'];

		s[settingID] = this.checked;

		chrome.storage.local.set({ 'sbc-settings': s });
	});
}

// simplified utility function to register an event handler cross-browser
function setEventHandler(obj, name, fn) {
	if (typeof obj == 'string') {
		obj = document.getElementById(obj);
	}
	if (obj.addEventListener) {
		return obj.addEventListener(name, fn);
	} else if (obj.attachEvent) {
		return obj.attachEvent('on' + name, function () {
			return fn.call(obj);
		});
	}
}
