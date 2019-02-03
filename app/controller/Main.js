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

const FieldsFormConfig = {
	Products: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: 'Nombre'
	}],
	Providers: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: 'Nombre'
	}],
	Stores: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: 'Nombre'
	}, {
		xtype: 'textfield',
		name: 'address',
		fieldLabel: 'Dirección'
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
		'Inventory.view.MainForm'
	],

	init: function(application) {
		this.control({
			"comboboxentities combobox": {
				render: this.onComboboxRender,
				change: this.onSelectEntity
			},
			"maingrid grid": {
				selectionchange: this.onSelectionGridChange
			},
			"actionsgrid button#add": {
				click: this.onAddClick
			},
			"actionsgrid button#edit": {
				click: this.onEditClick
			},
			"actionsgrid button#delete": {
				click: this.onDeleteClick
			},
			"mainform button#cancel": {
				click: this.onCancelClick
			},
			"mainform button#save": {
				click: this.onSaveClick
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
		var updateBtn = Ext.ComponentQuery.query('actionsgrid #edit')[0];
		var deleteBtn = Ext.ComponentQuery.query('actionsgrid #delete')[0];
		addBtn.setVisible(selected.length == 0);
		updateBtn.setVisible(selected.length == 1);
		deleteBtn.setVisible(selected.length > 0);
	},
	onAddClick: function(btn, e, eOpts) {
		var combobox = Ext.ComponentQuery.query("combobox")[0];
		var win = Ext.create('Inventory.view.MainForm');
		win.setTitle("Crear nuevo registro");
		var form = win.down('form');
		FieldsFormConfig[combobox.getValue()].forEach(function(element) {
			form.add(element);
		});
	},
	onEditClick: function(btn, e, eOpts) {
		var combobox = Ext.ComponentQuery.query("combobox")[0];
		var win = Ext.create('Inventory.view.MainForm');
		win.setTitle("Editar registro");
		var grid = Ext.ComponentQuery.query('maingrid grid')[0];
		var record = grid.getSelectionModel().getLastSelected();
		var form = win.down('form');
		FieldsFormConfig[combobox.getValue()].forEach(function(element) {
			form.add(element);
		});
		form.loadRecord(record);
	},
	onDeleteClick: function(btn, e, eOpts) {
		Ext.Msg.show({
			title: 'Confirmación',
			msg: '¿Estás seguro/a que quieres eliminar los elementos seleccionados?',
			buttonText: {
				yes: "Si",
				no: "No",
				cancel: "Cancelar"
			},
			icon: Ext.Msg.QUESTION,
			fn: function(r) {
				if (r == "yes") {
					var grid = Ext.ComponentQuery.query('maingrid grid')[0];
					var records = grid.getSelectionModel().getSelection();
					var store = grid.getStore();
					var goToPreviusPage = records.length == grid.getSelectionModel().getRowsVisible();
					store.remove(records);
					store.sync();
					if (goToPreviusPage) {
						store.previousPage();
					}
				}
			}
		});
	},
	onCancelClick: function(btn, e, eOpts) {
		var win = btn.up('window');
		var form = win.down('form');
		form.getForm().reset();
		win.close();
	},
	onSaveClick: function(btn, e, eOpts) {
		var grid = Ext.ComponentQuery.query('maingrid grid')[0];
		var pager = grid.down('pagingtoolbar');
		var store = grid.getStore();
		var win = btn.up('window');
		var form = win.down('form');

		var record = form.getRecord();
		if (record) {
			record.set(form.getValues());
		} else {
			var record = Ext.create(store.model.$className, form.getValues());
			store.insert(0, record);

		}
		store.sync();
		form.getForm().reset();
		win.close();
	}

});