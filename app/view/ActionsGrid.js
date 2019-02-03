Ext.define('Inventory.view.ActionsGrid', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.form.field.ComboBox'
	],
	alias: 'widget.actionsgrid',
	height: 50,
	layout: {
		type: 'hbox',
		defaultMargins: {
			top: 10,
			right: 10,
			bottom: 0,
			left: 10
		},
		pack: 'end'
	},
	hidden: true,
	border: false,
	items: [{
		xtype: 'button',
		text: 'Crear',
		itemId: 'add'
	}, {
		xtype: 'button',
		text: 'Editar',
		itemId: 'update',
		hidden: true,
	}, {
		xtype: 'button',
		text: 'Eliminar',
		itemId: 'delete',
		hidden: true,
	}]
});