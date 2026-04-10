import {v4 as uuidv4} from 'uuid';

/**
 * Randomize a string by appending a UUID.
 * @param {string} value - The value to randomize by appending an UUID.
 * @returns {string} - The string with an UUIDv4 appended.
 */
const randomize = value => `${value}-${uuidv4()}`;

export default randomize;
