var states = Ext.create('Ext.data.Store', {
	fields: ['model', 'name'],
	data: [{
			"model": "Products",
			"name": "Productos"
		}, {
			"model": "Stores",
			"name": "Tiendas"
		}, {
			"model": "Providers",
			"name": "Proveedores"
		}
		//...
	]
});

Ext.define('Inventory.view.ComboboxEntities', {
	extend: 'Ext.Panel',
	alias: 'widget.comboboxentities',
	height: 50,
	layout: {
		type: 'hbox',
		defaultMargins: {
			top: 20,
			right: 0,
			bottom: 0,
			left: 10
		},
	},
	border: false,
	items: [{
		xtype: 'combobox',
		fieldLabel: 'Elegir entidad',
		store: states,
		queryMode: 'local',
		displayField: 'name',
		valueField: 'model',
		tpl: Ext.create('Ext.XTemplate',
			'<tpl for=".">',
			'<div class="x-boundlist-item">{name}</div>',
			'</tpl>'
		),
		// template for the content inside text field
		displayTpl: Ext.create('Ext.XTemplate',
			'<tpl for=".">',
			'{name}',
			'</tpl>'
		)
	}]
});