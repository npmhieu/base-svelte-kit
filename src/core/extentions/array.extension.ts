declare global
{
    interface Array<T>
    {
        // splitArray(num): any[];
        // splat(): any[];
        // chunk(chunkSize): any[];
        flatten(): any[];
        
        toCollection(key: number | string, key2?: number | string): any;
        
        // mergeUrl(): string;
        toObjectByKey(key): object;
        
        toObject(initValue): object;
        
        toggle(elm, key?, value?): this;
        
        appendAt(index: number, ...items: T[]): T[];
        
        distinctElm(...args): T[];
    
        takeRandom(n: number): T[];
    }
}
//
// Array.prototype.mergeUrl = function(): string {
//   return '/' + this.map(item => item.slug || item).join('/');
// };
//
// Array.prototype.splitArray = function(num): any[] {
//   return this.map((e, i) => {
//     return i % num === 0 ? this.slice(i, i + num) : null;
//   }).filter((e) => e);
// };
//
// Array.prototype.chunk = function(chunkSize): any[] {
//   const temporal = [];
//   for (let i = 0; i < this.length; i += chunkSize) {
//     temporal.push(this.slice(i, i + chunkSize));
//   }
//   return temporal;
// };
//
// Array.prototype.splat = function(): any[] {
//   return flatten(this);
// };
//
// function flatten(arr) {
//   return arr.reduce((flat, toFlatten) => {
//     return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
//   }, []);
// }

Object.defineProperty(Array.prototype, 'distinctElm', {
    value: function distinctElm(...otherItem): any[]
        {
            return [...new Set([...this, ...otherItem.flatten()])];
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'takeRandom', {
    value: function takeRandom(take): any[]
        {
            const newArray = [...this];
            if (take < 0 || take > this.length) {
                return newArray;
            }
            let m = this.length;
            while (m) {
                const i = Math.floor(Math.random() * m--);
                [newArray[m], newArray[i]] = [newArray[i], newArray[m]];
            }
            return newArray.slice(0, take);
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'toCollection', {
    value: function toCollection(key: string | number, key2?: string | number): any
        {
            const initialValue = {};
            return this.reduce((obj, item) =>
            {
                return {
                    ...obj,
                    [item[key]]: key2 ? item[key2] : item,
                };
            }, initialValue);
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'flatten', {
    value: function flatten(): any[]
        {
            return [].concat.apply([], this);
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'appendAt', {
    value: function appendAt(index, ...items: any[]): any[]
        {
            this.splice(index, 0, ...items);
            return this;
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'toggle', {
    value: function toggle(entity, key, value): any
        {
            if (typeof entity === 'object' && !Array.isArray(entity)) {
                if (!key) {
                    return this;
                }
                const index = this.findIndex(obj => obj[key] === value);
                if (index === -1) {
                    this.push(entity);
                } else {
                    this.splice(index, 1);
                }
            } else {
                const index = this.indexOf(entity);
                
                if (index === -1) {
                    this.push(entity);
                } else {
                    this.splice(index, 1);
                }
            }
            return this;
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'toObjectByKey', {
    value: function toObjectByKey(key: string): object
        {
            const initialValue = {};
            return this.reduce((obj, item) =>
            {
                return {
                    ...obj,
                    [item[key]]: item,
                };
            }, initialValue);
        },
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'toObject', {
    value: function toObject(initValue: any): object
        {
            const initialValue = {};
            return this.reduce((obj, item) =>
            {
                return {
                    ...obj,
                    [item]: initValue,
                };
            }, initialValue);
        },
    writable: false,
    configurable: false
});

export {};
