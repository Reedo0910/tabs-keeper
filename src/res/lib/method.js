const STORE_KEY = 'SavedGroups'
let StoreType = browser.storage.local
// Tabs

function getAllTabs() {
    return new Promise(function (resolve, reject) {
        browser.tabs.query({
            currentWindow: true
        }).then((tabs) => {
            resolve(tabs)
        })
    })
}


// Groups Info

function saveCurrentId(id) {
    let keeper = new Object();
    keeper['active_id'] = id;
    StoreType.set(keeper).then(() => {
        console.log('ID is update:' + id);
    })
}

function getLastId() {
    return new Promise(function (resolve, reject) {
        StoreType.get('active_id')
            .then((id) => {
                resolve(id);
            }, (error) => {
                console.log('getID reject:' + error);
                reject(error)
            })
            .catch((error) => {
                console.log('getID error:' + error);
            })
    })
}

// Groups

function updateGroup(obj) {
    let keeper = new Object();
    keeper[STORE_KEY] = new Object();
    keeper[STORE_KEY][obj.id] = obj;
    StoreType.set(keeper).then(() => {
        console.log(obj);
        console.log('is Updated')
    });
}

function getAllGroups() {
    return new Promise(function (resolve, reject) {
        StoreType.get(STORE_KEY)
            .then((groups) => {
                let savedGroups = [];
                let orderGroups
                for (let key in groups) {
                    if (groups.hasOwnProperty(key)) {
                        savedGroups.push(groups[key]);
                    }
                }
                orderGroups = quickSort(savedGroups);
                resolve(orderGroups);
            }, (error) => {
                console.log('getAllGroups reject:' + error);
                reject(error)
            })
            .catch((error) => {
                console.log('getAllGroups error:' + error);
            })
    })
}

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