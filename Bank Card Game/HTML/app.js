function shuffleArray(array) {

    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;

}

function validate(num) {
    if (num != null && num != 'undefined'){
        return num;
    }
    else {
        return 0;
    }
}

const app = Vue.createApp({

    data() {

        return {

            originalDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            interpreter: {
                0: "Empty",
                1: "Ace",
                2: "Two",
                3: "Three",
                4: "Four",
                5: "Five",
                6: "Six",
                7: "Seven",
                8: "Eight",
                9: "Nine",
                10: "Ten",
                11: "Jack",
                12: "Queen",
                13: "King",
                14: "Ace",
                15: "Two",
                16: "Three",
                17: "Four",
                18: "Five",
                19: "Six",
                20: "Seven",
                21: "Eight",
                22: "Nine",
                23: "Ten",
                24: "Jack",
                25: "Queen",
                26: "King",
                27: "Ace",
                28: "Two",
                29: "Three",
                30: "Four",
                31: "Five",
                32: "Six",
                33: "Seven",
                34: "Eight",
                35: "Nine",
                36: "Ten",
                37: "Jack",
                38: "Queen",
                39: "King",
                40: "Ace",
                41: "Two",
                42: "Three",
                43: "Four",
                44: "Five",
                45: "Six",
                46: "Seven",
                47: "Eight",
                48: "Nine",
                49: "Ten",
                50: "Jack",
                51: "Queen",
                52: "King",
            },
            randomDeck: [],
            aiDeck: [],
            playerDeck: [],
            currentDeck: [],
            winner: null,
            aiDeckLength: 0,
            playerDeckLength: 0,
            isDisabled: false,
            play_card: "Empty",
            opp_card: "Empty",
            isOver: false,

        }

    },

    methods: {

        startGame() {

            this.originalDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
            this.randomDeck = [];
            this.aiDeck = [];
            this.playerDeck = [];
            this.currentDeck = [];
            this.winner= null;
            this.aiDeckLength = 0;
            this.playerDeckLength = 0;
            this.isDisabled = false;
            this.play_card = "Empty";
            this.opp_card = "Empty";
            this.isOver = true;
            this.shuffle();

        },

        shuffle() {

            this.randomDeck = shuffleArray(this.originalDeck)

            for(i = 0; i < 26; i++) {

                this.aiDeck[i] = this.randomDeck[i];

            }

            j = 0;

            for(i = 26; i < 52; i++) {
                
                this.playerDeck[j] = this.randomDeck[i];
                j++;

            }

            this.aiDeckLength = this.aiDeck.length;
            this.playerDeckLength = this.playerDeck.length;

        },

        player_click() {

            this.currentDeck.unshift(this.playerDeck[0]);
            this.playerDeck.shift();
            this.aiDeckLength = this.aiDeck.length;
            this.playerDeckLength = this.playerDeck.length;
            this.isDisabled = true;
            this.play_card = this.interpreter[validate(this.currentDeck[0])];
            this.opp_card = this.interpreter[validate(this.currentDeck[1])];
            if (this.playerDeckLength <= 0) {
                this.winner = 'ai';
                this.opp_card = "GAME OVER";
                this.play_card = "YOU LOST :(";
                this.isOver = false;
            }
            else {
                if (this.play_card == this.opp_card) {
                    this.playerDeck = this.playerDeck.concat(this.currentDeck)
                    this.currentDeck = []
                    setTimeout(() => {
                        this.aiDeckLength = this.aiDeck.length;
                        this.playerDeckLength = this.playerDeck.length;
                        this.play_card = this.interpreter[validate(this.currentDeck[0])];
                        this.opp_card = this.interpreter[validate(this.currentDeck[1])];
                        this.isDisabled = false;
                    }, 2500);
                }
                else {
                    this.opponent_click();
                }
            }
        },

        opponent_click() {

            setTimeout(() => {

                this.currentDeck.unshift(this.aiDeck[0]);
                this.aiDeck.shift();
                this.aiDeckLength = this.aiDeck.length;
                this.playerDeckLength = this.playerDeck.length;
                this.play_card = this.interpreter[validate(this.currentDeck[1])];
                this.opp_card = this.interpreter[validate(this.currentDeck[0])];
                if (this.aiDeckLength <= 0) {
                    this.winner = 'player';
                    this.opp_card = "GAME OVER";
                    this.play_card = "YOU WON :)";
                    this.isOver = false;
                }
                else {
                    if (this.play_card == this.opp_card) {
                        this.aiDeck = this.aiDeck.concat(this.currentDeck)
                        this.currentDeck = []
                        setTimeout(() => {
                            this.aiDeckLength = this.aiDeck.length;
                            this.playerDeckLength = this.playerDeck.length;
                            this.play_card = this.interpreter[validate(this.currentDeck[1])];
                            this.opp_card = this.interpreter[validate(this.currentDeck[0])];
                            this.opponent_click();
                        }, 2500);
                    }
                    else {
                        this.isDisabled = false;
                    }
                }
            }, 2500);

        }
        
    },

});

app.mount('#game');