<template>

    <div class="ww-row" v-bind:style="getRowHeight()">
        <!-- wwManager:start -->
        <div class="ww-column-tab">
            <span class="wwi wwi-align-right"></span>
        </div>
        <!-- wwManager:end -->
        <div class='ww-column' v-for="(wwColmun, index) in wwObject.content.data.columns" :key="index" :column-index="index" v-bind:class="columnAlignClasses[index]">

            <wwObject class='ww-column-bg' v-bind:ww-object="wwColmun.background" ww-category='background' ww-default-object-type='ww-color'></wwObject>

            <div class='ww-column-style'>

                <wwLayoutColumn tag='div' ww-default="ww-image" :ww-list="wwColmun.wwObjects" v-on:ww-add="addWwObject(wwColmun.wwObjects, $event)" v-on:ww-remove="removeWwObject(wwColmun.wwObjects, $event)" class="ww-column-container ww-layout-column">
                    <wwObject v-for="wwObj in wwColmun.wwObjects" :key="wwObj.uniqueId" v-bind:ww-object="wwObj"></wwObject>
                </wwLayoutColumn>

            </div>

        </div>
    </div>

</template>


<script>
export default {
    name: "ww-row",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: Object
    },
    data() {
        return {
            wwObject: this.wwObjectCtrl.get(),
            columnAlignClasses: []
        };
    },
    computed: {

    },
    watch: {
        wwColumns() {
            this.updateColumns()
        }
    },
    methods: {
        init: function () {

            this.screenSizes = ['xs', 'sm', 'md', 'lg']

            window.addEventListener('resize', this.onResize);
            this.updateColumns();
        },

        updateColumns() {

            this.columnAlignClasses = [];

            for (let i = 0; i < this.wwObject.content.data.config.count; i++) {

                if (this.wwObject.content.data.columns.length < i + 1) {
                    this.wwObject.content.data.columns.push({});
                }

                if (!this.wwObject.content.data.columns[i].background) {
                    this.wwObject.content.data.columns[i].background = null;
                }

                if (!this.wwObject.content.data.columns[i].wwObjects) {
                    this.wwObject.content.data.columns[i].wwObjects = [];
                }

                let column = this.$el.querySelector('[column-index="' + i + '"]')

                this.columnAlignClasses.push(this.getAlignSelfForColumn(i))
                //column.classList.add(this.getAlignSelfForColumn(i))

                let stylesToAdd = ''
                stylesToAdd += this.convertStyleObjectsToString(this.getWidthAndOffset(i))
                stylesToAdd += 'display:' + (this.getHideForColumn(i) ? 'none;' : ';')
                stylesToAdd += 'order:' + this.getOrderForColumn(i) + ';'
                column.style.cssText = stylesToAdd

                let columnStyle = column.querySelector('.ww-column-style')
                stylesToAdd = ''
                stylesToAdd += this.convertStyleObjectsToString(this.getBordersStyleForColumn(i))
                stylesToAdd += this.convertStyleObjectsToString(this.getRadiusStyleForColumn(i))
                stylesToAdd += this.convertStyleObjectsToString(this.getShadowStyleForColumn(i))
                columnStyle.style.cssText = stylesToAdd

            }

        },
        onResize() {
            this.updateColumns()
        },
        convertStyleObjectsToString(obj) {
            let string = ''
            for (const key in obj) {
                string += key + ':' + obj[key] + ';'
            }
            return string
        },

        /*=============================================m_ÔÔ_m=============================================\
          ADD/REMOVE FUNCTIONS
        \================================================================================================*/
        addWwObject(wwObjectList, options) {
            wwObjectList.splice(options.index, 0, options.wwObject);
            this.wwObjectCtrl.update(this.wwObject);
        },
        removeWwObject(wwObjectList, options) {
            wwObjectList.splice(options.index, 1);
            this.wwObjectCtrl.update(this.wwObject);
        },


        /*=============================================m_ÔÔ_m=============================================\
          STYLE FUNCTIONS
        \================================================================================================*/
        getHideForColumn(columnIndex) {
            const defaultHide = false;

            let hideList = { xs: null, sm: null, md: null, lg: null };

            for (let i = 0; i < this.screenSizes.length; i++) {
                if (this.wwObject.content.data.config[this.screenSizes[i]]
                    && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex]) {
                    if (this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].hide) {
                        hideList[this.screenSizes[i]] = true;
                    }
                    else {
                        hideList[this.screenSizes[i]] = false;
                    }
                }
            }

            if (window.innerWidth < 768) {
                if (hideList["xs"] === null) {
                    return defaultHide;
                }
                return hideList["xs"];
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                if (hideList["sm"] === null) {
                    if (hideList["xs"] === null) {
                        return defaultHide;
                    }
                    return hideList["xs"];
                }
                return hideList["sm"];
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                if (hideList["md"] === null) {
                    if (hideList["sm"] === null) {
                        if (hideList["xs"] === null) {
                            return defaultHide;
                        }
                        return hideList["xs"];
                    }
                    return hideList["sm"];
                }
                return hideList["md"];
            }
            else {
                if (hideList["lg"] === null) {
                    if (hideList["md"] === null) {
                        if (hideList["sm"] === null) {
                            if (hideList["xs"] === null) {
                                return defaultHide;
                            }
                            return hideList["xs"];
                        }
                        return hideList["sm"];
                    }
                    return hideList["md"];
                }
                return hideList["lg"];
            }
        },
        getBordersStyleForColumn(columnIndex) {
            let defaultBordersStyle = {
                "border-top-width": "0px",
                "border-top-color": "#000000",
                "border-right-width": "0px",
                "border-right-color": "#000000",
                "border-bottom-width": "0px",
                "border-bottom-color": "#000000",
                "border-left-width": "0px",
                "border-left-color": "#000000"
            }

            let bordersStyleList = { xs: null, sm: null, md: null, lg: null };

            for (let i = 0; i < this.screenSizes.length; i++) {
                if (this.wwObject.content.data.config[this.screenSizes[i]]
                    && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex] && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].borders) {
                    var borders = this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].borders;
                    bordersStyleList[this.screenSizes[i]] = {
                        "border-top-width": borders[0].width + "px",
                        "border-top-color": borders[0].color,
                        "border-top-style": borders[0].style || "solid",
                        "border-right-width": borders[1].width + "px",
                        "border-right-color": borders[1].color,
                        "border-right-style": borders[1].style || "solid",
                        "border-bottom-width": borders[2].width + "px",
                        "border-bottom-color": borders[2].color,
                        "border-bottom-style": borders[2].style || "solid",
                        "border-left-width": borders[3].width + "px",
                        "border-left-color": borders[3].color,
                        "border-left-style": borders[3].style || "solid",
                    }
                }
            }

            if (window.innerWidth < 768) {
                return bordersStyleList["xs"] || defaultBordersStyle;
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                return bordersStyleList["sm"] || bordersStyleList["xs"] || defaultBordersStyle;
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                return bordersStyleList["md"] || bordersStyleList["sm"] || bordersStyleList["xs"] || defaultBordersStyle;
            }
            else {
                return bordersStyleList["lg"] || bordersStyleList["md"] || bordersStyleList["sm"] || bordersStyleList["xs"] || defaultBordersStyle;
            }

        },
        getRadiusStyleForColumn(columnIndex) {

            let defaultRadiusStyle = {
                "border-top-left-radius": "0",
                "border-top-right-radius": "0",
                "border-bottom-right-radius": "0",
                "border-bottom-left-radius": "0"
            }

            let radiusStyleList = { xs: null, sm: null, md: null, lg: null };

            for (var i = 0; i < this.screenSizes.length; i++) {
                if (this.wwObject.content.data.config[this.screenSizes[i]]
                    && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex] && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].radius) {
                    let radius = this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].radius;
                    radiusStyleList[this.screenSizes[i]] = {
                        "border-top-left-radius": radius[0] + "px",
                        "border-top-right-radius": radius[1] + "px",
                        "border-bottom-right-radius": radius[2] + "px",
                        "border-bottom-left-radius": radius[3] + "px"
                    }
                }
            }

            if (window.innerWidth < 768) {
                return radiusStyleList["xs"] || defaultRadiusStyle;
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                return radiusStyleList["sm"] || radiusStyleList["xs"] || defaultRadiusStyle;
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                return radiusStyleList["md"] || radiusStyleList["sm"] || radiusStyleList["xs"] || defaultRadiusStyle;
            }
            else {
                return radiusStyleList["lg"] || radiusStyleList["md"] || radiusStyleList["sm"] || radiusStyleList["xs"] || defaultRadiusStyle;
            }

        },
        getShadowStyleForColumn(columnIndex) {

            let defaultShadowStyle = {
                "-webkit-box-shadow": "none",
                "-moz-box-shadow": "none",
                "-o-shadow": "none",
                "box-shadow": "none"
            }

            let shadowStyleList = { xs: null, sm: null, md: null, lg: null };

            for (let i = 0; i < this.screenSizes.length; i++) {
                if (this.wwObject.content.data.config[this.screenSizes[i]]
                    && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex] && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].shadow) {
                    let shadow = this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].shadow;

                    let style = (shadow.x || "0") + "px " + (shadow.y || "0") + "px " + (shadow.blur || "0") + "px " + (shadow.spread || "0") + "px " + (shadow.color || "#FFFFFFC0");

                    shadowStyleList[this.screenSizes[i]] = {
                        "-webkit-box-shadow": style,
                        "-moz-box-shadow": style,
                        "-o-shadow": style,
                        "box-shadow": style,
                    }
                }
            }

            if (window.innerWidth < 768) {
                return shadowStyleList["xs"] || defaultShadowStyle;
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                return shadowStyleList["sm"] || shadowStyleList["xs"] || defaultShadowStyle;
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                return shadowStyleList["md"] || shadowStyleList["sm"] || shadowStyleList["xs"] || defaultShadowStyle;
            }
            else {
                return shadowStyleList["lg"] || shadowStyleList["md"] || shadowStyleList["sm"] || shadowStyleList["xs"] || defaultShadowStyle;
            }

        },
        getAlignSelfForColumn(columnIndex) {

            //Align : 
            //0 : default
            //1 : top
            //2 : center
            //3 : bottom

            let defaultAlign = "ww-column-align-top";

            let alignList = { xs: null, sm: null, md: null, lg: null };

            for (let i = 0; i < this.screenSizes.length; i++) {
                if (this.wwObject.content.data.config[this.screenSizes[i]]
                    && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex]) {
                    let align = this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].align
                    switch (align + "") {
                        case "1":
                            alignList[this.screenSizes[i]] = "ww-column-align-top";
                            break;
                        case "2":
                            alignList[this.screenSizes[i]] = "ww-column-align-center";
                            break;
                        case "3":
                            alignList[this.screenSizes[i]] = "ww-column-align-bottom";
                            break;
                        default:
                            break;
                    }
                }
            }

            if (window.innerWidth < 768) {
                return alignList["xs"] || defaultAlign;
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                return alignList["sm"] || alignList["xs"] || defaultAlign;
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                return alignList["md"] || alignList["sm"] || alignList["xs"] || defaultAlign;
            }
            else {
                return alignList["lg"] || alignList["md"] || alignList["sm"] || alignList["xs"] || defaultAlign;
            }

        },
        getOrderForColumn(columnIndex) {

            let defaultOrder = "0";

            let orderList = { xs: null, sm: null, md: null, lg: null };

            for (let i = 0; i < this.screenSizes.length; i++) {
                if (this.wwObject.content.data.config[this.screenSizes[i]]
                    && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex]) {
                    let order = this.wwObject.content.data.config[this.screenSizes[i]][columnIndex].order;
                    orderList[this.screenSizes[i]] = order;
                }
            }

            if (window.innerWidth < 768) {
                return orderList["xs"] || defaultOrder;
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                return orderList["sm"] || orderList["xs"] || defaultOrder;
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                return orderList["md"] || orderList["sm"] || orderList["xs"] || defaultOrder;
            }
            else {
                return orderList["lg"] || orderList["md"] || orderList["sm"] || orderList["xs"] || defaultOrder;
            }

        },
        getWidthAndOffset(columnIndex) {

            let defaulWidthAndOffset = {
                "width": "100%",
                "flex-basis": "100%",
                "margin-left": "0%"
            }

            let widthAndOffsetList = { xs: null, sm: null, md: null, lg: null };

            for (let i = 0; i < this.screenSizes.length; i++) {
                if (this.wwObject.content.data.config[this.screenSizes[i]]
                    && this.wwObject.content.data.config[this.screenSizes[i]][columnIndex]) {
                    let conf = this.wwObject.content.data.config[this.screenSizes[i]][columnIndex]
                    widthAndOffsetList[this.screenSizes[i]] = {
                        /*
                        "width": (conf.width - 0.1) + "%",
                        "flex-basis": (conf.width - 0.1) + "%",
                        "margin-left": Math.max((conf.offset - 0.1), 0) + "%"
                        */

                        "width": (conf.width) + "%",
                        "flex-basis": (conf.width) + "%",
                        "margin-left": Math.max((conf.offset), 0) + "%"
                    }
                }
            }

            if (window.innerWidth < 768) {
                return widthAndOffsetList["xs"] || defaulWidthAndOffset
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                return widthAndOffsetList["sm"] || widthAndOffsetList["xs"] || defaulWidthAndOffset
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                return widthAndOffsetList["md"] || widthAndOffsetList["sm"] || widthAndOffsetList["xs"] || defaulWidthAndOffset
            }
            else {
                return widthAndOffsetList["lg"] || widthAndOffsetList["md"] || widthAndOffsetList["sm"] || widthAndOffsetList["xs"] || defaulWidthAndOffset
            }

        },
        getRowHeight() {

            if (!this.wwObject) {
                return;
            }

            this.wwObject.content.data.config.height = this.wwObject.content.data.config.height || {};

            if (this.wwObject.content.data.config.height.value && this.wwObject.content.data.config.height.unit) {
                return {
                    'height': this.wwObject.content.data.config.height.value + this.wwObject.content.data.config.height.unit
                }
            }

            if (this.wwAttrs && this.wwAttrs.wwRowDefaultHeight) {
                let height = this.wwAttrs.wwRowDefaultHeight;
                if (window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0)) {
                    return {
                        'height': 'calc(var(--vh, 1vh) * ' + height + ')'
                    }
                }
                else {
                    return {
                        'height': height + 'vh'
                    }
                }

            }

            return {
                'height': 'auto'
            };
        },
    },
    mounted: function () {
        this.init()

        this.$emit('ww-loaded', this);

    },
    beforeDestroyed() {
        window.removeEventListener('resize', this.onResize);
    }
};
</script>

<style scoped>
.ww-row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
}

.ww-row .ww-column.ww-column-align-center .ww-column-container {
  align-self: center;
}

.ww-row .ww-column.ww-column-align-top .ww-column-container {
  align-self: flex-start;
}

.ww-row .ww-column.ww-column-align-bottom .ww-column-container {
  align-self: flex-end;
}

.ww-column {
  /*height: 100%;*/
  /*overflow: hidden;*/
  position: relative;
  display: flex;
  pointer-events: none;
}

.ww-column .ww-column-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  /*padding: 5px;*/
}

.ww-column .ww-column-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 50px;
}

.ww-column .ww-column-style {
  position: relative;
  display: flex;
  width: 100%;
}

/* wwManager:start */
.ww-column-tab {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 20px 0 0 20px;
  background-color: #d02e7c;
  z-index: 10;
  color: white;
  height: 40px;
  width: 45px;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}

.ww-editing .ww-column-tab {
  display: flex;
}
/* wwManager:end */
</style>