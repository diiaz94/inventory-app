Ext.define('Inventory.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Inventory.view.Main'
    ],

    items: [{
        xtype: 'app-main'
    }]
});