import data from '../data/sfx-data.json';

export default {
    el: '#app',
    data() {
        return {
            SEavailable: true,
            REavailable: true,
            sender: '',
            recipient: '',
            organisations: '',
            teams: '',
            treeOrgData: [],
        };
    },

    mounted: function(){
        this.loadData();
    },

    computed: {
     

    },

    methods: {
        loadData(){
            this.organisations = data.organisations;
            this.teams = data.teams;

            this.organisations.forEach(org => { 
                this.treeOrgData.push({title: org.name, value: `o_${org.id}`, key: `o_${org.id}`, children: 
                    this.teams
                        .filter(team => team.orgId === org.id && team.id !== undefined)
                        .map(team => ({title: team.name, value: `t_${team.id}`, key: `t_${team.id}`}))
                });
            });
        },
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