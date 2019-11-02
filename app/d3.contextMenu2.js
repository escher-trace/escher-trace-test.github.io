d3.contextMenu = function (menu, openCallback) {

	// create the div element that will hold the context menu
	d3.selectAll('.d3-context-menu').data([1])
		.enter()
		.append('div')
		.attr('class', 'd3-context-menu');

	// close menu
	d3.select('body').on('click.d3-context-menu', function() {
		d3.select('.d3-context-menu').style('display', 'none');
	});

	// this gets executed when a contextmenu event occurs
	return function(data, index) {	
		var elm = this;

		d3.selectAll('.d3-context-menu').html('');
		var list = d3.selectAll('.d3-context-menu').append('ul');
	       	list.selectAll('li').data(menu).enter()
			.append('li')
			.html(function(d) {
				return d.title;
			})
			.on('click', function(d, i) {
				d.onMouseClick(elm, data, index);
			})
            .on('mouseenter',function(d,i){
                d.onMouseOver(elm,data,index);
                if(d.chidernItems.length>0 )
                     {
                      d3.select(this).selectAll("ul").remove(); 
                      d3.select(this)
                        .append("ul")
                        .selectAll("li")
                           .data(d.chidernItems)
                            .enter().append("li")
                              .text(function(d) { return d.title; })
                         .on("mouseenter", function(d,i){
                                d.onMouseOver(elm,data,index);
                            })
                         .on('click',  function(d, i) {
                                d.onMouseClick(elm, data, index);
                                d3.select('.d3-context-menu').style('display', 'none');

                            })
                         /*.on('mouseleave',function(d,i){
                            d3.select(this).selectAll("ul").style('display', 'none');
                            d3.select(this).remove(); 
                            })*/;
                     }
                 else
                     return false;
              
               
            })
            .on('mouseleave',function(d,i){
            if(d.chidernItems.length!=0 )
                {
                  d3.select(this).selectAll("ul").style('display', 'none');
                  d3.select(this).selectAll("ul").remove(); 
                }
                                  
            });
        
          

		// the openCallback allows an action to fire before the menu is displayed
		// an example usage would be closing a tooltip
		if (openCallback) openCallback(data, index);

		// display context menu
		d3.select('.d3-context-menu')
			.style('left', (d3.event.pageX - 2) + 'px')
			.style('top', (d3.event.pageY - 2) + 'px')
			.style('display', 'block');

		d3.event.preventDefault();
	};
};