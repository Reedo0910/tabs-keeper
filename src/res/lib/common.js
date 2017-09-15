const STORE_KEY = 'SavedGroups'
let StoreType = browser.storage.local

// Tabs
function getAllTabs() {
    return new Promise(function (resolve, reject) {
        browser.tabs.query({
            currentWindow: true,
            pinned: false
        }).then((tabs) => {
            resolve(tabs)
        })
    })
}

// Groups
function Group(index, id, name, tabs, pinned) {
    this.index = index;
    this.id = id;
    this.name = name;
    this.tabs = tabs;
    this.pinned = pinned;
}

function getId() {
    getAllGroups().then((groups) => {
        const Length = 9;
        let idGroups = [];
        let IDs = [];
        groups.forEach(function (g) {
            idGroups.push(g.id);
        }, this);
        for (let i = 0; i < Length; i++) {
            if (!isContain(idGroups, i)) {
                IDs.push(i)
            }
        }
        if (IDs.length >= 0) {
            return (IDs[0]);
        } else {
            return (-1);
        }
    })
}


function updateGroup(obj) {
    let keeper = new Object();
    keeper[STORE_KEY] = new Object();

    let store = keeper[STORE_KEY];
    store[obj.id] = obj;
    StoreType.set(keeper).then(() => {
        console.log(obj);
        console.log('is Updated')
    });
}

function getAllGroups() {
    return new Promise(function (resolve, reject) {
        StoreType.get(STORE_KEY).then((groups) => {
            let savedGroups = [];
            for (let key in groups) {
                if (groups.hasOwnProperty(key)) {
                    savedGroups.push(groups[key]);
                }
            }
            resolve(savedGroups);
        }, (error) => {
            console.log('getAllGroups reject:' + error);
            reject(error)
        }).catch((error) => {
            console.log('getAllGroups error:' + error);
        })
    })
}

// Other Methods

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let midIndex = Math.floor(arr.length / 2);
    let midIndexVal = arr.splice(midIndex, 1);
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].index < midIndexVal.index) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(midIndexVal, quickSort(right));
}

function isEmptyObject(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

function isContain(arr, obj) {
    let i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}