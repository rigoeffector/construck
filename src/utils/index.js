import {isEmpty, isNil, map} from 'lodash';

/**
 * Call this function to load state from browser local storage
 */
export function loadState(state) {
    try {
        const serializedSate = localStorage.getItem(state);
        if (serializedSate === null) {
            return {};
        }

        return JSON.parse(serializedSate);
    } catch (error) {
        return error;
    }
}

/**
 * Call this function to save state into browser local storage
 * @param {*} state
 */
export function saveState(key, value) {
    try {
        const serializedSate = JSON.stringify(value);
        localStorage.setItem(key, serializedSate);
    } catch (error) {
        return error;
    }
}
/**
 * Call this function to save token into browser local storage
 * @param {*} state
 */

export function saveToken(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        return error;
    }
}

/**
 * Call this function to load state from browser local storage
 */
export function loadFromLocalStorage(key) {
    try {
        const serializedSate = localStorage.getItem(key);
        if (isEmpty(serializedSate)) {
            return undefined;
        }
        return JSON.parse(serializedSate);
    } catch (error) {
        return error;
    }
}

/**
 * Call this function to save state into browser local storage
 * @param {*} state
 */
export function saveIntoLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        return null;
    }
}

export function errorFormater(error) {
    if (isNil(error)) {
        return null;
    }

    if (error instanceof Array) {
        return error;
    }

    if (error instanceof Object)
        return [
            {
                field: error.field,
                message: error.message
            }
        ];

    return null;
}

export function buildSelectOptions(data, key, value) {
    return map(data || [], (d) => ({
        label: key && (d[key] || d.label || d.name),
        value: value && (d[value] || d.id)
    }));
}

export function buildTableColumn(data) {
    return map(data || [], (d) => ({
        dataField: d.key,
        text: d.name
    }));
}

/*

export function cacheDataToLocalStorage(key: string, value: any): void {
  try {
    const result = serializeValue(value);
    localStorage.setItem(key, result);
  } catch (error) {
    throw new Error("Error happened while caching data");
  }
}

export function loadDataFromLocalStorage(key: string) {
  try {
    const serializedSate = localStorage.getItem(key);
    if (!serializedSate) {
      return undefined;
    }
    return deserializeValue(serializedSate);
  } catch (error) {
    throw new Error("Error happened while loading cache data");
  }
}

function serializeValue(value: any) {
  if (typeof value != "string") return JSON.stringify(value);
  return value;
}

function deserializeValue(serializedSate: string | null): object | string {
  try {
    return JSON.parse(serializedSate!); // in case state is an object
  } catch (error) {
    return <string>serializedSate; // state might be a string
  }
}

*/
export function getQueryString(params) {
    if (!params) return '';
    const parts = [];
    for (const key in params) {
        if (key != null && params[key] != null) {
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
    }
    return parts.join('&');
}

export const getInitials = (name = '') =>
    name
        .replace(/\s+/, ' ')
        .split(' ')
        .slice(0, 2)
        .map((v) => v && v[0].toUpperCase())
        .join('');

// Create our number formatter.
export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2 // (causes 2500.99 to be printed as $2,501)
});
