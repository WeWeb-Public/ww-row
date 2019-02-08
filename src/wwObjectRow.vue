<template>
    <div class="ww-row">
        <wwLayoutRow tag="div" :align="wwObject.content.data.align" :justify="wwObject.content.data.justify" ww-default="ww-button" :ww-list="wwObject.content.data.wwObjects" @ww-add="wwAdd($event)" @ww-remove="wwRemove($event)">
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
        en_GB: 'Row',
        fr_FR: 'Ligne'
    },
    type: 'wwRowStylePopup',
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
    name: "ww-columns",
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
                        en_GB: 'Configuration',
                        fr_FR: 'Configuration'
                    },
                    title: {
                        en_GB: 'Style',
                        fr_FR: 'Style'
                    },
                    desc: {
                        en_GB: 'Set items alignment',
                        fr_FR: 'Chanter l\'alignement des objets'
                    },
                    icon: 'wwi wwi-config',
                    shortcut: 'c',
                    next: 'WW_ROW_STYLE_POPUP'
                }
            }

            wwLib.wwPopups.addStory('WWCOLUMNS_EDIT', {
                title: {
                    en_GB: 'Edit Columns',
                    fr_FR: 'Editer les colonnes'
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

<style scoped lang="scss">
.ww-columns {
}
</style>

<style  lang="scss">
/* wwManager:start */
.ww-columns-hover {
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
.ww-editing {
    .ww-layout-row {
        border: 1px solid #03a9f457;
    }
}
/* wwManager:end */
</style>