let app = new Vue({
    el: '#popup',
    data: {
        showId: 0,
        activeId: 0,
        groups: [{
            index: 0,
            id: 0,
            name: 'Now',
            tabs: []
        }]
    },
    created() {
        browser.tabs.onUpdated.addListener(this.handleUpdate);
        browser.tabs.onActivated.addListener(this.handleActive)
        browser.tabs.onCreated.addListener(this.handleCreate)
        browser.tabs.onRemoved.addListener(this.handleRemove)
        this.getTabsList();
    },
    beforeDestory() {
        browser.tabs.onUpdated.removeListener(this.handleUpdate);
        browser.tabs.onActivated.removeListener(this.handleActive)
        browser.tabs.onCreated.removeListener(this.handleCreate)
        browser.tabs.onRemoved.removeListener(this.handleRemove)
    },
    methods: {
        openManager() {
            const url = browser.extension.getURL('res/ui/manager.html');
            browser.tabs.create({
                url
            }).then(() => {
                browser.history.deleteUrl({
                    url
                });
            }).catch((e) => {
                throw e
            });
        },
        addGroup() {
            const vm = this;
            if (vm.groups.length >= 2) return;
            let newGroup = new Object();
            newGroup.index = vm.groups.length;
            newGroup.id = 1;
            newGroup.name = 'Pinned 1';
            newGroup.tabs = [];
            vm.groups.push(newGroup)
        },
        newTab() {
            browser.tabs.create({})
                .then()
                .catch((error) => {
                    console.log(error);
                });
        },
        closeTab(id) {
            browser.tabs.remove(id)
                .then()
                .catch((error) => {
                    console.log(error);
                });
        },
        getTabsList() {
            const vm = this;
            vm.groups[0].tabs = [];
            getAllTabs().then((tabs) => {
                vm.groups[0].tabs = tabs;
            }).catch((error) => {
                console.log(error);
            });
        },
        getFavicon(index) {
            const DefaultIcon = '../icons/firefox_copyrighted.png';
            const WhiteList = 'chrome://mozapps/skin/extensions/extensionGeneric-16.svg';
            const vm = this;
            let fav = '';
            if (vm.groups[0].tabs[index].favIconUrl === undefined || vm.groups[0].tabs[index].favIconUrl === WhiteList) {
                fav = DefaultIcon;
            } else {
                fav = vm.groups[0].tabs[index].favIconUrl;
            }
            return {
                'background-image': 'url(' + fav + ')'
            };
        },
        setActive(id) {
            const vm = this;
            browser.tabs.update(
                    id, {
                        active: true
                    }
                )
                .then()
                .catch((error) => {
                    console.log(error);
                });
        },
        handleCreate(tab) {
            const vm = this;
            vm.groups[0].tabs.splice(tab.index, 0, tab);
        },
        handleRemove(tabId) {
            const vm = this;
            for (let i = 0; i < vm.groups[0].tabs.length; i++) {
                if (vm.groups[0].tabs[i].id === tabId) {
                    vm.groups[0].tabs.splice(i, 1);
                }
            }
        },
        handleActive(activeInfo) {
            this.groups[0].tabs.forEach(function (t) {
                t.id === activeInfo.tabId ? t.active = true : t.active = false;
            }, this);
        },
        handleUpdate(tabId, changeInfo, tabInfo) {
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
    }
})