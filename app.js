
new Vue({
    el: "#app",
    data: {
        health_me: 100,
        health_monster: 100,
        log: [],
        started_game: false
    },
    methods: {
        start_game: function() {
            this.started_game = true
        },
        reset_game: function() {
            this.started_game = false;
            this.log = [];
            this.health_me = 100;
            this.health_monster = 100;
        },
        attack: function(range) {
            var injure_me = this.random_injure(range);
            var injure_monster = this.random_injure(range);
            this.health_me = this.health_me - injure_me;
            this.health_monster = this.health_monster - injure_monster;
            this.add_log("Monster hits player for " + injure_me);
            this.add_log("Player hits monster for " + injure_monster);
            this.check();
        },
        check: function() {
            if ((this.health_me <= 0) || (this.health_monster <= 0)) {
                // End
                var advantage = this.health_me - this.health_monster;
                if (advantage < 0) {
                    if (confirm("You has been defeated by the monster. Another game?"))
                        this.reset_game();
                } else {
                    if (confirm("You have defeated the monster! Another game?"))
                        this.reset_game();
                }
            }
        },
        simple_attack: function() {
            this.attack(10)
        },
        special_attack: function() {
            this.attack(20)
        },
        heal: function() {
            var heal_level = 10;
            var injure_me = this.random_injure(10);
            this.health_me = this.health_me + heal_level - injure_me;
            this.add_log("Monster hits player for " + injure_me);
            this.add_log("Player heals himself for " + heal_level);
        },
        random_injure: function(range) {
            return Math.floor(Math.random() * range);
        },
        add_log: function(msg) {
            this.log.unshift(msg);
        }
    }
});
