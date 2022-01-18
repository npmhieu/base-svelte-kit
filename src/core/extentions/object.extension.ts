declare global
{
    interface Object
    {
        getOwnKey(): any[];
        findBy(key: string): any;
        isDiff(target: {[props: string]: any}): boolean;
        removeIf(callback: (key, value) => boolean): any;
    }
}

Object.defineProperty(Object.prototype, 'removeIf', {
    value: function removeIf(callback: (key, value) => boolean): any
        {
            const clone = {
                ...this
            };
            Object.keys(clone).forEach(key => {
                if (!clone.hasOwnProperty(key)) {
                    return;
                }
                if (callback(key, clone[key])) {
                    delete clone[key];
                }
            });
            return clone;
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Object.prototype, 'getOwnKey', {
    value: function getOwnKey(): any[]
        {
            return Object.keys(this).filter(key => this.hasOwnProperty(key));
        },
    writable: false,
    configurable: false
});
Object.defineProperty(Object.prototype, 'isDiff', {
    value: function isDiff(target: {[props: string]: any}): boolean
        {
            return JSON.stringify(this) !== JSON.stringify(target);
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Object.prototype, 'findBy', {
    value: function findBy(s): any
        {
            let o = this;
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            const a = s.split('.');
            for (let i = 0, n = a.length; i < n; ++i) {
                const k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
            return o;
        },
    writable: false,
    configurable: false
});

export {};