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
                    :treeData="treeOrgData">
                </a-tree-select>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a-icon type="swap" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a-tree-select
                    v-model="inputRecipient"
                    show-search
                    :style="{ width: '25rem', maxWidth: '100%' }"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Please select"
                    allow-clear
                    :treeData="treeOrgData"
                    @blur="inputRecipient = undefined"
                    @change="handleRecipientType">
                </a-tree-select>
            </div>
            <div class="titlelist">
                <h6 class="title">Invited participants:</h6>
                <div v-infinite-scroll="handleInfiniteOnLoad"
                    class="demo-infinite-container">
                    <a-list item-layout="horizontal" :data-source="listdata">
                        <a-empty v-if="this.Nodata == false" class="nodata" />
                        <a-list-item class="list" v-for="user in listdata" :key="user">
                            {{user}}
                            <a class="deletebutton" @click="deleteuser(user)"><a-icon type="delete" /></a>
                        </a-list-item>
                    </a-list>
                </div>
                <a-button class="clearbutton" @click="alldelete()" type="primary">Clear</a-button>
                <div class="inputfield_inputcontainer1" v-if="this.inputRecipient !== undefined">
                    <h6 id="TitlePerson">{{TitlePerson}}</h6>
                    <a-tree-select
                        v-model="inputPersonal"
                        show-search
                        :style="{ width: '25rem', maxWidth: '100%' }"
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                        placeholder="Please select"
                        allow-clear
                        multiple
                        :treeData="users">
                    </a-tree-select>
                    <a-button class="addbutton" @click="addOrg()" type="primary">Add</a-button>
                </div>
            </div>
        </div>
        <div class="sponsoring">
            <h3 class="sponsoringtitle">Sponsoring</h3>
            <p class="SDescription">If you sponsor this exchange, your organisation will be billed for both sides of the exchange.</p>
            <a-checkbox style="font-size: 12px">This is a sponsored exchange</a-checkbox>
        </div>
    </div>
</template>

<script src="./site.js" />
<style src="./site.css" /> 


