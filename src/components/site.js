export default {
    data() {
        return {
            SEavailable: true,
            REavailable: true,
            sender: '',
            recipient: '',
            SeOrgi: ['GOALZO AG'],
            ReOrgi: ['Fake AG', 'Vallah AG', 'Haram AG'],
            SeTeams: ['Team Blue', 'Team Red'],
            ReTeams: ['Team Blue', 'Team Red'],
        };
    },

    methods: {
        Selist(){
            this.SEavailable = false;
            console.log(this.Teams);
        },

        Relist(){
            this.REavailable = false;
            console.log(this.Teams);
        },

        SetSender(Orgi){
            this.sender = Orgi;
            this.SEavailable = true;
        },

        SetRecipient(Orgi){
            this.recipient = Orgi;
            this.REavailable = true;
        },

        DeleteList(){
                setTimeout(() => this.SEavailable = true, 150);
        },

        DeleteList1(){
            setTimeout(() => this.REavailable = true, 150);
        },

    },
}