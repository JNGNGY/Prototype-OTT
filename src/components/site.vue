<template>
    <div class="sectionTitle">
        <h1>New Exchange</h1>
        <div class="inputfield">
            <h3>Subject</h3>
            <a-input placeholder="Subject of the exchange"
            :style="{ maxWidth: '52.5rem' }" />
            <br>
            <br>
            <div class="inputfield__inputcontainer">
                <h3>Sender</h3>
                <a-tree-select
                    v-model="inputSender"
                    show-search
                    :style="{ width: '25rem', maxWidth: '100%' }"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Please select"
                    allow-clear
                    multiple
                    :treeData="treeOrgData"
                >
            </a-tree-select>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a-icon type="swap" />
            &nbsp;&nbsp;&nbsp;&nbsp;

            <span class="warning-invalid" v-if="invalidUser">Please enter a valid Email</span>
            <a-auto-complete
                id="recipientInput"
                v-model="exchangeRecipient"
                class="certain-category-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="large"
                :style="{ width: '25rem'}"
                placeholder="input here"
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
                    <template v-for="entry in searchResult" :value="entry.name">
                        <a-select-opt-group v-if="unknownUser == false" :value="entry.name" :key="entry.key">
                            <span slot="label">
                                User
                            </span>

                            <a-select-option  :value="{name: entry.email, type: 'user'}" :key="entry.key">
                                <a-icon type="user" />
                                {{ entry.email }}
                            </a-select-option>                     
                        </a-select-opt-group>

                        <a-select-opt-group v-if="unknownUser == true" :value="entry.name" :key="entry.key">
                            <span slot="label">
                                Unregistered User
                            </span>

                            <a-select-option  :value="{name: entry.email, type: 'unregisteredUser'}" :key="entry.key">
                                <a-icon type="exclamation-circle" />
                                {{ entry.email }}
                            </a-select-option>                     
                        </a-select-opt-group>

                        <a-select-opt-group v-for="entryOrg in entry.orgs" :value="entryOrg.name" :key="entryOrg.key">
                            <span slot="label">
                                {{ entryOrg.name }}
                            </span>

                            <a-select-option :value="{name: entryOrg.name, type: 'organisation'}" :key="entryOrg.key">
                                <a-icon type="bank" />
                                {{ entryOrg.name }}
                            </a-select-option>    

                            <a-select-option v-for="entryTeam in entryOrg.teams" :value="{name: entryTeam, type: 'team', team: entryOrg}" :key="entryTeam">
                                <a-icon type="apartment" />
                                {{ entryOrg.name }} > {{ entryTeam }}
                            </a-select-option> 
                        </a-select-opt-group>
                    </template>
                </template>
                
                <a-input>
                    <a-icon slot="suffix" type="search" class="certain-category-icon" />
                </a-input>
            </a-auto-complete>

            </div>

        <div class="sponsoring" :style="{ marginTop: '-4.5rem', width: '25rem', float: 'left'}">
            <h3 class="sponsoringtitle">Sponsoring</h3>
            <p class="SDescription">If you sponsor this exchange, your organisation will be billed for both sides of the exchange.</p>
            <a-checkbox style="font-size: 12px">This is a sponsored exchange</a-checkbox>
        </div>

            <div class="titlelist" :style="{ marginLeft: '2.2rem', width: '25rem', float: 'left'}">
                <h6 class="title">Counterparty Participants</h6>
                <div
                    class="demo-infinite-container">
                    <a-list item-layout="horizontal" :data-source="listdata">
                        <a-empty v-if="this.Nodata == false" class="nodata" />
                        <a-list-item class="list" v-for="entry in listdata" :key="entry">
                            <a-icon v-if="entry.type === 'user'" type="user" />
                            <a-icon v-if="entry.type === 'unregisteredUser'" type="exclamation-circle" />
                            <a-icon v-if="entry.type === 'organisation'" type="bank" />
                            <a-icon v-if="entry.type === 'team'" type="apartment" />
                               {{entry.name}}
                            <a class="deletebutton" @click="handleClose(entry)"><a-icon type="delete" /></a>
                        </a-list-item>
                    </a-list>
                </div>
                <a-button class="clearbutton" type="primary" @click="sendExchange">
                    Send Exchange
                </a-button>
            </div>
            
        </div>
    </div>
</template>

<script src="./site.js" />
<style src="./site.css" /> 


