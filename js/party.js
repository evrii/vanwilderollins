const READ_TIME = 6000;
const TRANSITION_TIME = 2000;

$( document ).ready(function() {
    $(".partyMember").on("click", function(){
		window.clearTimeout(currentTimeout);
		previousPhoto = $("#partyGallery .currentPhoto");
		changeSelectedMember($(this));
    });
	
	$(window).on('resize', function(){
		activeOffset = activeMember.offset();
		$("#zebra").animate({top:activeOffset.top,
							 left: activeOffset.left,
							 width: activeMember.outerWidth(true),
							 height: activeMember.outerHeight(true)},
							 TRANSITION_TIME/2);
	});

	function changeSelectedMember(member) {
		activeMember = member;
		activeOffset = activeMember.offset();
		window.scrollTo(0, activeOffset.top);
		$("window").animate({ scrollTop: activeOffset.top - 500 }, 100000, "swing");
		$("#zebra").animate({top:activeOffset.top,
							 left: activeOffset.left,
							 width: activeMember.outerWidth(true),
							 height: activeMember.outerHeight(true)},
							 TRANSITION_TIME);
		window.scrollTo(0, activeOffset.top - 500);
		if(previousPhoto){
		  $(previousPhoto).fadeOut(TRANSITION_TIME, function(){
		  $(previousPhoto).removeClass('currentPhoto');});
		  $("#"+activeMember.attr("data-name")+ "Photo").fadeIn(TRANSITION_TIME).addClass('currentPhoto');
		}
		nextMember = getNextMember(activeMember);
		currentTimeout = setTimeout(function() 
		{
			previousPhoto = $("#"+activeMember.attr("data-name")+ "Photo");
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
	var currentTimeout = -1;
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