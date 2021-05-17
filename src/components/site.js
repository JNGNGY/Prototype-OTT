import data from '../data/sfx-data.json';
 
export default {
    el: '#app',
    data() {
        return {
            inputSender: undefined,
            inputRecipient: undefined,
            inputPersonal: undefined,
            treeOrgData: [],
            users: [],
            personal: false,
            listdata: [],
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
                this.treeOrgData.push({title:org.name, value: `o_${org.id}`, key: `o_${org.id}`, children: 
                    this.teams
                        .filter(team => team.orgId === org.id && team.id !== undefined)
                        .map(team =>({title: team.name, value: `t_${team.id}`, key: `t_${team.id}`}))
                });
            });

            this.organisations.forEach(org => {
                org.users.forEach(user => {
                    this.users.push({title: user.email, value: user.email, key: user.email})
                });
            });

            console.log(this.users);
            console.log(this.treeOrgData);
        },

        inputperson(){
            if (this.inputRecipient !== undefined){
                this.personal = false;
            } else {
                this.personal = true;
            }
        },

        addOrg() {
            if (this.inputPersonal == undefined) {
                this.listdata.push(...this.users)

            }
            this.inputPersonal = this.inputPersonal.filter((user) => !this.listdata.includes(user));
            this.listdata.push(...this.inputPersonal)
            this.inputPersonal = undefined;
            console.log(this.listdata);
        },

        deleteuser(user) {
            var index = this.listdata.indexOf(user);
            this.listdata.splice(index, 1);
        },
    },
}