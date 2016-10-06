/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test RSS feeds definitions
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have non-empty URLs defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("titles are present", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    // Test menu functionality
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            // .menu-hidden class of <body> should be present
            expect(document.body.classList).toContain('menu-hidden');
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when its icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            // click first time toggleClass
            menuIcon.click();
            expect(document.body.classList).not.toContain('menu-hidden');
            // click second time toggleClass
            menuIcon.click();
            expect(document.body.classList).toContain('menu-hidden');

        });
    });

    // Test initial entries
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            // pass done() as a callback function to loadFeed(id, cb);
            loadFeed(0, done);
        });
        it('at least one feed entry displayed', function() {
            expect($('.feed .entry')).toBeDefined();
        });
    });

    // Test new feed is loaded
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var feed1, feed2;
        beforeEach(function(done) {
            // wait until both feeds finish loading
            loadFeed(0, function() {
                feed1 = $('.feed').html();
                loadFeed(1, function() {
                    feed2 = $('.feed').html();
                    done();
                });
            });
        });
        it('feed content changes', function() {
            expect(feed1).not.toEqual(feed2);
        });
    });
}());
