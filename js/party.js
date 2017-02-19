const READ_TIME = 6000;
const TRANSITION_TIME = 2000;

$( document ).ready(function() {
    $(".partyMember").on("click", function(){
        console.log("The paragraph was clicked.");
    });

	function changeSelectedMember(member) {
		var activeOffset = member.offset();
		
		$("#zebra").animate({top:activeOffset.top,
							 left: activeOffset.left,
							 width: member.outerWidth(true),
							 height: member.outerHeight(true)},
							 TRANSITION_TIME);

		if(previousPhoto){
		  $(previousPhoto).fadeOut(TRANSITION_TIME, function(){
		  $(previousPhoto).removeClass('active');});
		  $("#"+member.attr("data-name")+ "Photo").fadeIn(TRANSITION_TIME).addClass('active');
		}
		nextMember = getNextMember(member);
		setTimeout(function() 
		{
			previousPhoto = $("#"+member.attr("data-name")+ "Photo");
			changeSelectedMember(nextMember);
		}, READ_TIME);
	}

	function getNextMember(member) {
		var currentIndex = partyMembers.index(member);
		if(currentIndex+1<partyMembers.length){
			nextMember = partyMembers.eq(currentIndex+1);
		}
		else{
			nextMember = $(".partyMember").eq(0);
		}
		return nextMember;
	}

	var partyMembers = $(".partyMember");
	var activeMember = partyMembers.eq(0);
	var nextMember = "";
	var activePhoto = "";
	var previousPhoto = "";
	$("#"+activeMember.attr("data-name")+ "Photo").addClass('currentPhoto');

	var newDiv = document.createElement("div"); 

	var activeOffset = activeMember.offset();
	$(newDiv).attr("id","zebra");
	$(newDiv).css("top",activeOffset.top);
	$(newDiv).css("left",activeOffset.left);
	$(newDiv).css("width",activeMember.outerWidth(true));
	$(newDiv).css("height",activeMember.outerHeight(true));
	$(newDiv).css("position","absolute");
	$(newDiv).css("border","5px solid white");
	$(newDiv).css("z-index",9001);
	//$(newDiv).css("box-sizing","content-box");

	$("body").prepend(newDiv); 

	changeSelectedMember(activeMember);

});