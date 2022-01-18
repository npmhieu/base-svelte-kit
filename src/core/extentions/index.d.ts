declare global
{
	export interface Array<T>
	{
		// splitArray(num): any[];
		// splat(): any[];
		// chunk(chunkSize): any[];
		flatten(): any[];
		
		toCollection(key: number | string, key2?: number | string): any;
		
		// mergeUrl(): string;
		toObjectByKey(key): object;
		
		toggle(elm, key?, value?): this;
		
		appendAt(index: number, ...items: T[]): T[];
		
		unique(...args): T[];
		
		takeRandom(n: number): T[];
	}
}
declare global {
	
	
	export interface String {
		saveToClipboard(): void;
		capitalize(): string;
		normalizeToneMark(): string;
		looseIncludes(keyword): boolean;
		b64DecodeUnicode(): string;
		b64EncodeUnicode(): string;
		addQueryParam(params: {[key: string]: string | number}): string;
	}
}
