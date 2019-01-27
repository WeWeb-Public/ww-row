<template>
    <div class="ww-row" :style="getRowHeight()">
        <!-- wwManager:start -->
        <div class="ww-column-tab">
            <span class="wwi wwi-align-right"></span>
        </div>
        <!-- wwManager:end -->
        <div class="ww-column" v-for="(column, index) in screenCols" :key="index" :style="getWidthAndOffset(column)">
            <!-- wwManager:start -->
            <div class="ww-column-preview">
                <div class="offset" :style="getOffsetStyle(column)"></div>
            </div>
            <!-- wwManager:end -->
            <wwObject class="ww-column-bg" :ww-object="getColData(index).background" ww-category="background"></wwObject>
            <wwLayoutColumn tag="div" ww-default="ww-image" :ww-list="getColData(index).wwObjects" class="ww-column-container ww-layout-column" @ww-add="wwAdd(getColData(index).wwObjects, $event)" @ww-remove="wwRemove(getColData(index).wwObjects, $event)">
                <wwObject v-for="wwObj in getColData(index).wwObjects" :key="wwObj.uniqueId" :ww-object="wwObj"></wwObject>
            </wwLayoutColumn>
        </div>
    </div>
</template>


<script>
/* wwManager:start */
import wwRowPopupLayout from './wwRowPopupLayout.vue';
wwLib.wwPopups.addPopup('wwRowPopupLayout', wwRowPopupLayout);
wwLib.wwPopups.addStory('WW_ROW_POPUP_LAYOUT', {
    title: {
        en_GB: 'Columns',
        fr_FR: 'Colonnes'
    },
    type: 'wwRowPopupLayout',
    buttons: {
        FINISH: {
            text: {
                en_GB: 'Finish',
                fr_FR: 'Terminer'
            },
            next: false
        }
    }
});
/* wwManager:end */


