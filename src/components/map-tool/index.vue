<template>
    <div class='map-tool'>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="selectAll">全选</el-checkbox>
        <el-checkbox-group v-model="checkLists" @change="changeTools">
            <el-checkbox
                v-for="item in checkArr"
                :label="item"
                :key="item.ID"
                size="medium"
                @change="selectSingleVal($event, item)"
            >
                <span :style="{background: item.MENU_ICON}" class="tool-icon"></span>
                {{item.MENU_NAME}}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
// 引入的模块基础数据
import moduleData from '@/config/tool-config.js'
export default {
    props: {
        // 页面主题
        pageType: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            checkAll: false,
            checkLists: [],
            isIndeterminate: true,
        }
    },

    components: {},

    computed: {
        checkArr () {
            return moduleData[this.pageType]
        }
    },

    methods: {
        selectAll(status) {
            this.checkLists = status ? this.checkArr : [];
            this.isIndeterminate = false
            this.$emit('selectAll', {all: status, checkArr: this.checkArr})
            console.log(this.checkArr);
        },
        changeTools(selectList) {
            let checkedCount = selectList.length
            this.checkAll = checkedCount === this.checkArr.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkArr.length
        },
        // 当前点击选中事件
        selectSingleVal(val, item) {
            if (val) {
                this.$emit('selectVal', {ISCHECKED: val, ...item})
            } else {
                this.$emit('unSelectVal', {ISCHECKED: val, ...item})
            }
            console.log({ISCHECKED: val, ...item});
        }
    },
}
</script>
<style lang='scss' scoped>
.map-tool{
    pointer-events: auto;
    .tool-icon{
        display: inline-block;
        width: 10px;
        height: 10px;
    }
    /deep/ .el-checkbox__label{
        color: #fff;
    }
}
</style>