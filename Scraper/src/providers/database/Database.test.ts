import { Database } from './Database';

describe('Database', () => {
    let database: Database;

    beforeAll(() => {
        database = Database.getInstance();
    });

    it('should return the same instance of Database', () => {
        const database2 = Database.getInstance();
        expect(database).toBe(database2);
    });

    it('should insert a document successfully', async () => {
        let error = null;
        try {
            let id = await database.insertDocument('test', 'test', {
                test: 'test',
            });
            expect(id).not.toBeNull();
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull(); // Ensure no error occurred
    });

    it('should retrieve a document successfully', async () => {
        let error = null;
        try {
            let document = await database.retrieveDocument('test', 'test', {
                test: 'test',
            });
            expect(document).not.toBeNull();
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull(); // Ensure no error
    });
});
