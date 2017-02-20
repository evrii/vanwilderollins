const READ_TIME = 6000;
const TRANSITION_TIME = 2000;
const BUTTON_PADDING  = 15;

$( document ).ready(function() {
    $(".partyMember").on("click", function(){
		window.clearTimeout(currentTimeout);
		previousPhoto = $("#partyGallery .currentPhoto");
		changeSelectedMember($(this));
    });
	
	$(window).on('resize', function(){
		activePosition = activeMember.position();
		parentPosition = activeMember.parent().position()
		$("#zebra").animate({top:parentPosition.top+activePosition.top,
							 left: parentPosition.left+BUTTON_PADDING,
							 width: activeMember.outerWidth(true),
							 height: activeMember.outerHeight(true)},
							 TRANSITION_TIME/2);
	});

	function changeSelectedMember(member) {
		activeMember = member;
		activePosition = activeMember.position();
		parentPosition = member.parent().position()
		window.scrollTo(0, parentPosition.top+activePosition.top);
		$("window").animate({ scrollTop: parentPosition.top+activePosition.top }, 100000, "swing");
		$("#zebra").animate({top:parentPosition.top+activePosition.top,
							 left: parentPosition.left+BUTTON_PADDING,
							 width: activeMember.outerWidth(true),
							 height: activeMember.outerHeight(true)},
							 TRANSITION_TIME);
		console.log("MEMBER:")
		console.log(parentPosition.top+activePosition.top);
		console.log(member.position().top);
		console.log("ZEBRA:")
		console.log($("#zebra").offset().top);
		window.scrollTo(0, parentPosition.top+activePosition.top);
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

	var activePosition = activeMember.position();
	var parentPosition = activeMember.parent().position()
	$(newDiv).attr("id","zebra");
	$(newDiv).css("top",parentPosition.top+activePosition.top);
	$(newDiv).css("left",parentPosition.left+BUTTON_PADDING);
	$(newDiv).css("width",activeMember.outerWidth(true));
	$(newDiv).css("height",activeMember.outerHeight(true));
	$(newDiv).css("position","absolute");
	$(newDiv).css("border","5px solid white");
	$(newDiv).css("z-index",9001);
	//$(newDiv).css("box-sizing","content-box");

	$("#partyNames").prepend(newDiv); 

	changeSelectedMember(activeMember);

});