<template>
    <div class="sectionTitle">
        <h1 class="exchange-title">New Exchange</h1>
        <span class="titles subject-title">Subject</span><span class="red">*</span><br>
        <div class="inputfield">
            <a-input v-model="subject" placeholder="Subject of the exchange"
            :style="{ maxWidth: '40vw' }" />
            <br>
            <br>
            <div class="exchange-container">
            <div class="sender">
            <span class="titles">Parties</span><span class="red">*</span><br>
            <a-tag color="blue" class="senders-tag">
                <div class="center">

                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    Swisscom AG
                    </a>
                </div>
<!--                 <a-dropdown class="center">
                    <a-menu  class="dropdown" slot="overlay">
                    <a-menu-item >
                        <a style="font-size: 11px">tessa.foster@supertraders.com</a>
                    </a-menu-item>
                    <a-menu-item v-for="entry in senderParticipants" :key="entry">
                        <a style="font-size: 11px" href="javascript:;"> {{entry}}</a>
                    </a-menu-item>
                    </a-menu>
                </a-dropdown> -->
            </a-tag>
            <!-- <a-tree-select
                id="sender-select"
                class="sender-field treeSelect"
                v-model="inputSender"
                :style="{ marginTop: '0.7em', fontSize: '12px', maxHeight: '2em'}"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto', bgColor: 'red' }"
                placeholder="Sending Party"
                :treeData="treeOrgData"
                tree-default-expand-all
                @change="handleSenderSelect"
            >
            </a-tree-select> -->
<!--             <a-auto-complete
                id="recipientInput"
                v-model="exchangeCC"
                class="certain-category-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="default"
                :style="{ width: '100%'}"
                placeholder="Recipient(s)"
                option-label-prop="value"
                @select="handleRecipientSelect"
                @change="handleRecipientSearch"
                >

                <template v-if="emptyQuery === true" slot="dataSource">
                    <template v-for="entry in history" :value="entry.email">

                            <a-select-option :value="entry.email" :key="entry.email">
                                <a-icon type="enter" />
                                {{ entry.email }}
                            </a-select-option>                     

                    </template>
                </template>
                
                <template v-if="emptyQuery === false" slot="dataSource">

                    <template>
                        <template v-for="entry in ccResult" :value="entry">
                            <a-select-opt-group :value="entry.email" :key="entry.email">

                                <a-select-option  :value="{name: entry.email, type: 'unregisteredUser', org: 'none'}" :key="entry.email">
                                    <a-icon type="user" />
                                    {{ entry.email }}
                                </a-select-option> 

                            </a-select-opt-group>

                        </template>
                    </template>
                </template>
                
                <a-input>
                    <a-icon slot="suffix" type="search" class="certain-category-icon" />
                </a-input>
            </a-auto-complete> -->

