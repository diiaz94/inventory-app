Ext.define('Inventory.model.Provider', {
	extend: 'Ext.data.Model',
	idProperty: "_id",
	fields: [{
		name: '_id',
		type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'updated_at',
		type: 'string'
	}, {
		name: 'created_at',
		type: 'string'
	}]
});