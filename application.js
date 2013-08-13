/* 
 * What are the objects in this exercise?
 * What are their properties and methods?
 * How do your objects interact with their respective DOM elements?
 */
$(function(){
	var groceryList = new List();
	$("#store_list .item").draggable({
		helper: "clone"
	});
	$("#grocery_list").droppable({
		drop: function( event, ui ) {
			var draggable_name = ui.draggable.find(".item_name").text();
			var draggable_price = ui.draggable.find(".item_price").text();
			var newItem = new ListItem(draggable_name, draggable_price);
			groceryList.addItem(newItem);
			groceryList.computeTotal();
			groceryList.renderList();
		}
	});
});

function ListItem(name, price) {
 	this.name = name;
	this.price = price;
}

ListItem.prototype = {
	renderItem: function(){
		this.domElement = $("<tr class='item'></tr>");
		var item_name = '<td class="item_name">' + this.name + '</td>';
		var item_price = '<td class="item_price">' + this.price + '</td>';
		this.domElement.append(item_name);
		this.domElement.append(item_price);
	}
}

function List(){
  this.listItems = []; 
  this.total = 0;
}

List.prototype = {
	computeTotal: function(){
		var total = 0;
		$.each(this.listItems, function(index,listItem){
			total += parseFloat(listItem.price);
		});
		this.total = total.toFixed(2);
	},
  addItem: function(item){
	  this.listItems.push(item);
  },
  renderList: function(){
  	$('.ui-draggable-dragging').remove();
  	$("#grocery_list").find('.item').remove();
  	$.each(this.listItems, function(index,listItem){
  		listItem.renderItem();
  		$("#grocery_list").find('tbody').append(listItem.domElement);
  	}); 
  	$('#total_cost').text(this.total);
  }
}