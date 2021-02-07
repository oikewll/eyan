<template>
    <div id="app" class="mod-speak">
        <div class="txt">{{ eyan }}</div>
        <div class="by">—— {{ from }}{{ who }}</div>
        <ul class="btn-list">
            <li>
                <a
                    class="btn-normal btn-heart"
                    href="javascript:;"
                    @click="likeit()"
                    ><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xin"></use></svg
                    ><span class="n" v-if="num !== 0">{{ num }}</span></a
                >
                <span class="pop" v-if="poplike"
                    ><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xin"></use></svg
                ></span>
            </li>
            <li>
                <a class="btn-normal" href="javascript:;" @click="querydata()"
                    ><svg
                        class="icon"
                        :class="{ rotate: loading }"
                        aria-hidden="true"
                    >
                        <use xlink:href="#icon-genghuan"></use></svg
                ></a>
            </li>
            <li>
                <a class="btn-normal" href="javascript:;" @click="copytxt()"
                    ><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fuzhi"></use></svg
                ></a>
                <span class="hint" v-if="copyed">复制成功</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            loading: true,
            poplike: false,
            copyed: false,
            eyan: "加载中…",
            from: "",
            who: "",
            num: 0,
        };
    },
    mounted: function () {
        this.querydata();
    },
    methods: {
        querydata() {
            let that = this;

            that.loading = true;
            that.eyan = "加载中…";
            that.who = "";
            that.num = 0; //以后可以存储一个like的统计数

            fetch("//v1.hitokoto.cn/")
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    that.eyan = json.hitokoto;
                    that.from = "《" + json.from + "》";
                    // that.who = json.creator;
                    that.loading = false;

                    console.log("parsed json", json);
                })
                .catch(function (ex) {
                    console.log("Err:", ex);
                });
        },
        likeit() {
            if (this.poplike) return;

            let that = this,
                num = that.num;

            num++;

            that.poplike = true;
            that.num = num;

            setTimeout(function () {
                that.poplike = false;
            }, 500);
        },
        copytxt() {
            let that = this;

            if (this.copyed) return;

            // 动态创建 input 元素
            var aux = document.createElement("input");
            // 获得需要复制的内容
            aux.setAttribute("value", that.eyan);
            // 添加到 DOM 元素中
            document.body.appendChild(aux);
            // 执行选中
            // 注意: 只有 input 和 textarea 可以执行 select() 方法.
            aux.select();
            // 获得选中的内容
            var content = window.getSelection().toString();
            // 执行复制命令
            document.execCommand("copy");
            // 将 input 元素移除
            document.body.removeChild(aux);

            // hui.toast('复制成功');
            that.copyed = true;
            console.log("复制成功：" + that.eyan);
            setTimeout(function () {
                that.copyed = false;
            }, 2200);
        },
    },
};
</script>

<style scoped>
</style>