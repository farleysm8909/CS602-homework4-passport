import User from '../../model/user.model.js';
import assert from 'assert'; // learned about assert and decided to play around with it

describe("User model tests", function() {

    // create a test user for use in tests (note: test user must be made in db beforehand w/ pwd: testpassword)
    const test_user = new User();
    test_user.email = "test@bu.edu";
    test_user.userName = "test";
    test_user.password = "$2b$10$g7cAos/odkuLm02CAFbNb.l0bzQcN46I/4TcsPfG2SeYBegAK6WvC";  

    // Jasmine test #1: comparePassword      (true)
    it("[comparePassword] should return true when pwd in db and user input match", async () => {
        assert.strictEqual(true, await test_user.comparePassword("testpassword"));
    });

    // Jasmine test #2: comparePassword      (false)
    it("[comparePassword] should return false when pwd in db and user input don't match", async () => {
        assert.strictEqual(false, await test_user.comparePassword("wrong-password"));
    });

    // Jasmine test #3: checkExistingField   (true)       used: https://stackoverflow.com/questions/31528200/jasmine-test-for-object-properties
    it("[checkExistingField] should return a document containing the specified field/value when successfully querying User db", async () => {
        expect(await User.checkExistingField('userName', test_user.userName)).toEqual(jasmine.objectContaining({
            userName: test_user.userName
        }));
    });

    // Jasmine test #4: checkExistingField   (false) 
    it("[checkExistingField] should return null when there are no documents containing the specified field/value in User db", async () => {
        const nonexistent_username = "idontexist";
        expect(await User.checkExistingField('userName', nonexistent_username)).toEqual(null);
    });

    // Jasmine test #5: generateVerificationToken
    it("[generateVerificationToken] should return a defined value (string)", async () => {
        expect(await test_user.generateVerificationToken()).toBeDefined();
    });

}); 