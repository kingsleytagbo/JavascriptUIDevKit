/* Manages LocalStorage data operations */
const LocalStorageModule = new function () {

    /* saves one item or a list of items */
    this.save = function (key, data) {
        const items = this.merge(key, data);
        // localStorage.setItem(key, JSON.stringify([]));
        localStorage.setItem(key, JSON.stringify(items));
    };

    /* retrieves one item that matches a key */
    this.fetch = function (key) {
        let data = localStorage.getItem(key);
        if (data) {
            return this.sort(JSON.parse(data));
        }
        else {
            thus.removeAll(key);
            return [];
        }
    };

    this.sort = function (data) {
        let sortSorted = data.sort(function (first, second) {
            if (first.sort === second.sort) {
                return (second.lastName > first.lastName ? 1 : -1);
            }
            return (second.sort - first.sort);
        });
        return sortSorted;
    }

    /* syncs both additions or modifications of data */
    this.merge = function (key, data) {
        const items = localStorage.getItem(key);
        let dataItems = [];
        if (items && data) {
            dataItems = JSON.parse(items);
            let found = false;
            /*
            let item = data;
            if ((!item.id) || (item.id.trim().length === 0) || (item.id.trim() === '')) {
                item.id = this.getGuid();
            }
            */

            if (dataItems.length > 0) {
                for (let d = 0; d < data.length; d++) {
                    const findUserIndex = dataItems.findIndex(dataItem => dataItem.id.toString() === data[d].id.toString());
                    if (findUserIndex === -1) {
                        found = true;
                        dataItems.push(data);
                    }
                    else{
                        dataItems[findUserIndex] = data[d];
                    }
                };
            }
            else{
                dataItems = (data && data.length > 0) ? data : dataItems;
            }
            // console.log({dataItems: dataItems, data: data})
        }
        return dataItems;
    }

    /* gets an empty model representing the data expected for this key */
    this.getModel = function () {
        let model = {
            Id: '',
            firstName: '',
            lastName: '',
            sort: 0
        }
        return model;
    }

    /* selects one item that matches the item's key */
    this.selectOne = function (itemKey, itemsKey) {
        const items = localStorage.getItem(itemsKey);
        let match = null;
        // console.log({match: match, itemKey: itemKey, dataItems: items})
        if (items) {
           const dataItems = JSON.parse(items);
            let i = dataItems.length
            while (i--) {
                if (itemKey === dataItems[i].id.toString()) {
                    match = dataItems[i];
                    break;
                }
            }
        }
        return match;
    }

    /* removes one item that matches the key */
    this.removeOne = function (key, data) {
        let items = localStorage.getItem(key);
        let match = false;
        if (items && data) {
            let dataItems = JSON.parse(items);
            let i = dataItems.length
            while (i--) {
                if (data.id === dataItems[i].id) {

                    dataItems.splice(i, 1);

                    localStorage.setItem(key, JSON.stringify(dataItems));
                    match = true;
                    break;
                }
            }
        }
        return match;
    }

    /* removes all items for a key and resets to an empty array */
    this.removeAll = function (key) {
        localStorage.setItem(key, JSON.stringify([]));
    }

    /* generates a unique identifier similar to a Guid */
    this.getGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /* saves login credential */
    this.saveLogin = function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };

    this.getLogin = function (key) {
        let data = localStorage.getItem(key);
        // console.log({key: key, model: data});
        if (data) {
            return JSON.parse(data);
        }
        else return {};
    };

    this.logout = function (key) {
        localStorage.setItem(key, null);
    };

};

