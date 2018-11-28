import wwObject from './wwObjectRow.vue'

const name = "ww-row";

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            content: {
                type: name,
                data: {
                    config: {
                        count: 3,
                        xs: null,
                        sm: [{
                            offset: 0,
                            width: 33.33,
                            borders: []
                        }, {
                            offset: 0,
                            width: 33.33,
                            borders: []
                        }, {
                            offset: 0,
                            width: 33.33,
                            borders: []
                        }
                        ],
                        md: null,
                        lg: null
                    },
                    columns: [
                        {
                            background: null,
                            wwObjects: []
                        },
                        {
                            background: null,
                            wwObjects: []
                        },
                        {
                            background: null,
                            wwObjects: []
                        }
                    ]
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
                    hoverClass: 'ww-row-hover',
                },
                wwObjectMenu: {
                    options: [
                        {
                            name: 'WWLOAYOUTCOLUMN:ADD_BEFORE',
                            text: {
                                en_GB: 'Add before...',
                                fr_FR: 'Ajouter avant...'
                            },
                            action: 'wwLayoutColumn:add'
                        },
                        {

                        },
                    ]
                }
            }
            /* wwManager:end */
        });

        window.vm.addComponent(name, wwObject);

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