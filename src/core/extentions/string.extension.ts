
declare global {

    
    interface String {
        saveToClipboard(): void;
        capitalize(): string;
        normalizeToneMark(): string;
        looseIncludes(keyword): boolean;
        b64DecodeUnicode(): string;
        b64EncodeUnicode(): string;
        addQueryParam(params: {[key: string]: string | number}): string;
    }
}
// /**
//  * Save current value to clipboard
//  */
Object.defineProperty(String.prototype, 'saveToClipboard', {
    value: function saveToClipboard(): void {
        const el = document.createElement('textarea');
        el.value = this as any;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    },
    writable: true,
    configurable: true
});
// /**
//  * Capital letter
//  */
Object.defineProperty(String.prototype, 'addQueryParam', {
    value: function addQueryParam(params): string {
        const url = new URL(this);
        for (const [key, value] of Object.entries(params)) {
            if (value === undefined) {
                continue;
            }
            url.searchParams.set(key, value as string);
        }
        return url.toString();
    },
    writable: true,
    configurable: true
});
// /**
//  * Capital letter
//  */
Object.defineProperty(String.prototype, 'capitalize', {
    value: function capitalize(): string {
        return this.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    writable: true,
    configurable: true
});
// /**
//  * Decode Base-64 unicode characters that encoded by b64EncodeUnicode
//  */
Object.defineProperty(String.prototype, 'b64DecodeUnicode', {
    value: function b64DecodeUnicode(): string {
        return decodeURIComponent(atob(this).split('').map((c) =>
        {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },
    writable: false,
    configurable: false
});
// /**
//  * Encode unicode string to base-64
//  */
Object.defineProperty(String.prototype, 'b64EncodeUnicode', {
    value: function b64EncodeUnicode(): string {
        return btoa(encodeURIComponent(this).replace(/%([0-9A-F]{2})/g,
            (match, p1) =>
            {
                return String.fromCharCode('0x' + p1 as any);
            }));
    },
    writable: false,
    configurable: false
});
// /**
//  * Normalize tone mark
//  */
Object.defineProperty(String.prototype, 'normalizeToneMark', {
    value: function normalizeToneMark(): string {
        return this.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    },
    writable: true,
    configurable: true
});
// /**
//  * looseIncludes
//  */
Object.defineProperty(String.prototype, 'looseIncludes', {
    value: function looseIncludes(keyword): boolean {
        return this.trim().toLowerCase().normalizeToneMark().indexOf(keyword) !== -1;
    },
    writable: true,
    configurable: true
});
export {};