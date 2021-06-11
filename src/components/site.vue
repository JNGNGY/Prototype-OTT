<template>
    <div class="sectionTitle">
        <h1>New Exchange</h1>
        <div class="labels">
            <h3 :style="{ position: 'relative', top: '88px'}">Subject<span :style="{ color: 'red' }">*</span></h3>
            <h3 :style="{ position: 'relative', top: '123px'}">Sender<span :style="{ color: 'red' }">*</span></h3>
            <h3 :style="{ position: 'relative', top: '198px'}">Recipient<span :style="{ color: 'red' }">*</span></h3>
            <span class="warning-invalid" v-if="invalidUser">Please enter a valid Email</span>
        </div>
        <div class="inputfield">
            <a-input v-model="subject" placeholder="Subject of the exchange"
            :style="{ maxWidth: '47rem' }" />
            <br>
            <br>
            <div class="inputfield__inputcontainer">
                            <a-tag class="behalf-tag" color="blue">
                On behalf of Andreas Kohler
            </a-tag>
            <br>
                <a-tree-select
                    class="sender-field"
                    v-model="inputSender"
                    :style="{ marginTop: '1em'}"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Sending Party"
                    allow-clear
                    :treeData="treeOrgData"
                >
            </a-tree-select>

             <a-select mode="multiple" class="cc-field" placeholder="Add CC (Optional)">
                <a-select-option value="christoph">
                    Christoph Kaelin
                </a-select-option>
                <a-select-option value="emiliya">
                    Emiliya Gede
                </a-select-option>
                <a-select-option value="joost">
                    Joost Eringfeld
                </a-select-option>
                </a-select>
            <br><br>
            <a-auto-complete
                id="recipientInput"
                v-model="exchangeRecipient"
                class="certain-category-search"
                dropdown-class-name="certain-category-search-dropdown"
                :dropdown-match-select-width="false"
                :dropdown-style="{ width: '300px' }"
                size="default"
                :style="{ width: '47rem'}"
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
                
                <a-input>
                    <a-icon slot="suffix" type="search" class="certain-category-icon" />
                </a-input>
            </a-auto-complete>

            </div>


            <div class="titlelist">
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
                            <a-tag v-if="entry.org">{{entry.org.name}}</a-tag> 
                            <a class="deletebutton" @click="handleClose(entry)"><a-icon type="delete" /></a>
                        </a-list-item>
                    </a-list>
                </div>
                <br>
            </div>

            <br><br>
            <div class="sponsoring">
                <p class="SDescription">If you sponsor this exchange, your organisation will be billed for both sides of the exchange.</p>
                <a-checkbox :checked="sponsoring" :disabled="sponsoringForce" @change="handleSponsoring" style="font-size: 12px">This is a sponsored exchange</a-checkbox>
            </div>

            <a-button class="clearbutton" type="primary" @click="sendExchange">
                Next
            </a-button>

        </div>
    </div>
</template>

<script src="./site.js" />
<style src="./site.css" /> 


