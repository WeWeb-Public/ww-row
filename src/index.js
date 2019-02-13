import wwObject from './wwObjectRow.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            content: {
                type: name,
                data: {
                    wwObjects: [],
                    align: 'center',
                    justify: 'center'
                }
            },
            upsales: {
                wwAnalytics: {
                    click: false
                }
            },
            /* wwManager:start */
            cmsOptions: {
                wwObjectHover: {
                    pluses: false,
                    hoverClass: 'ww-columns-hover',
                },
                wwObjectMenu: {
                    items: [
                        {
                            if: 'wwLayout',
                            name: 'ADD_BEFORE',
                            text: {
                                en_GB: 'Before',
                                fr_FR: 'Avant'
                            },
                            icon: 'wwi wwi-add',
                            action: 'wwLayout:addBefore'
                        },
                        {
                            if: 'wwLayout',
                            name: 'ADD_AFTER',
                            text: {
                                en_GB: 'After',
                                fr_FR: 'Après'
                            },
                            icon: 'wwi wwi-add',
                            action: 'wwLayout:addAfter'
                        },

                        {
                            name: 'OPTIONS',
                            text: {
                                en_GB: 'Options...',
                                fr_FR: 'Options...'
                            },
                            icon: 'wwi wwi-edit-other',
                            action: 'edit'
                        },


                    ]
                }
            }
            /* wwManager:end */
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}