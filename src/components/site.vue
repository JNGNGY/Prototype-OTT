<template>
    <div class="Site">
        <div class="inputfield">
            <h3>Subject</h3>
            <a-input placeholder="Subject of the exchange" />
            <div class="inputfield__inputcontainer">
                <a-tree-select
                    show-search
                    style="width: 100%"
                    :value="value"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Please select"
                    allow-clear
                    multiple
                    tree-default-expand-all
                    @change="onChange"
                    @search="onSearch"
                    @select="onSelect"
                >
                <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
                <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
                    <a-tree-select-node key="random" value="leaf1" title="my leaf" />
                    <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
                </a-tree-select-node>
                <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
                    <a-tree-select-node key="random3" value="sss">
                    <b slot="title" style="color: #08c">sss</b>
                    </a-tree-select-node>
                </a-tree-select-node>
                </a-tree-select-node>
            </a-tree-select>
               <!-- <input type="text" 
                class="inputfield__input"
                required
                v-model="sender"
                @focus="Selist"
                @blur="DeleteList">    
                <div class="inputfield__placeholder">    
                    <span>Sender</span>
                </div> -->
            </div>
            <div class="inputfield__inputcontainer1">
                <input type="text" 
                class="inputfield__input"
                required
                v-model="recipient"
                @focus="Relist"
                @blur="DeleteList1">
                <div class="inputfield__placeholder1">    
                    <span>Recipient</span>
                </div>
            </div>
        </div>    
        <div class="suggestionlist">   
            <div class="suggestionlist_sender" v-show="!SEavailable"> 
                <ul>
                    <li @click="SetSender(name)" v-for="name in names" :key="name">{{name}}</li>
                    <li @click="SetSender(name)" v-for="name in names" :key="name">{{name}}</li>
                </ul>
            </div>
            <div class="suggestionlist_recipient" v-show="!REavailable"> 
                <ul>
                    <li @click="SetRecipient(name)" v-for="name in names" :key="name">{{name}}</li>
                    <li @click="SetRecipient(Team)" v-for="Team in ReTeams" :key="Team">{{ Team }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script src="./site.js" />
<style src="./site.css" /> 


