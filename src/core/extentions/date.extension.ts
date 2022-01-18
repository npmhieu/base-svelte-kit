declare global
{
    interface Date
    {
        ddmmyyyy(): string;

        MMYYYY(): string;
    }
}

// /**
//  * format day
//  */
Object.defineProperty(Date.prototype, 'ddmmyyyy', {
    value: function ddmmyyyy(): string
        {
            let dd = this.getDate();
            let mm = this.getMonth() + 1;

            const yyyy = this.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return `${dd}/${mm}/${yyyy}`;
        },
    writable: false,
    configurable: false
});


// /**
//  * MM YYYY
//  */
Object.defineProperty(Date.prototype, 'MMYYYY', {
    value: function MMYYYY(): string
        {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            return `${monthNames[this.getMonth()]} ${this.getFullYear()}`;
        },
    writable: false,
    configurable: false
});
export {};
