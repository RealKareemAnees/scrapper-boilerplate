// type ProgressSessionSchemaInterface = {
//     startTime: string;
//     lastEdited: string;
//     sessionURLS: string[];
//     currentURLIndex: number;
// };

import { ProgressSessionSchemaInterface } from '@/interfaces/ProgressSessionSchema.interface';
import { Progress } from './Progress';

describe('Progress', () => {
    let progress: Progress;
    beforeEach(() => {
        progress = new Progress();
    });

    it('should create a new progress session', async () => {
        const session: ProgressSessionSchemaInterface = {
            startTime: '2021-01-01',
            lastEdited: '2021-01-01',
            sessionURLS: ['url1', 'url2'],
            currentURLIndex: 0,
        };
        await progress.createNewProgressSession(session);
        expect(progress.getCurrentProgress).toEqual(session);
    });

    it('should update a progress session', async () => {
        const session: ProgressSessionSchemaInterface = {
            startTime: '2021-01-01',
            lastEdited: '2021-01-01',
            sessionURLS: ['url1', 'url2'],
            currentURLIndex: 0,
        };
        await progress.createNewProgressSession(session);
        session.currentURLIndex = 1;
        await progress.updateProgressSession(session);
        expect(progress.getCurrentProgress).toEqual(session);
    });

    it('should increment a progress session', async () => {
        const session: ProgressSessionSchemaInterface = {
            startTime: '2021-01-01',
            lastEdited: '2021-01-01',
            sessionURLS: ['url1', 'url2'],
            currentURLIndex: 0,
        };
        await progress.createNewProgressSession(session);
        await progress.incrementProgressSession();
        expect(progress.getCurrentProgress.currentURLIndex).toEqual(1);
    });

    it('should pull the latest progress session', async () => {
        const session: ProgressSessionSchemaInterface = {
            startTime: '2021-01-01',
            lastEdited: '2021-01-01',
            sessionURLS: ['url1', 'url2'],
            currentURLIndex: 9,
        };
        await progress.createNewProgressSession(session);
        await progress.pullLatestProgressSession();
        expect(progress.getCurrentProgress.currentURLIndex).toBe(
            session.currentURLIndex,
        );
    });
});
