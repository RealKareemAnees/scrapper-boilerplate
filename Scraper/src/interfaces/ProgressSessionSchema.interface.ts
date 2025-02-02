/**
 * @instance Interface for the progress session object
 * @property {string} startTime - The time when the session was started
 * @property {string} lastEdited - The time when the session was last edited
 * @property {string[]} sessionURLS - The URLs that are part of the session
 * @property {number} currentURLIndex - The index of the current URL in the sessionURLS array
 */
export type ProgressSessionSchemaInterface = {
    startTime: string;
    lastEdited: string;
    sessionURLS: string[];
    currentURLIndex: number;
};
