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

        


            <a-auto-complete
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
                
                <template slot="dataSource">

                    <template v-for="entry in searchResult" :value="entry.name">
                        {{entry.email}}
                        <a-select-opt-group :value="entry.name" :key="entry.key">
                            <span slot="label">
                                User
                            </span>

                            <a-select-option :value="entry.name" :key="entry.key">
                                <a-icon type="user" />
                                {{ entry.email }}
                            </a-select-option>                        
                        </a-select-opt-group>

                        <a-select-opt-group v-for="entryOrg in entry.orgs" :value="entryOrg.name" :key="entryOrg.key">
                            <span slot="label">
                                {{ entryOrg.name }}
                            </span>

                            <a-select-option :value="entryOrg.name" :key="entryOrg.key">
                                <a-icon type="bank" />
                                {{ entryOrg.name }}
                            </a-select-option>    

                            <a-select-option v-for="entryTeam in entryOrg.teams" :value="entryTeam" :key="entryTeam">
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

            <template>
            <div :style="{ marginLeft: '27.2rem', width: '25rem'}">
                <template v-for="(tag) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                    <a-tag :key="tag" :closable="true" @close="() => handleClose(tag)">
                    {{ `${tag.slice(0, 20)}...` }}
                    </a-tag>
                </a-tooltip>
                <a-tag v-else :key="tag" :closable="true" @close="() => handleClose(tag)">
                    {{ tag }}
                </a-tag>
                </template>
            </div>
            </template>
            <br>
            </div>
        </div>   
    </div>
</template>

<script src="./site.js" />
<style src="./site.css" /> 


