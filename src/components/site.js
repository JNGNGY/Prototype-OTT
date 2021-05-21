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
            sfxData: [],
            sfxAutoComplete: [],
            recipientSearchQuery: '',
            searchResultOrg: [],
            searchResultTeam: [],
            searchResult: [],
            searchResultUsers: [],
            userOrgList: [],
            userTeamList: [],
            exchangeRecipient: '',
            tags: [],
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

            this.sfxData.push(
                this.organisations
                    .map(org => ({name: org.name, key: `o_${org.id}`, value: `o_${org.id}`})
                )
            )

            this.sfxData.push(
                this.teams
                    .map(team => ({name: team.name, key: `t_${team.id}`, value: `t_${team.id}`, connector: team.orgId})
                )
            )

            this.organisations.forEach(org => { 
                this.treeOrgData.push({title:org.name, value: `o_${org.id}`, key: `o_${org.id}`, children: 
                    this.teams
                        .filter(team => team.orgId === org.id && team.id !== undefined)
                        .map(team =>({title: team.name, value: `t_${team.id}`, key: `t_${team.id}`}))
                });
            });

            // Create User List
            this.organisations.forEach(org => {
                org.users.forEach(user => { 
                    this.addUser(user);
                });
            });
            // Add orgs to a user
            this.organisations.forEach(org => {
                this.users.forEach(user => {
                    if(org.users.filter(orgUser => orgUser.email === user.email).length > 0){
                        user.orgs.push({id: org.id, name: org.name, key: org.id, value: org.id, teams: 
                            org.teams.map(team => this.getTeamByID(team))
                        });
                    }
                });
            });
            // Add teams to a user
            this.teams.forEach(team => {
                this.users.forEach(user => {
                    if(team.users.filter(teamUser => teamUser.email === user.email).length > 0){
                        user.teams.push({id: team.id, name: team.name, key: team.id, value: team.id});
                    }
                });
            });
        },
        getTeamByID(id){
            let team = (this.teams.filter(team => team.id === id));
            return team[0].name;
        },
        addUser(user){
            let userObject = {
                email: user.email,
                key: user.email,
                value: user.email,
                orgs: [],
                teams: []
            }
            if(!this.users.filter(user => user.email === userObject.email).length > 0){
                this.users.push(userObject);
            }
        },
        handleRecipientSearch(query){
            if(query) {
                switch(query.charAt(0)) {
                    case '@':
                        this.getQueryEntities(query);
                        break;
                    default:
                        this.getQueryUsers(query);
                        break;
                }
            }
        },
        handleRecipientSelect(recipient){
            this.tags.push(recipient);
            this.exchangeRecipient = '';
            this.searchResult = [];
        },
        getQueryEntities(query){
            this.searchResultOrg = (this.sfxData[0].filter(entry => entry.name.toLowerCase().substring(0, (query.length-1)) === query.toLowerCase().substring(1, query.length)).map(entry => entry));
            this.searchResultTeam = (this.sfxData[1].filter(entry => entry.name.toLowerCase().substring(0, (query.length-1)) === query.toLowerCase().substring(1, query.length)).map(entry => entry));

            this.searchResult.push(this.searchResultOrg).concat(this.searchResultTeam);
        },
        getQueryUsers(query){
            if(this.users.filter(user => user.email === query).length > 0){
                this.searchResult = this.users.filter(entry => entry.email.toLowerCase().substring(0, query.length) === query.toLowerCase().substring(0, query.length))
            } else {
                this.searchResult = [];
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
                        break;
                    }
                    case 't': {
                        selectedObject = (this.teams.filter(team => {
                            return team.id === Number(selectedValue)
                        }))
                        break;
                    }
                    default:
                        break;
                }
                selectedObject[0].users.forEach(user => {
                    this.users.push({title: user.email, value: user.email, key: user.email})
                });
            }
        },
        handleClose(removedTag) {
            const tags = this.tags.filter(tag => tag !== removedTag);
            this.tags = tags;
        },
    },
}