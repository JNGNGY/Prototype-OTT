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
            searchEmail: '',
            searchResultUsers: [],
            userOrgList: [],
            userTeamList: [],
            exchangeRecipient: '',
            tags: [],
            userlist: [],
            Nodata: false,
            User: [
                { id: 1, name: "User" },
            ],
            TitlePerson: "",
            re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            invalidUser: false,
            unknownUser: false,
            history: [],
            emptyQuery: true
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
                console.log(query);
                switch(query.charAt(0)) {
                    case '@':
                        break;
                    case '':
                        this.searchResult = [];
                        this.emptyQuery = true;
                        break;
                    default:
                        this.emptyQuery = false;
                        this.getQueryUsers(query);
                        break;
                }
            } else {
                this.searchResult = [];
                this.emptyQuery = true;
            }
        },
        handleRecipientSelect(recipient){
            if(recipient.type === undefined) {
                let el = document.getElementById("recipientInput");  
                el.dispatchEvent(new Event('input'));
            } else {
                if(this.listdata.filter(entry => entry === recipient).length === 0){
                    this.history.push(recipient);
                } 
                this.exchangeRecipient = '';
                if(this.history.filter(entry => entry.email === this.searchEmail).length === 0){
                    this.history.push({email: this.searchEmail});
                } 
                this.emptyQuery = true;
                this.searchResult = [];
            }
        },
        getQueryEntities(query){
            this.searchResultOrg = (this.sfxData[0].filter(entry => entry.name.toLowerCase().substring(0, (query.length-1)) === query.toLowerCase().substring(1, query.length)).map(entry => entry));
            this.searchResultTeam = (this.sfxData[1].filter(entry => entry.name.toLowerCase().substring(0, (query.length-1)) === query.toLowerCase().substring(1, query.length)).map(entry => entry));
            this.searchResult.push(this.searchResultOrg).concat(this.searchResultTeam);
        },
        getQueryUsers(query){
            if(this.users.filter(user => user.email === query).length > 0){
                this.unknownUser = false;
                this.invalidUser = false;
                this.searchEmail = query;
                this.searchResult = this.users.filter(entry => entry.email.toLowerCase().substring(0, query.length) === query.toLowerCase().substring(0, query.length))
            } else {
                if(this.re.test(String(query).toLowerCase())){
                    this.invalidUser = false;
                    this.unknownUser = true;
                    this.searchResult = [{email: query, value: query, key: query, unregistered: true}];
                } else {
                    this.searchResult = [];
                    this.invalidUser = true;
                    this.unknownUser = false;
                }
            }

        },
        
        handleClose(removedTag) {
            console.log(removedTag);
            const tags = this.listdata.filter(tag => tag !== removedTag);
            console.log(this.listdata);
            console.log(tags);
            this.listdata = tags;
        },  

        deleteuser(user) {
            var index = this.listdata.indexOf(user);
            this.listdata.splice(index, 1);
        },

        sendExchange() {
        },
    },
}