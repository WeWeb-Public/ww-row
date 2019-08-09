<template>
    <div class="ww-popup-style">
        <div class="content">
            <div class="preview">
                <div class="image">
                    <wwObject class="preview-image" :ww-object="wwObject" ww-no-section="true" ww-force-edit-mode="CONTENT" ww-no-anim="true" ww-no-link="true"></wwObject>
                </div>
            </div>
            <div class="options">
                <div class="title">Vertical Align</div>
                <wwManagerSelect class="option" :options="alignOptions" :value="props.align" @change="setProp('align', $event)"></wwManagerSelect>
                <div class="title">Horizontal Align</div>
                <wwManagerSelect class="option" :options="justifyOptions" :value="props.justify" @change="setProp('justify', $event)"></wwManagerSelect>
                <div class="title">Wrap</div>
                <wwManagerSelect class="option" :options="wrapOptions" :value="props.wrap" @change="setProp('wrap', $event)"></wwManagerSelect>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "wwRowStylePopup",
    props: {
        options: {
            type: Object,
            default: function () {
                return {}
            }
        },
    },
    data() {
        return {
            wwObject: this.options.data.wwObject,

            alignOptions: {
                type: 'text',
                values: [
                    {
                        value: 'flex-start',
                        text: {
                            en: 'Top',
                            fr: 'Haut'
                        }
                    },
                    {
                        value: 'center',
                        default: true,
                        text: {
                            en: 'Center',
                            fr: 'Centrer'
                        }
                    },
                    {
                        value: 'flex-end',
                        text: {
                            en: 'Bottom',
                            fr: 'Bas'
                        }
                    }
                ]
            },

            justifyOptions: {
                type: 'text',
                values: [
                    {
                        value: 'flex-start',
                        text: {
                            en: 'Start',
                            fr: 'Début'
                        }
                    },
                    {
                        value: 'center',
                        default: true,
                        text: {
                            en: 'Center',
                            fr: 'Centrer'
                        }
                    },
                    {
                        value: 'flex-end',
                        text: {
                            en: 'End',
                            fr: 'Fin'
                        }
                    },
                    {
                        value: 'space-between',
                        text: {
                            en: 'Space between',
                            fr: 'Espaces entre'
                        }
                    },
                    {
                        value: 'space-around',
                        text: {
                            en: 'Space around',
                            fr: 'Espaces autour'
                        }
                    },
                    {
                        value: 'space-evenly',
                        text: {
                            en: 'Space evenly',
                            fr: 'Espaces égaux'
                        }
                    }
                ]
            },

            wrapOptions: {
                type: 'text',
                values: [
                    {
                        value: 'nowrap',
                        default: true,
                        text: {
                            en: 'No wrap',
                            fr: 'Pas de retour à la ligne'
                        }
                    },
                    {
                        value: 'wrap',
                        text: {
                            en: 'Wrap',
                            fr: 'Retour à la ligne'
                        }
                    }
                ]
            },



            /*=============================================m_ÔÔ_m=============================================\
              PROPS
            \================================================================================================*/
            props: {
                align: 'center',
                justify: 'center',
                wrap: 'nowrap'
            }
        };
    },
    computed: {
    },
    watch: {
    },
    methods: {
        init() {
            this.props.align = this.options.data.wwObject.data.align;
            this.props.justify = this.options.data.wwObject.data.justify;
            this.props.wrap = this.options.data.wwObject.data.wrap;

            this.setResult();
        },
        setResult() {
            for (const key in this.props) {
                this.options.result[key] = this.props[key];
            }
        },


        /*=============================================m_ÔÔ_m=============================================\
          PROPS
        \================================================================================================*/
        updateWwObject() {
            if (this.$el.querySelector('.preview-image') && this.$el.querySelector('.preview-image').wwObjectCtrl) {
                this.$el.querySelector('.preview-image').wwObjectCtrl.update(this.options.data.wwObject);
            }
            this.setResult();
        },
        setProp(key, value) {
            this.props[key] = value;
            this.options.data.wwObject.data[key] = value;

            this.updateWwObject();
            this.$forceUpdate();
        }

    },
    mounted: function () {
        this.init()
    },
    created() {
        this.options.data.wwObject.uniqueId = wwLib.wwUtils.getUniqueId();

        for (let key in this.props) {
            this.props[key] = this.options.data.wwObject.data[key] || this.props[key];
        }
    },
    beforeDestroy() {

    }
};
</script>

<style scoped lang="scss">
$ww-red: #e02a4d;
$ww-font: "Monserrat", sans-serif;

.ww-popup-style {
    .content {
        display: flex;
        padding: 20px;
        flex-direction: column;
        overflow: auto;
        min-height: 100%;

        @media (min-width: 992px) {
            flex-direction: row;
        }

        .preview {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #e4e4e4;
            padding: 10px;

            @media (min-width: 992px) {
                flex-basis: 50%;
            }

            .image {
                width: 100%;
                border: 1px solid #c1c1c1;
            }
        }

        .options {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 50px 0;

            @media (min-width: 992px) {
                flex-basis: 50%;
                padding: 0 15px;
                align-items: initial;
            }

            .title {
                color: $ww-red;
                font-family: $ww-font;
                font-size: 1.2rem;
                text-transform: uppercase;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .option {
                width: 80%;
                display: flex;
                flex-direction: column;

                @media (min-width: 992px) {
                    width: 350px;
                }

                .option-row {
                    display: flex;
                    align-items: center;

                    .slider {
                        flex-basis: 80%;

                        @media (min-width: 992px) {
                            flex-basis: 250px;
                        }
                    }

                    .value {
                        padding-left: 10px;
                        font-size: 1.2rem;
                        font-family: $ww-font;
                        flex-grow: 1;
                        text-align: right;
                        white-space: nowrap;
                    }

                    & + .option-row {
                        margin-top: 15px;
                    }

                    .border-style {
                        flex-grow: 1;
                    }

                    .border-color {
                        margin: 0 0 0 15px;
                    }
                }
            }

            .option + .title {
                margin-top: 25px;
            }
        }
    }
}
</style>
