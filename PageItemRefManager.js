
export default class PageItemRefManager {

    static add(host, index, ref) {
        if (ref) {
            if (!global.containers) {
                global.containers = {};
            }
            let container = global.containers[host];
            if (!container) {
                container = global.containers[host] = [];
            }
            for (let i = 0; i < container.length; i++) {
                let item = container[i];
                if (item.index == index) {
                    return;
                }
            }
            container.push({
                index, ref
            });
        }
    }

    static get(host, index) {
        if (global.containers && global.containers[host]) {
            let container = global.containers[host];
            for (let i = 0; i < container.length; i++) {
                let item = container[i];
                if (item.index == index) {
                    return item.ref;
                }
            }
            return null;
        } else {
            return null;
        }
    }

    static removeAll() {
        global.containers = {};
    }
}