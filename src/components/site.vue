<template>
    <div class="Site">
        <div class="inputfield">
            <div class="inputfield__inputcontainer">
                <input type="text" 
                class="inputfield__input"
                required
                v-model="sender"
                @focus="SEavailable = false"
                @blur="SEavailable = true">    
                <div class="inputfield__placeholder">    
                    <span>Sender</span>
                </div>
            </div>
            <div class="inputfield__inputcontainer1">
                <input type="text" 
                class="inputfield__input"
                required
                v-model="recipient"
                @focus="REavailable = false"
                @blur="REavailable = true">
                <div class="inputfield__placeholder1">    
                    <span>Recipient</span>
                </div>
            </div>
        </div>    
        <div class="suggestionlist">   
            <div class="suggestionlist_sender" v-show="!SEavailable"> 
                <ul>
                    <li v-for="Team in SeTeams" :key="Team">{{ Team }}</li>
                </ul>
            </div>
            <div class="suggestionlist_recipient" v-show="!REavailable"> 
                <ul>
                    <li v-for="Team in ReTeams" :key="Team">{{ Team }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script src="./site.js" />
<style src="./site.css" /> 