export default {
    name: "ww-row",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: Object
    },
    data() {
        return {
            screens: ['xs', 'sm', 'md', 'lg'],
            screen: 'xs',

            defaultBorders: [
                {
                    color: "#000000",
                    style: "solid",
                    width: 0
                },
                {
                    color: "#000000",
                    style: "solid",
                    width: 0
                },
                {
                    color: "#000000",
                    style: "solid",
                    width: 0
                },
                {
                    color: "#000000",
                    style: "solid",
                    width: 0
                }
            ],

            defaultRadius: [0, 0, 0, 0],

            defaultShadow: {
                x: 0,
                y: 0,
                blur: 0,
                spread: 0,
                color: '#000000'
            },

            aligns: ['center', 'flex-start', 'center', 'flex-end'],
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        screenCols() {
            let screen = this.screen;

            while (!this.wwObject.content.data.config[screen] || this.wwObject.content.data.config[screen].ignore) {
                screen = this.getScreenFromIndex(this.getIndexFromScreen(screen) - 1);
            }

            return this.wwObject.content.data.config[screen].cols;
        }
    },
    watch: {
    },
    methods: {
        init: function () {
            window.addEventListener('resize', this.onResize);
        },

        onResize() {
            this.setScreenSize();
        },

        setScreenSize() {
            let newScreen = 'xs'

            if (window.innerWidth < 768) {
                newScreen = 'xs';
            }
            else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                newScreen = 'sm';
            }
            else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                newScreen = 'md';
            }
            else {
                newScreen = 'lg';
            }
            if (this.screen != newScreen) {
                this.screen = newScreen;
            }
        },

        correctConfigs() {
            let config = this.wwObject.content.data.config;
            config.count = config.count || 1;
            config.height = config.height || null;

            for (let screen of this.screens) {
                if (!config[screen]) {
                    config[screen] = {
                        ignore: true,
                        cols: []
                    };
                }

                if (config[screen][0]) {
                    config[screen] = {
                        cols: config[screen]
                    }
                }

                if (!config[screen].ignore) {
                    let cols = [];
                    for (let i = 0; i < config.count; i++) {
                        let confCols = config[screen].cols;

                        if (confCols.length > i) {
                            confCols[i].align = confCols[i].align || "1";
                            confCols[i].width = confCols[i].width || 100 / config.count;
                            confCols[i].offset = confCols[i].offset || 0;
                            // confCols[i].borders = confCols[i].borders || JSON.parse(JSON.stringify(this.defaultBorders));
                            // confCols[i].radius = confCols[i].radius || JSON.parse(JSON.stringify(this.defaultRadius));
                            // confCols[i].shadow = confCols[i].shadow || JSON.parse(JSON.stringify(this.defaultShadow));

                            cols.push(confCols[i]);
                        }
                        else {
                            cols.push({
                                align: "1",
                                width: 100 / config.count,
                                offset: 0,
                                // borders: JSON.parse(JSON.stringify(this.defaultBorders)),
                                // radius: JSON.parse(JSON.stringify(this.defaultRadius)),
                                // shadow: JSON.parse(JSON.stringify(this.defaultShadow))
                            })
                        }
                    }

                    config[screen].cols = cols;
                }
            }

            let colData = [];
            this.wwObject.content.data.columns = this.wwObject.content.data.columns || [];
            for (let i = 0; i < config.count; i++) {
                if (this.wwObject.content.data.columns[i]) {
                    colData[i] = this.wwObject.content.data.columns[i];
                    if (!colData[i].background) {
                        colData[i].background = wwLib.wwObject.getDefault({ type: 'ww-color' });
                    }
                }
                else {
                    colData[i] = {
                        wwObjects: [],
                        background: wwLib.wwObject.getDefault({ type: 'ww-color' })
                    }
                }
            }
            console.log(colData);
            this.wwObject.content.data.columns = colData;

            this.wwObjectCtrl.update(this.wwObject);
        },

        getColData(index) {
            return this.wwObject.content.data.columns[index];
        },

        wwAdd(list, options) {
            list.splice(options.index, 0, options.wwObject);
            this.wwObjectCtrl.update(this.wwObject);
        },
        wwRemove(list, options) {
            list.splice(options.index, 1);
            this.wwObjectCtrl.update(this.wwObject);
        },
        /*=============================================m_ÔÔ_m=============================================\
          STYLE FUNCTIONS
        \================================================================================================*/
        getWidthAndOffset(column) {
            let style = {
                marginLeft: (column.offset || 0) + '%',
                flexBasis: (column.width || 0) + '%',
                alignItems: this.aligns[column.align || 0],
                display: column.hide ? 'none' : 'flex'
            }
            return style;
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
                'height': 'auto',
                'min-height': '60px'
            };
        },

        /* wwManager:start */
        getOffsetStyle(column) {
            let width = column.offset / column.width * 100;
            return {
                width: width + '%',
                backgroundColor: width ? '#03a9f410' : 'transparent'
            }
        },
        /* wwManager:end */

        /*=============================================m_ÔÔ_m=============================================\
          UTILS
        \================================================================================================*/
        getScreenFromIndex(index) {
            index = Math.min(3, Math.max(0, index));
            return this.screens[index];
        },

        getIndexFromScreen(screen) {
            return Math.max(this.screens.indexOf(screen), 0);
        },

        /* wwManager:start */
        async editColumns() {


            const options = {
                firstPage: 'WW_ROW_POPUP_LAYOUT',
                data: {
                    wwObject: this.wwObject
                }
            }

            try {
                const result = await wwLib.wwPopups.open(options)

                if (result.wwRowConfig) {
                    this.wwObject.content.data.config = result.wwRowConfig;
                    this.wwObjectCtrl.update(this.wwObject);
                }
            } catch (error) {

                console.log('ERROR', result);
            }

        },

        async edit() {
            wwLib.wwObjectHover.setLock(this);

            let editList = {
                LAYOUT: {
                    separator: {
                        en_GB: 'Configuration',
                        fr_FR: 'Configuration'
                    },
                    title: {
                        en_GB: 'Layout',
                        fr_FR: 'Disposition'
                    },
                    desc: {
                        en_GB: 'Set columns count, sizes, ...',
                        fr_FR: 'Changer le nombre de colonnes, leurs tailles, ...'
                    },
                    icon: 'wwi wwi-config',
                    shortcut: 'c',
                    next: 'WW_ROW_POPUP_LAYOUT'
                },
                EDIT_ANIM: {
                    separator: {
                        en_GB: 'Interaction',
                        fr_FR: 'Interaction'
                    },
                    title: {
                        en_GB: 'Animation',
                        fr_FR: 'Animation'
                    },
                    desc: {
                        en_GB: 'Change animation',
                        fr_FR: 'Choisir l\'animation à l\'apparition de l\'image'
                    },
                    icon: 'wwi wwi-anim',
                    shortcut: 'a',
                    next: 'ANIMATION'
                },
                EDIT_HIDE: {
                    separator: {
                        en_GB: 'More',
                        fr_FR: 'Plus'
                    },
                    title: {
                        en_GB: 'Show / Hide',
                        fr_FR: 'Montrer / Cacher'
                    },
                    icon: 'wwi wwi-hidden',
                    shortcut: 'h',
                    next: null,
                    result: {
                        hidden: true
                    }
                },
                EDIT_CHANGE: {
                    title: {
                        en_GB: 'Change object type',
                        fr_FR: 'Changer le type d\'objet'
                    },
                    icon: 'wwi wwi-switch',
                    shortcut: 't',
                    next: 'SELECT_WWOBJECT'
                },
            }

            wwLib.wwPopups.addStory('WWROW_EDIT', {
                title: {
                    en_GB: 'Edit Row',
                    fr_FR: 'Editer les colonnes'
                },
                type: 'wwPopupList',
                buttons: null,
                storyData: {
                    list: editList
                }
            })

            let options = {
                firstPage: 'WWROW_EDIT',
                data: {
                    wwObject: this.wwObject
                }
            }

            try {
                const result = await wwLib.wwPopups.open(options);

                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof (result.wwRowConfig) != 'undefined') {
                    this.wwObject.content.data.config = result.wwRowConfig;
                }

                this.wwObjectCtrl.update(this.wwObject);

                this.wwObjectCtrl.globalEdit(result);

                console.log(this.wwObject)

            } catch (error) {
                console.log(error);
            }

            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    created() {
        this.correctConfigs();
        this.setScreenSize();
    },
    mounted() {
        this.init();
        this.$emit('ww-loaded', this);
    },
    beforeDestroyed() {
        window.removeEventListener('resize', this.onResize);
    }
};
</script>

