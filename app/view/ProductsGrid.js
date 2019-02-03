Ext.define('Inventory.view.ProductsGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.productsgrid',

	store: 'Inventory.store.Products',
	title: 'Productos',

	columns: [{
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

	dockedItems: [{
		xtype: 'pagingtoolbar',
		store: 'Inventory.store.Products',
		dock: 'bottom',
		displayInfo: true,
		emptyMsg: "No hay productos que mostrar"
	}]

});