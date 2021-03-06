var armory = require('../lib/armory');

module.exports = {

    'all US realms': function(test) {
        armory.realmStatus(function(err, res) {
            test.ifError(err);
            test.ok(Array.isArray(res));
            test.ok(res.length > 1);
            test.ok(res[0].slug);

            test.done();
        });
    },

    'all EU realms': function(test) {
        armory.realmStatus('eu', function(err, res) {
            test.ifError(err);
            test.ok(Array.isArray(res));
            test.ok(res.length > 1);
            test.ok(res[0].slug);

            test.done();
        });
    },

    'single US realm': function(test) {
        armory.realmStatus('Shadowmoon', function(err, res) {
            test.ifError(err);
            test.ok(Array.isArray(res));

            res = res[0];
            test.equal(res.name, 'Shadowmoon');
            test.equal(res.slug, 'shadowmoon');

            test.done();
        });
    },

    'single EU realm': function(test) {
        armory.realmStatus('Свежеватель Душ', 'eu', function(err, res) {
            test.ifError(err);
            test.ok(Array.isArray(res));

            res = res[0];
            test.equal(res.name, 'Свежеватель Душ');
            test.equal(res.slug, 'свежеватель-душ');

            test.done();
        });
    },

    'multiple US realms': function(test) {
        armory.realmStatus(['Cho\'gall', 'Shadowmoon'], function(err, res) {
            test.ifError(err);
            test.ok(Array.isArray(res));
            test.equal(res.length, 2);

            test.equal(res[0].name, 'Cho\'gall');
            test.equal(res[0].slug, 'chogall');
            test.equal(res[1].name, 'Shadowmoon');
            test.equal(res[1].slug, 'shadowmoon');

            test.done();
        });
    },

    'multiple EU realms': function(test) {
        armory.realmStatus(
            ['Свежеватель Душ', 'Festung der Stürme'],
            'eu',
            function(err, res) {

                test.ifError(err);
                test.ok(Array.isArray(res));
                test.equal(res.length, 2);

                test.equal(res[0].name, 'Festung der Stürme');
                test.equal(res[0].slug, 'festung-der-sturme');
                test.equal(res[1].name, 'Свежеватель Душ');
                test.equal(res[1].slug, 'свежеватель-душ');

                test.done();
        });
    },

    'non-existent realm': function(test) {
        armory.realmStatus('foo', function(err, res) {
            test.ifError(err);
            test.ok(res.length > 1);

            test.done();
        });
    }
};