<style scoped lang="scss">
.ww-row {
    display: flex;
    flex-wrap: wrap;
    position: relative;
}

.ww-column {
    position: relative;
    display: flex;
    pointer-events: none;
}

.ww-column .ww-column-container {
    width: 100%;
    position: relative;
    /*overflow: hidden;*/
    /*padding: 5px;*/
}

.ww-column .ww-column-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 60px;
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
    top: 10px;
    right: 0;
    border-radius: 20px 0 0 20px;
    background-color: #d02e7c;
    z-index: 51;
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

.ww-column-preview {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 50;
    pointer-events: none;
    border-right: 1px solid #03a9f457;

    .offset {
        position: absolute;
        right: 100%;
        height: 100%;
        top: 0;
        border-right: 1px solid #03a9f457;
    }
}
.ww-editing .ww-column-preview {
    display: block;
}
/* 
.ww-columns-preview {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 50;
    pointer-events: none;
    flex-wrap: wrap;
}

.ww-column-preview + .ww-column-preview {
    border-left: 1px solid #03a9f457;
}
.ww-column-preview.margin {
    background-color: #03a9f410;
}
.ww-editing .ww-columns-preview {
    display: flex;
} */
/* wwManager:end */
</style>

<style>
/* wwManager:start */
.ww-row-hover {
    background-color: #2ec6ba30;
    background: repeating-linear-gradient(
        -45deg,
        #2ec6ba30,
        #2ec6ba30 10px,
        #2ec6ba50 10px,
        #2ec6ba50 11px
    );
    border-width: 5px !important;
}
/* wwManager:end */
</style>