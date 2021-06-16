import data from '../data/sfx-data.json';

export default {
    el: '#app',
    data() {
        return {
            inputSender: undefined,
            inputRecipient: undefined,
            treeOrgData: [],
            users: [],
            listdata: [],
            recipientSearchQuery: '',
            subject: '',
            searchResult: [],
            searchEmail: '',
            searchResultUsers: [],
            userOrgList: [],
            userTeamList: [],
            exchangeRecipient: '',
            tags: [],
            Nodata: false,
            re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            invalidUser: false,
            unknownUser: false,
            history: [],
            emptyQuery: true,
            sponsoringForce: false,
            sponsoring: false,
            orgExchangeMode: false,
            senderCount: 1,
            orgRestriction: false,
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



            this.organisations.forEach(org => { 
                if(this.treeOrgData.length < 1) {
                    this.treeOrgData.push({title:org.name, value: org.name, key: `o_${org.id}`, children: 
                    this.teams
                        .filter(team => team.orgId === org.id && team.id !== undefined)
                        .map(team =>({title: team.name, value: team.name, key: `t_${team.id}`}))
                });
                } else {
                    return
                }

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
        checkRecipients(){
            
            let checkingOrg = this.listdata[0];

            this.listdata.map(entry => {
                if(entry.org === 'none'){
                    this.orgRestriction = false;
                } else {
                    if(entry.org.name !== checkingOrg.org.name){
                        this.orgRestriction = true;
                    }
                    else{
                        this.orgRestriction = false
                    }
                }
            });

        },
        handleRecipientSelect(recipient){
            if(recipient.type === undefined) {
                let el = document.getElementById("recipientInput");  
                el.dispatchEvent(new Event('input'));
            } else {
                if(this.listdata.filter(entry => entry.name === recipient.name).length === 0){
                    this.listdata.push(recipient);
                    this.checkRecipients(recipient.org.name);
                } 
                this.exchangeRecipient = '';
                if(this.history.filter(entry => entry.email === this.searchEmail).length === 0){
                    this.searchEmail.length > 0 ? this.history.push({email: this.searchEmail}) : null;
                } 
                if(this.listdata.filter(entry => entry.type === 'unregisteredUser').length > 0) {
                    this.sponsoring = true;
                    this.sponsoringForce = true;
                } else {
                    this.sponsoringForce = false;
                }
                this.emptyQuery = true;
                this.searchResult = [];
            }
        },
        handleSenderSelect(sender){
            if(sender === 'Super Traders Inc.'){
                this.orgExchangeMode = true;
                this.senderCount = 1;
            } else {
                this.orgExchangeMode = false;
                switch(sender){
                    case 'Silver Team': {
                        this.senderCount = 4;
                        break;
                    }
                    case 'Gold Team': {
                        this.senderCount = 7;
                        break;
                    }
                    case 'Diamond Team': {
                        this.senderCount = 3;
                        break;
                    }
                }
            }
        },
        handleCCSelect(value){
            this.senderCount = value.length + 1;
        },
        handleSponsoring(){
            this.sponsoring = !this.sponsoring;
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
            const tags = this.listdata.filter(tag => tag !== removedTag);
            this.listdata = tags;
            this.checkRecipients();

            this.checkRecipients(removedTag.org.name);
            if(this.listdata.filter(entry => entry.type === 'unregisteredUser').length > 0) {
                this.sponsoring = true;
                this.sponsoringForce = true;
            } else {
                this.sponsoringForce = false;
            }
        },  
        getTeamCount(name){
            console.log(this.users.filter(entry => entry.teams.includes(name).length));
        },
        sendExchange() {
            let descriptionElement = (
                <p>
                    The simulation was completed with following data<br></br>
                    <br></br>
                    Subject: {this.subject}<br></br>
                    Sender: {this.inputSender}<br></br>
                    Recipient(s): {this.listdata.map(entry => entry.name + ', ')}<br></br>
                </p>
              )
            this.$notification.open({
              message: 'Exchange Simulation',
              description: descriptionElement,
              duration: 0,
            });
          },
    },
}