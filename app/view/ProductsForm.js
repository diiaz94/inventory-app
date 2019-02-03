Ext.define('Inventory.view.ProductsForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.productsform',

	height: 150,
	width: 300,
	layout: 'fit',
	title: 'Editar/Crear Productos',
	autoShow: true,
	bodyBorder: false,
	items: [{
		xtype: 'form',
		bodyPadding: 10,
		bodyBorder: false,
		border: false,
		defaults: {
			anchor: '100%'
		},
		items: [{
			xtype: 'textfield',
			name: 'name',
			fieldLabel: 'Nombre'
		}]
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
			text: 'Guardar'
		}]
	}]
});