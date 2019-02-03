Ext.define('Inventory.view.MainForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.mainform',

	height: 150,
	width: 300,
	layout: 'fit',
	title: '',
	autoShow: true,
	bodyBorder: false,
	items: [{
		xtype: 'form',
		bodyPadding: 10,
		bodyBorder: false,
		border: false,
		defaults: {
			anchor: '100%'
		}
	}],

	dockedItems: [{
		xtye: "toolbar",
		dock: 'bottom',
		border: false,
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		items: [{
			xtype: 'button',
			text: 'Cancelar',
			itemId: 'cancel'
		}, {
			xtype: 'button',
			text: 'Guardar',
			itemId: 'save'
		}]
	}]
});