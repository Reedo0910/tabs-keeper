let manager = new Vue({
    el: '#manager-panel',
    data: {
        showId: 0,
        groups: [{
            index: 0,
            id: 0,
            name: 'Now',
            tabs: []
        }]
    },
    created() {
        this.getTabsList();
        browser.tabs.onRemoved.addListener(this.handleRemove);
    },
    ready() {
        this.mountSortable();
    },
    methods: {
        closeTab(id) {
            browser.tabs.remove(id)
                .then()
                .catch((error) => {
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
        mountSortable() {
            let el = document.getElementById('tab-list');
            let sortable = new Sortable(el, {
                sort: true,
                handle: '.sortable-drag',
                ghostClass: 'sortable-ghost',
                animation: 150
            })
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
        handleRemove(tabId) {
            const vm = this;
            for (let i = 0; i < vm.groups[0].tabs.length; i++) {
                if (vm.groups[0].tabs[i].id === tabId) {
                    vm.groups[0].tabs.splice(i, 1);
                }
            }
        },
    }
})