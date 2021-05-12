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
                    show-search
                    :style="{ width: '25rem', maxWidth: '100%' }"
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


