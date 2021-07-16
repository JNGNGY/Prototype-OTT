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
            listdataOwn: [{name: 'tessa.foster@swisscom.com', type: 'initiatingUser', key: 'tessa.foster@swisscom.com'}],
            recipientSearchQuery: '',
            subject: '',
            searchResult: [],
            searchResultOwn: [{name: 'christoph.kaelin@swisscom.com', type: 'user'}, {name: 'emiliya.gede@swisscom.com', type: 'user'}, {name: 'joost.eringfeld@swisscom.com', type: 'user'}, {name: 'mike.johnson@swisscom.com', type: 'user'}, {name: 'mark.robinson@swisscom.com', type: 'user'}, {name: 'robert.wilde@swisscom.com', type: 'user'}, 
            {name: 'Silver Team', type: 'team'}, {name: 'Gold Team', type: 'team'}, {name: 'Diamond Team', type: 'team'}],
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
            domainHistory: [],
            emptyQuery: true,
            sponsoringForce: false,
            sponsoring: false,
            orgExchangeMode: false,
            senderCount: 1,
            orgRestriction: false,
            senderParticipants: [],
            senderParticipantsCC: undefined,
            senderList: [{name: 'christoph.kaelin@swisscom.com', type: 'user'}, {name: 'emiliya.gede@swisscom.com', type: 'user'}, {name: 'joost.eringfeld@swisscom.com', type: 'user'}, {name: 'mike.johnson@swisscom.com', type: 'user'}, {name: 'mark.robinson@swisscom.com', type: 'user'}, {name: 'robert.wilde@swisscom.com', type: 'user'}, 
                         {name: 'Silver Team', type: 'team'}, {name: 'Gold Team', type: 'team'}, {name: 'Diamond Team', type: 'team'}],
            senderListSelection: ['christoph.kaelin@swisscom.com', 'emiliya.gede@swisscom.com', 'joost.eringfeld.swisscom.com', 'mike.johnson@swisscom.com', 'mark.robinson@swisscom.com', 'robert.wild@swisscom.com'],
            orgRecipient: undefined,
            ccResult: [{email: 'christoph.kaelin@swisscom.com'}, {email: 'emiliya.gede@swisscom.com'}, {email: 'joost.eringfeld.swisscom.com'}, {email: 'mike.johnson@swisscom.com'}, {email: 'mark.robinson@swisscom.com'}]
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
                this.inputSender = 'Super Traders Inc.'
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
        handleSenderSearch(query){
            if(query) {
                    this.searchResultOwn = this.senderList.filter(entry => entry.name.toLowerCase().substring(0, query.length) === query.toLowerCase().substring(0, query.length))
            } else {
                this.searchResultOwn = this.senderList;
            }
        },
        checkRecipients(){
            
            let checkingOrg = this.listdata[0];

            this.listdata.map(entry => {
                if(entry.org === 'none'){
                    this.orgRestriction = false;
                } else {
                    this.orgRecipient= entry.org.name;
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

                if(this.domainHistory.filter(entry => entry.name === this.searchEmail.substring(this.searchEmail.lastIndexOf("@") +1)).length === 0) {
                    this.domainHistory.push({name: this.searchEmail.substring(this.searchEmail.lastIndexOf("@") +1), contacts: [this.searchEmail]})
                } else {
                        if(!this.domainHistory.filter(entry => entry.name === this.searchEmail.substring(this.searchEmail.lastIndexOf("@") +1)).map(entry => entry.contacts.includes(this.searchEmail))){
                            this.domainHistory.filter(entry => entry.name === this.searchEmail.substring(this.searchEmail.lastIndexOf("@") +1)).map(entry => entry.contacts.push(this.searchEmail));
                        } else {
                            console.log('Duplicate entry');
                        }
                            
                    }
                
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
            this.exchangeSender = null;
            this.searchResultOwn = this.senderList;
            this.listdataOwn.push({name: sender, type: (sender.includes('Team') ? 'team' : 'user')})
                switch(sender){
                    case 'Silver Team': {
                        this.senderParticipants.push('joost.eringfeld.swisscom.com', 'emiliya.gede@swisscom.com', 'mark.robinson@swisscom.com');
                        break;
                    }
                    case 'Gold Team': {
                        this.senderParticipants.push('joost.eringfeld.swisscom.com', 'emiliya.gede@swisscom.com', 'mark.robinson@swisscom.com', 'christoph.kaelin@swisscom.com', 'mike.johnson@swisscom.com');
                        break;
                    }
                    case 'Diamond Team': {
                        this.senderParticipants.push('joost.eringfeld.swisscom.com', 'mark.robinson@swisscom.com');
                        break;
                    }
                    default: {
                        this.senderParticipants.push(sender);
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
                console.log(this.re.test(String(query).toLowerCase()));
                if(this.re.test(String(query).toLowerCase())){
                    this.invalidUser = false;
                    this.unknownUser = true;
                    this.searchResult = [{email: query, value: query, key: query, unregistered: true}];
                } else {
                    this.searchResult = this.domainHistory.filter(entry => entry.name.toLowerCase().substring(0, query.length) === query.toLowerCase().substring(0, query.length))
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
            if(this.listdata.length === 0){
                this.orgRecipient = null;
            }
        },
        handleCloseOwn(removedTag) {
            const tags = this.listdataOwn.filter(tag => tag !== removedTag);
            this.listdataOwn = tags;
            switch(removedTag) {
                case 'Silver Team': {
                    this.senderParticipants.splice('joost.eringfeld.swisscom.com', 'emiliya.gede@swisscom.com', 'mark.robinson@swisscom.com');
                    break;
                }
                case 'Gold Team': {
                    this.senderParticipants.splice('joost.eringfeld.swisscom.com', 'emiliya.gede@swisscom.com', 'mark.robinson@swisscom.com', 'christoph.kaelin@swisscom.com', 'mike.johnson@swisscom.com');
                    break;
                }
                case 'Diamond Team': {
                    this.senderParticipants.splice('joost.eringfeld.swisscom.com', 'mark.robinson@swisscom.com');
                    break;
                }
                default: {
                    this.senderParticipants.splice(removedTag);
                }
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
            this.inputSender = undefined,
            this.inputRecipient = undefined,
            this.listdata = [],
            this.listdataOwn = [{name: 'tessa.foster@swisscom.com', type: 'initiatingUser', key: 'tessa.foster@swisscom.com'}],
            this.subject = '',
            this.exchangeRecipient = '',
            this.sponsoringForce = false,
            this.sponsoring = false,
            this.orgRestriction = false,
            this.senderParticipants = [],
            this.orgRecipient = null
          },
    },
}