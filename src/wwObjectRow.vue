<template>
    <div class="ww-row">
        <!-- wwManager:start -->
        <div class="borders"></div>
        <!-- wwManager:end -->
        <wwLayoutRow tag="div" :align="wwObject.content.data.align" :wrap="wwObject.content.data.wrap" :justify="wwObject.content.data.justify" ww-default="ww-button" :ww-list="wwObject.content.data.wwObjects" @ww-add="wwAdd($event)" @ww-remove="wwRemove($event)">
            <wwObject v-for="wwObj in wwObject.content.data.wwObjects" :key="wwObj.uniqueId" :ww-object="wwObj"></wwObject>
        </wwLayoutRow>
    </div>
</template>


<script>
/* wwManager:start */
import wwRowStylePopup from './wwRowStylePopup.vue';
wwLib.wwPopups.addPopup('wwRowStylePopup', wwRowStylePopup);
wwLib.wwPopups.addStory('WW_ROW_STYLE_POPUP', {
    title: {
        en: 'Row',
        fr: 'Ligne'
    },
    type: 'wwRowStylePopup',
    buttons: {
        FINISH: {
            text: {
                en: 'Finish',
                fr: 'Terminer'
            },
            next: false
        }
    }
});
/* wwManager:end */

export default {
    name: "__COMPONENT_NAME__",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: Object
    },
    data() {
        return {
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        }
    },
    watch: {
    },
    methods: {
        init() {
        },


        wwAdd(options) {
            this.wwObject.content.data.wwObjects.splice(options.index, 0, options.wwObject);
            this.wwObjectCtrl.update(this.wwObject);
        },
        wwRemove(options) {
            this.wwObject.content.data.wwObjects.splice(options.index, 1);
            this.wwObjectCtrl.update(this.wwObject);
        },

        /* wwManager:start */
        async edit() {
            wwLib.wwObjectHover.setLock(this);

            let editList = {
                STYLE: {
                    separator: {
                        en: 'Configuration',
                        fr: 'Configuration'
                    },
                    title: {
                        en: 'Style',
                        fr: 'Style'
                    },
                    desc: {
                        en: 'Set items alignment',
                        fr: 'Chanter l\'alignement des objets'
                    },
                    icon: 'wwi wwi-config',
                    shortcut: 'c',
                    next: 'WW_ROW_STYLE_POPUP'
                }
            }

            wwLib.wwPopups.addStory('WWCOLUMNS_EDIT', {
                title: {
                    en: 'Edit Columns',
                    fr: 'Editer les colonnes'
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: editList
                }
            })

            let options = {
                firstPage: 'WWCOLUMNS_EDIT',
                data: {
                    wwObject: _.cloneDeep(this.wwObject)
                }
            }

            try {
                const result = await wwLib.wwPopups.open(options);

                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof (result.align) != 'undefined') {
                    this.wwObject.content.data.align = result.align;
                }
                if (typeof (result.justify) != 'undefined') {
                    this.wwObject.content.data.justify = result.justify;
                }
                if (typeof (result.wrap) != 'undefined') {
                    this.wwObject.content.data.wrap = result.wrap;
                }

                this.wwObjectCtrl.update(this.wwObject);

                this.wwObjectCtrl.globalEdit(result);

            } catch (error) {
                console.log(error);
            }

            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    created() {
    },
    mounted() {
        this.init();
    },
    beforeDestroyed() {
    }
};
</script>


<style  lang="scss">
.ww-row {
    position: relative;
}

/* wwManager:start */
.borders {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #03a9f457;
}

.ww-edit-mode-content {
    .borders {
        display: block;
    }
}
/* wwManager:end */
</style>