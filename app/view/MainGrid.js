Ext.define('Inventory.view.MainGrid', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.grid.*',
	],
	alias: 'widget.maingrid',

	height: 330,
	items: [{
		margin: '10 0 0 0',
		xtype: 'grid',
		selType: 'checkboxmodel',
		columns: [],
		title: 'test',
		viewConfig: {
			emptyText: 'Oprime el botón crear para añadir datos',
			deferEmptyText: false
		},
		dockedItems: [{
			xtype: 'pagingtoolbar',
			dock: 'bottom',
			displayInfo: true,
			displayMsg: 'Mostrando de {0} a {1} elementos de un total de {2}',
			emptyMsg: "No hay elementos que mostrar"
		}]
	}]
});