const INITIAL_ENTITY = "Products";
const ModelsGridConfig = {
	Products: [{
		text: 'Identificador',
		width: 100,
		dataIndex: '_id',
		flex: 1
	}, {
		text: 'Nombre',
		width: 300,
		dataIndex: 'name',
		flex: 1
	}],
	Providers: [{
		text: 'Identificador',
		width: 100,
		dataIndex: '_id',
		flex: 1
	}, {
		text: 'Nombre',
		width: 300,
		dataIndex: 'name',
		flex: 1
	}],
	Stores: [{
		text: 'Identificador',
		width: 100,
		dataIndex: '_id',
		flex: 1
	}, {
		text: 'Nombre',
		width: 300,
		dataIndex: 'name',
		flex: 1
	}, {
		text: 'Dirección',
		width: 300,
		dataIndex: 'address',
		flex: 1
	}]
}

Ext.define('Inventory.controller.Main', {
	extend: 'Ext.app.Controller',

	models: [
		// TODO: add models here
		'Inventory.model.Product',
		'Inventory.model.Provider',
		'Inventory.model.Store'
	],

	stores: [
		// TODO: add stores here
		'Inventory.store.Products',
		'Inventory.store.Providers',
		'Inventory.store.Stores'
	],

	views: [
		// TODO: add view here
		'Inventory.view.MainGrid',
		'Inventory.view.ProductsForm'
	],

	init: function(application) {
		this.control({
			"combobox": {
				render: this.onComboboxRender,
				change: this.onSelectEntity
			},
			"grid": {
				selectionchange: this.onSelectionGridChange
			},
			"actionsgrid button#add": {
				click: this.onAddClick
			}
		});
	},
	onComboboxRender: function(el, eOpts) {
		el.setValue(INITIAL_ENTITY);
		Ext.ComponentQuery.query('actionsgrid')[0].setVisible(true); //show action buttons
	},
	onSelectEntity: function(el, newValue, oldValue, eOpts) {

		var grid = Ext.ComponentQuery.query('maingrid grid')[0];
		var combobox = Ext.ComponentQuery.query("combobox")[0];
		var pager = Ext.ComponentQuery.query('pagingtoolbar')[0];

		Ext.suspendLayouts();
		grid.setTitle(combobox.getDisplayValue());
		var store = new Ext.create('Inventory.store.' + combobox.getValue());
		pager.bind(store);
		grid.reconfigure(store, ModelsGridConfig[combobox.getValue()]);
		store.load();
		Ext.resumeLayouts(true);
	},
	onSelectionGridChange: function(el, selected, eOpts) {
		var addBtn = Ext.ComponentQuery.query('actionsgrid #add')[0];
		var updateBtn = Ext.ComponentQuery.query('actionsgrid #update')[0];
		var deleteBtn = Ext.ComponentQuery.query('actionsgrid #delete')[0];
		addBtn.setVisible(selected.length == 0);
		updateBtn.setVisible(selected.length == 1);
		deleteBtn.setVisible(selected.length > 0);


	},
	onAddClick: function(btn, e, eOpts) {
		console.log("clicked");
		Ext.create('Inventory.view.ProductsForm');
	},

	hideActions: function() {
		Ext.ComponentQuery.query('actionsgrid #add')[0].setVisible(false);
		Ext.ComponentQuery.query('actionsgrid #update')[0].setVisible(false);
	},
	showActions: function() {
		Ext.ComponentQuery.query('actionsgrid #add')[0].setVisible(true);
		Ext.ComponentQuery.query('actionsgrid #update')[0].setVisible(true);
	}
});