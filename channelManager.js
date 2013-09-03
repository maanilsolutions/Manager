/* 
	For Channel Manager Front desk booking calender plug-in
	Devloped By Anil.K
*/

// Utility
if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}


(function( $, window, document, undefined ) {

	var weekday=new Array(7);
	weekday[0]="Su";
	weekday[1]="Mo";
	weekday[2]="Tu";
	weekday[3]="We";
	weekday[4]="Th";
	weekday[5]="Fr";
	weekday[6]="Sa";

	
	var BookingCalendar = {
		init: function(options, elem){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, $.fn.bookingCalendar.options, options );


			self.top_panel();
			self.main_panel();
			
		},
		
		top_panel: function(){
			var self = this;

			self.top_panel = $("<div>", {'class':'anil','id':"top_panel"})
								.css({	'border-top':'1px solid rgb(219, 233, 250)',
										'border-bottom':'1px solid #B3B6B1',
										'background-color':'#AAA',
										'height':'36px',
										'text-align':'center'
									});
			self.top_panel.append("Welcome").appendTo(self.$elem);

			_cF = $("<span>")
					.css({'float':'right'})
					.attr({'onClick':'changeFormate("15days",\''+self.$elem[0].className+'\')'})
					.text('15days');
			self.top_panel.append(_cF, self);

		},
		
		main_panel: function(){
			var self = this;

			self.main_panel  = 	$("<div>",{'class':'kumar','id':"main_panel"})
									.css({ 'background-color':"#FFF",
											'border':'1px solid black',
											'min-height':'90px',
								});

			self.main_panel.appendTo(self.$elem);
			self.main_panel_content(self.main_panel);
			self.main_gridContainer(self.main_panel);
		},
		main_panel_content: function( mainPanel ){
			var self = this;

			self.mainPanel = mainPanel;

			_div = $("<div>",{'id':"main-table"})
					.css({'z-index':8000,'width':'100%','height':'36px',
							'background': 'url("images/bg-new.png") repeat-x scroll 0 -81px transparent'
					});


			_table = $("<table>",{'id':"main-table","width":"100%",'height':"100%",'cellspacing':0,'cellpadding':0,'border':1})
						.css({ 'border-collapse': 'collapse',
								'border-spacing': 0
						});

			_table.appendTo(_div);

			self.mainPanel.html(_div);
			
			self.setTable(_table);
		},
		main_gridContainer: function( mainPanel ){
			var self = this;

			self.mainPanel = mainPanel;

			_div = $("<div>",{'id':'grid-container'});

			_table = $("<table>",{'id':'grid-container-table',"width":"100%",'cellspacing':0,'cellpadding':0,'border':0})
						.css({ 'border-collapse': 'collapse',
								'border-spacing': 0
						});
			console.log(_table);
			_table.appendTo(_div);

			self.mainPanel.append(_div);

			self.gridTable(_table);
		},
		setTable: function(ele){
			var self = this;

			table_body = $("<tbody>");
			table_row = $("<tr>");
			self.tableData = $('<td width="15.3%" style="padding-left:5px">How to Use</td><td width="84.7%" ></td>');
			table_row.html(self.tableData);
			table_row.appendTo(table_body);
			table_body.appendTo(ele);

			// console.log(self.datesPanel[1]);
			_da = $(self.getCalendarDates());

			self.datesPanel = $("<div>",{'id':'dates','class':'wrap'})
								.css({'position':'relative','height':'36px'});

			self.datesPanel.appendTo(self.tableData[1]);

			// $(_t[1]).html($("div",{'id':'table-dates'}));
			// console.log(_da);
			_da.each(function(index,value){
				// console.log("Value::"+value+"Index::"+index);
				($("<div>", {'id':value+'-'+index,'class':'container','style':'border: 1px solid transparent;'})	
				.html(value)).appendTo(self.datesPanel);
			});

		},
		gridTable: function(ele){
			var self = this;

			table_body = $("<tbody>");
			table_row = $("<tr>");
			_gridData = $('<td width="15.3%" style="padding-left:5px"></td><td width="84.7%" ></td>');

			table_row.html(_gridData);
			table_row.appendTo(table_body);

			table_body.appendTo(ele);


			// TODO
			for(i=0;i<self.options.totalRooms;i++){

				_lP = $("<div>",{'id':'left-panel-'+i,'style':"width:100%"});
				_lP.appendTo(_gridData[0]);

				_setRoomsPanel = $("<div>",{'id':'rooms-panel'});
				_setRoomsPanel.appendTo(_lP);

				($("<div>",{'id':'room'+i,'style':"height:33px;text-align: center;border: 1px solid #AAAAAA;"}).html('Room-'+i)).appendTo(_setRoomsPanel);

				_t = $("<div>",{'id':'right-panel-'+i,'style':"width:100%"});

				_t.appendTo(_gridData[1]);			

				_setGridPanel = $("<div>",{'id':'grid-panel','class':'wrap'});
				_setGridPanel.appendTo(_t);

				_len = self.getCalendarLength();
				
				for(j=0;j<=_len;j++){
					($("<div>", {'id':'value-'+j+'-'+i,'class':'container','style':'border: 1px solid #AAAAAA;'})
					.mousedown(function(){
						$(this).addClass("selected");
						BookingCalendar.dragSelect($(this));
					})
					.mouseup(function(e){
						self.$cL.unbind('mouseover');
						$('.bg').show();
						$('.popup').show();
					})
					).appendTo(_setGridPanel);
				}
				// _da.each(function(index,value){
				// 	// console.log("Value::"+value+"Index::"+index);
				// 	($("<div>", {'id':value+'-'+index,'class':'container'})	
				// 	.html(value)).appendTo(_setGridPanel);
				// });
			}


		},
		setDates: function(ele){
			var self = this;

			// console.log(ele);
			// console.log(self.getCalendarDates());

			_t = $("div");
			// console.log(_t);
			_t.appendTo(ele);
			_da = $(self.getCalendarDates());

			// console.log(_da);
			_da.each(function(index,value){
				// console.log("Value::"+value+"Index::"+index);
				$("<div>", {'id':value+'-'+index}).text(value);
			});
			
			// console.log(_t);

			$("#"+ele.id).html("asdasd");
		},
		getCalendarDates: function(){
			var self = this;
			var	_dateArray = [];

			var _d = new Date();
			// var _endDate = new Date();
			self.endDate = new Date();

			if(self.options.calenderFormat === 'weekly'){
				self.endDate.setDate(self.endDate.getDate() + 7);
			}else if(self.options.calenderFormat === '15days'){
				self.endDate.setDate(self.endDate.getDate() + 15);
			}else{
				self.endDate.setDate(self.endDate.getDate() + 30);
			}
			
			console.log(self.endDate);

			_t = _d
			do{
				_dateArray.push(_t.getDate()+'<br>'+weekday[_t.getDay()]);
				_t.setDate(_t.getDate() + 1);
			}while(_t <= self.endDate);
			
			// console.log(_dateArray);

			return _dateArray;
		},
		getCalendarLength: function(){
			var self = this;
			
			if(self.options.calenderFormat === 'weekly'){
				return 7;	
			}else if(self.options.calenderFormat === '15days'){
				return 15;
			}else{
				return 30;
			}
		},
		dragSelect: function(e){
			var self = this;
			var _t = e.next();

			self.$cL = _t;

			_t.mouseover(function(){
				_t.unbind('mouseover');
				_t.addClass("selected");
				BookingCalendar.dragSelect(_t);
			});
		},
	};


	$.fn.bookingCalendar = function( options ) {
		return this.each(function() {
			var booking_calendar = Object.create( BookingCalendar );

			booking_calendar.init(options, this);
		});
	};

	// Options
	$.fn.bookingCalendar.options = {
		totalRooms: 1,
		limit: 10,
		calenderFormat: 'monthly',
		wrapEachWith: '<div></div>'
	};

})( jQuery, window, document );

function changeFormate(key, selector){
	$('.'+selector).empty();
	$('.'+selector).bookingCalendar({
		calenderFormat: key
	});
}