<!--             <a-icon class="cc-icon" type="search" />
             <a-select id="cc-field" v-model="senderParticipantsCC" mode="multiple" @change="handleCCSelect" class="cc-field" placeholder="Add extra participants">

                        <a-select-option v-for="entry in senderListSelection" :key="entry" :value="entry">
                            <a-icon type="user" />
                            {{entry}}
                        </a-select-option>
            </a-select> -->
            <a-auto-complete
                id="senderInput"
                v-model="exchangeSender"
                class="sender-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="default"
                :style="{ width: '100%'}"
                placeholder="Search For Sender"
                option-label-prop="value"
                @select="handleSenderSelect"
                @change="handleSenderSearch"
                >

                <!-- <template v-if="emptyQuery === true" slot="dataSource">
                    <template v-for="entry in history" :value="entry.email">

                            <a-select-option :value="entry.email" :key="entry.email">
                                <a-icon type="enter" />
                                {{ entry.email }}
                            </a-select-option>                     

                    </template>
                </template> -->
                
                <template slot="dataSource">
                        <template>


                                <a-select-option v-for="entry in searchResultOwn" :key="entry.name">
                                    <a-icon v-if="entry.type === 'user'" type="user" />
                                    <a-icon v-if="entry.type === 'team'" type="apartment" />
                                    {{ entry.name }}
                                </a-select-option>


                        </template>
                </template>
                
                <a-input>
                    <a-icon slot="suffix" type="search" class="certain-category-icon" />
                </a-input>
            </a-auto-complete>
            <br><br>
            <div v-if="listdataOwn.length > 0" class="titlelist">
                <div
                    class="demo-infinite-container sender-list">
                    <a-list item-layout="horizontal" :data-source="listdataOwn">
                        <a-empty v-if="this.Nodata == false" class="nodata" />
                        <a-list-item class="list" v-for="entry in listdataOwn" :key="entry">
                            <a-icon v-if="entry.type === 'initiatingUser'" type="user" />
                            <a-icon v-if="entry.type === 'unregisteredUser'" type="user" />
                            <a-icon v-if="entry.type === 'user'" type="user" />
                            <a-icon v-if="entry.type === 'organisation'" type="bank" />
                            <a-icon v-if="entry.type === 'team'" type="apartment" />
                            {{entry.name}}



                            <a-tag v-if="entry.type === 'initiatingUser'">Initiator</a-tag>
                            <a-tag color="purple" v-if="entry.type === 'unregisteredUser'">Guest</a-tag> 
                            <a v-if="entry.type !== 'initiatingUser'" class="deletebutton" @click="handleCloseOwn(entry)"><a-icon type="delete" /></a>
                        </a-list-item>
                    </a-list>
                </div>
                <br>
            </div>
            <br><br><br><br><br><br>
            <div class="sponsoring">
                <h3>Sponsoring</h3>
                <p class="SDescription">If you sponsor this exchange, your organisation will be billed for both sides of the exchange.</p>
                <a-checkbox :checked="sponsoring" :disabled="sponsoringForce" @change="handleSponsoring" style="font-size: 12px">This is a sponsored exchange</a-checkbox>
                <br><br><br>
                            <a-button :disabled="orgRestriction" class="next-button" type="primary" @click="sendExchange">
                Next
            </a-button>
            </div>

            </div>
            <div class="recipient">
            <a-icon class="swap" type="swap" />
            <a-tag :color="orgRecipient ? 'blue' : 'green'" class="recipients-tag">

                
                <div class="center">

                    <a v-if="orgRecipient" class="ant-dropdown-link" @click="e => e.preventDefault()">
                    {{orgRecipient}}
                    </a>

                    <a v-if="!orgRecipient" class="ant-dropdown-link" @click="e => e.preventDefault()">
                    No recipient
                    </a>
                </div>

