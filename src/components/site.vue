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
            <a-tree-select
                v-model="inputRecipient"
                show-search
                :style="{ width: '25rem', maxWidth: '100%' }"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="Please select"
                allow-clear
                multiple
                :treeData="treeOrgData"
                @blur="inputRecipient = undefined"
                @change="handleRecipientType"
             >
            </a-tree-select>
            </div>
            <div v-infinite-scroll="handleInfiniteOnLoad"
                class="demo-infinite-container"
                :infinite-scroll-disabled="busy"
                :infinite-scroll-distance="10">
                <a-list item-layout="horizontal" :data-source="listdata">
                    <a-list-item class="list" v-for="user in listdata" :key="user">
                        {{user}}
                        <a class="deletebutton" @click="deleteuser(user)">delete</a>
                    </a-list-item>
                </a-list>
            </div>
            <div class="inputfield_inputcontainer1" v-if="this.inputRecipient !== undefined">
                <a-tree-select
                    v-model="inputPersonal"
                    show-search
                    :style="{ width: '25rem', maxWidth: '100%' }"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Please select"
                    allow-clear
                    multiple
                    :treeData="users"
                >
                </a-tree-select>
                <a-button class="addbutton" @click="addOrg()" type="primary">Add</a-button>
            </div>
        </div>   
    </div>
</template>

<script src="./site.js" />
<style src="./site.css" /> 


