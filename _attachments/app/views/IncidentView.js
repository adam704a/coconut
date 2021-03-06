window.IncidentView = Backbone.View.extend({
	el: $("#recordView"),
	template: loadTemplate("patient.template.html"),
	initialize: function() {
//		$("#homePageView").remove();
//		$("#formRenderingView").remove();
//		$("#views").append("<div id=\"recordView\"></div>");
		_.bindAll(this, "render", "addOne");
		return this;
	},
	render: function() {
		//console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		if (window.orientation == -90) {
			this.orientation = "vert";
			this.template =  loadTemplate("patient.vert.template.html");
		} else {
			//this.orientation = "horiz";
			this.template =  loadTemplate("patient.vert.template.html");
			//this.template =  loadTemplate("home.template.html");
		}
		thisHtml = this.template(this.model.toJSON());
		//$(this.el).html(thisHtml);
		$("#recordView").html(thisHtml);
		FORMY.sessionRecord.records.each(this.addOne);
		console.log("sessionRecord: " + JSON.stringify(FORMY.sessionRecord));
		return this;
	},
	addOne : function(record){
		//console.log("add one in recordView:" + JSON.stringify(record));
		this.view = new RecordListItemView({model: record});
		this.rendered = this.view.render().el;
		//$(this.$("#records")).append(this.rendered);	
		$("#records").append(this.rendered);
	},
	events: {
//		"click #form-client " : "clientLink",
//		"click #form-home " : "homeLink",
//		"click #form-docket " : "docketLink",
	},
	clientLink: function() {
		FORMY.router.navigate('newPatient', true);
	},
	homeLink: function() {
		FORMY.router.navigate('home', true);
	},
	docketLink: function() {
		//arrestDocket/{{_id}}
		FORMY.router.navigate('arrestDocket/' + FORMY.sessionRecord.get("_id"), true);
	},
});

var RecordListItemView = Backbone.View.extend({
	tagName : "tr",
	template: Handlebars.compile($("#record-template").html()),
	initialize : function(){
	},

	render : function(){ 
		var content = this.model.toJSON();
		var html = this.template(content);
		$(this.el).html(html);
		console.log("render RecordListItemView: "+ JSON.stringify(content));
		return this;
	}
});