<!--                 <a-dropdown class="center">
                    <a-menu  class="dropdown" slot="overlay">
                    <a-menu-item v-for="entry in listdata" :key="entry">
                        <a v-if="entry.type === 'user'" style="font-size: 11px" href="javascript:;"> 
                            {{entry.name}}
                        </a>
                        <a v-if="entry.name === 'Aqua Team'" style="font-size: 11px" href="javascript:;"> 
                            <p>andreas.kohler@swisscom.com</p>
                            <p>john.smith@swisscom.com</p>
                        </a>
                        <a v-if="entry.name === 'Riverbank Team'" style="font-size: 11px" href="javascript:;"> 
                            <p>andreas.kohler@swisscom.com</p>
                            <p>john.smith@swisscom.com</p>
                            <p>kate.lorenza@swisscom.com</p>
                            <p>elizabeth.johnson@swisscom.com</p>
                        </a>
                    </a-menu-item>
                    </a-menu>
                </a-dropdown> -->
            </a-tag>
            <a-auto-complete
                id="recipientInput"
                v-model="exchangeRecipient"
                class="recipient-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="default"
                :style="{ width: '100%'}"
                placeholder="Search For Recipient"
                option-label-prop="value"
                @select="handleRecipientSelect"
                @change="handleRecipientSearch"
                >

                <!-- <template v-if="emptyQuery === true" slot="dataSource">
                    <template v-for="entry in history" :value="entry.email">

                            <a-select-option :value="entry.email" :key="entry.email">
                                <a-icon type="enter" />
                                {{ entry.email }}
                            </a-select-option>                     

                    </template>
                </template> -->
                
                <template v-if="emptyQuery === false" slot="dataSource">
                    <template v-if="invalidUser">
                        <template v-for="entry in searchResult" :value="entry.name">

                                <a-select-opt-group :value="entry.name" :key="entry.name">
                                    <span class="title-label" slot="label">
                                        <a-icon type="team" />
                                        {{ entry.name.split('.')[0] }}
                                    </span>



                                    <template v-for="entryContact in entry.contacts" :value="entryContact">

                                        <a-select-option :value="entryContactl" :key="entryContact">
                                            <a-icon type="enter" />
                                            {{ entryContact }}
                                        </a-select-option>                     

                                </template>

                                </a-select-opt-group>
                    
                            </template>
                    </template>

                    <template v-if="!invaliUser">
                        <template v-for="entry in searchResult" :value="entry.name">
    <!--                         <a-select-opt-group v-if="unknownUser == false" :value="entry.name" :key="entry.key">
                                <span slot="label">
                                    User
                                </span>

                                <a-select-option  :value="{name: entry.email, type: 'user'}" :key="entry.key">
                                    <a-icon type="user" />
                                    {{ entry.email }}
                                </a-select-option>                     
                            </a-select-opt-group> -->

                            <a-select-opt-group v-if="unknownUser == true" :value="entry.name" :key="entry.key">
                                <span slot="label">
                                    Guest User
                                </span>

                                <a-select-option  :value="{name: entry.email, type: 'unregisteredUser', org: 'none'}" :key="entry.key">
                                    <a-icon type="user" />
                                    {{ entry.email }}
                                </a-select-option>                     
                            </a-select-opt-group>

                            <a-select-opt-group v-for="entryOrg in entry.orgs" :value="entryOrg.name" :key="entryOrg.key">
                                <span class="title-label" slot="label">
                                    <a-icon type="bank" />
                                    {{ entryOrg.name }}
                                </span>

                                <a-select-option :value="{name: entry.email, type: 'user', org: entryOrg}" :key="entry.key+entryOrg.key">
                                    <a-icon type="user" />
                                    {{ entry.email }}
                                </a-select-option>

                                <a-select-option v-for="entryTeam in entryOrg.teams" :value="{name: entryTeam, type: 'team', org: entryOrg}" :key="entryTeam">
                                    <a-icon type="apartment" />
                                    {{ entryTeam }}
                                </a-select-option> 
                            </a-select-opt-group>
                        </template>
                    </template>
                </template>
                
                <a-input>
                    <a-icon slot="suffix" type="search" class="certain-category-icon" />
                </a-input>
            </a-auto-complete>

            <div v-if="listdata.length > 0" class="titlelist">
                <div
                    class="demo-infinite-container recipient-list">
                    <a-list item-layout="horizontal" :data-source="listdata">
                        <a-empty v-if="this.Nodata == false" class="nodata" />
                        <a-list-item class="list" v-for="entry in listdata" :key="entry">
                            <a-icon v-if="entry.type === 'user'" type="user" />
                            <a-icon v-if="entry.type === 'unregisteredUser'" type="user" />
                            <a-icon v-if="entry.type === 'organisation'" type="bank" />
                            <a-icon v-if="entry.type === 'team'" type="apartment" />
                            {{entry.name}}
                            <a-tag v-if="entry.org.name && !orgRestriction">{{entry.org.name}}</a-tag> 
                            <a-tag color="red" v-if="entry.org.name && orgRestriction">{{entry.org.name}}</a-tag>
                            <a-tag color="purple" v-if="entry.type === 'unregisteredUser'">Guest</a-tag> 
                            <a class="deletebutton" @click="handleClose(entry)"><a-icon type="delete" /></a>
                        </a-list-item>
                    </a-list>
                </div>
                <br>
            </div>

        
            </div>

            <br><br>
            <br>

            </div>
        </div>
    </div>
    
</template>

<script src="./site.js" />
<style src="./site.css" /> 


