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
                <a-tree-select
                    v-model="value"
                    :style="{ width: '25rem', maxWidth: '100%' }"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    :tree-data="treeData"
                    placeholder="Please select"
                    tree-default-expand-all
                >
                <span  slot="name">
                </span>
            </a-tree-select>
            &nbsp;&nbsp;&nbsp;
            <a-icon type="swap" />
            &nbsp;&nbsp;&nbsp;
                <a-tree-select
                    show-search
                    :style="{ width: '25rem', maxWidth: '100%' }"
                    :value="value"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Please select"
                    allow-clear
                    multiple
                    :treeData="treeOrgData"
                    @change="onChange"
                    @search="onSearch"
                    @select="onSelect"
                >
            </a-tree-select>
            </div>
        </div>   

    </div>
</template>

<script src="./site.js" />
<style src="./site.css" /> 


