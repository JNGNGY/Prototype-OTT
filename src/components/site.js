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
            userlist: [],
            Nodata: false,
            User: [
                { id: 1, name: "User" },
            ],
            TitlePerson: "",
        };
    },

    mounted: function(){
        this.loadData();
    },

    computed: {

    },

    methods: {
        loadData(){

            this.userjson = data.user
            this.organisations = data.organisations;
            this.teams = data.teams;

            this.User.forEach(user => {
                this.treeOrgData.push({title:user.name, value: `u_${user.id}`, key: `u_${user.id}`})});

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
        handleRecipientType(type){
            const selected = type.toString();
            let selectedType = selected.split('_')[0]
            let selectedValue = selected.split('_')[1]
            let selectedObject = '';

            if(type) {
                this.users = [];
                switch(selectedType) {

                    case 'o': {
                        selectedObject = (this.organisations.filter(org => {
                            return org.id === Number(selectedValue)
                        }))
                        this.TitlePerson = "Optional: Specific Person";
                        break;
                    }
                    case 't': {
                        selectedObject = (this.teams.filter(team => {
                            return team.id === Number(selectedValue)
                        }))
                        this.TitlePerson = "Optional: Specific Person";
                        break;
                    }
                    case 'u': {
                        this.organisations.forEach(org => {
                            org.users.forEach(user => {
                                this.users.push({title: user.email, value: user.email, key: user.email})
                            });
                        });

                        this.TitlePerson = "E-Mail Address";
                        break;
                    }
                    default:
                        break;
                }
                selectedObject[0].users.forEach(user => {
                    this.users.push({title: user.email, value: user.email, key: user.email})
                });
            }

            console.log(this.inputRecipient);
        },  
        addOrg() {
            if (this.inputPersonal == undefined) {

                this.users.forEach(user => {
                    this.listdata.push(user.title)
                });
            }

            this.inputPersonal = this.inputPersonal.filter((user) => !this.listdata.includes(user));
            this.listdata.push(...this.inputPersonal)
            this.inputPersonal = undefined;
        },

        deleteuser(user) {
            var index = this.listdata.indexOf(user);
            this.listdata.splice(index, 1);
        },

        alldelete() {
            this.listdata = [];
        },
    },
}