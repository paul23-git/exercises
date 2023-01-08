const format_unicorn = require('format-unicorn/safe');
export function strf(s: string, ...args: string[]|{[key: string]: string}[]): string {
    return format_unicorn(s,  ...args)
}
