browser.tabs.onUpdated.addListener(this.handleUpdate)
browser.tabs.onCreated.addListener(this.handleCreate)
browser.tabs.onRemoved.addListener(this.handleRemove)

function handleCreate(tab) {
    const vm = this;
    vm.groups[0].tabs.splice(tab.index, 0, tab);
}

function handleRemove(tabId) {
    const vm = this;
    for (let i = 0; i < vm.groups[0].tabs.length; i++) {
        if (vm.groups[0].tabs[i].id === tabId) {
            vm.groups[0].tabs.splice(i, 1);
        }
    }
}

function handleUpdate(tabId, changeInfo, tabInfo) {
    const vm = this;
    for (let key in changeInfo) {
        if (changeInfo.hasOwnProperty(key)) {
            for (let i = 0; i < vm.groups[0].tabs.length; i++) {
                if (vm.groups[0].tabs[i].id === tabId) {
                    vm.groups[0].tabs[i][key] = changeInfo[key];
                }
            }
        }
    }
}