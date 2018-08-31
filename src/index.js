import wwObject from './wwObject.vue'

const name = "ww-row";
const wwEnableMetrics = false;

const addComponent = function () {
    if (window.vm) {
        window.vm.addComponent(name, wwObject);

        wwLib.wwObject.registerContentType(
            name,
            {
                type: name,
                data: {
                    config: {
                        count: 3,
                        xs: null,
                        sm: [{
                            offset: 1,
                            width: 3,
                            borders: [
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                            ]
                        }, {
                            offset: 0,
                            width: 4,
                            borders: [
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                            ]
                        }, {
                            offset: 2,
                            width: 2,
                            borders: [
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                                {
                                    width: 1,
                                    color: "#000000",
                                    style: "solid"
                                },
                            ]
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
            wwEnableMetrics
        );

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