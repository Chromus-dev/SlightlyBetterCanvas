chrome.runtime.onInstalled.addListener((details) => {
	const settingDefaults = {
		'insta-modules': true,
		'no-dashboard-card-buttons': true,
	};

	// if (details.reason == 'install') {
	chrome.storage.local.set({ 'sbc-settings': settingDefaults });
	// }
});
