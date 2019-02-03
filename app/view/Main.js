Ext.define('Inventory.view.Main', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.ux.layout.Center',
        'Inventory.view.ComboboxEntities',
        'Inventory.view.ActionsGrid',
        'Inventory.view.MainGrid',

    ],
    xtype: 'app-main',
    layout: 'ux.center',
    border: false,
    items: [{
        xtype: 'panel',
        width: '80%',
        border: false,
        items: [{
            xtype: 'comboboxentities',
        }, {
            xtype: 'actionsgrid',
        }, {
            xtype: 'maingrid'
        }]
    }]
});