<template>
    <div class="Site">
        <div class="inputfield">
            <div class="inputfield__inputcontainer">
                <input type="text" 
                class="inputfield__input"
                required
                v-model="sender"
                @focus="Selist"
                @blur="DeleteList">    
                <div class="inputfield__placeholder">    
                    <span>Sender</span>
                </div>
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
