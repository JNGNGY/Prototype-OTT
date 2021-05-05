export default {
    data() {
        return {
            SEavailable: true,
            REavailable: true,
            sender: '',
            recipient: '',
            SeTeams: ['Team Blue', 'Team Red'],
            ReTeams: ['Team Blue', 'Team Red'],
        };
    },

    methods: {
        Selist(){
            this.SEavailable = true;
            this.SeTeams = ['Team Blue', 'Team Red'];
            console.log(this.Teams);
        },

        Relist(){
            this.SUavailable = true;
            this.ReTeams = ['Team Blue', 'Team Red'];
            console.log(this.Teams);
        },

    },
}