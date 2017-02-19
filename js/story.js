const READ_TIME = 6000;
const TRANSITION_TIME = 2000;

$( document ).ready(function() {
	
    $("#backwardButton").on("click", function(){
	  window.clearTimeout(currentTimeout);
	  $('.storyPhoto').attr('style', '');
	  $(".storyPhoto").removeClass('currentPhoto');
	  getPreviousMember();
	  $("#"+"Photo"+activeMember.attr("data-index")).addClass('currentPhoto');
	  currentTimeout = setTimeout(function() 
		{
			changeSelectedMember();
		}, READ_TIME);
    });
	
	$("#forwardButton").on("click", function(){
	  window.clearTimeout(currentTimeout);
	  getNextMember();
	  $('.storyPhoto').attr('style', '');
	  $(".storyPhoto").removeClass('currentPhoto');
	  $("#"+"Photo"+activeMember.attr("data-index")).addClass('currentPhoto');
	  currentTimeout = setTimeout(function() 
		{
			changeSelectedMember();
		}, READ_TIME);
    });
	
	$("#galleryContainer").on("mouseleave", function(){
        console.log("The paragraph was clicked.");
		//$(".picture-controls").css("display", "none")
    });

	function changeSelectedMember() {
		getNextMember();
		if(previousMember){
		  $("#Photo"+previousMember.attr("data-index")).fadeOut(TRANSITION_TIME, function(){
		  $("#Photo"+previousMember.attr("data-index")).removeClass('currentPhoto');});
		  $("#"+"Photo"+activeMember.attr("data-index")).fadeIn(TRANSITION_TIME).addClass('currentPhoto');
		}
		
		currentTimeout = setTimeout(function() 
		{
			changeSelectedMember();
		}, READ_TIME);
	}

	function getNextMember() {
		var currentIndex = photoSet.index(activeMember);
		//If there is not an active member, set it to the first member.
		if(!currentIndex){
			currentIndex = 0;
		}
		if(currentIndex+1<photoSet.length){
			nextMember = photoSet.eq(currentIndex+1);
		}
		else{
			nextMember = $(".storyPhoto").eq(0);
		}
		previousMember = activeMember;
		activeMember = nextMember;
	}
	
	function getPreviousMember() {
		var currentIndex = photoSet.index(activeMember);
		if(currentIndex-1>=0){
			previousMember = photoSet.eq(currentIndex-1);
		}
		else{
			previousMember = $(".storyPhoto").eq(photoSet.length-1);
		}
		activeMember = previousMember;
	}

	var photoSet = $(".storyPhoto");
	var activeMember = photoSet.eq(0);
	var nextMember = "";
	var activePhoto = "";
	var previousMember = "";
	var currentTimeout = -1;
	$("#"+"Photo"+activeMember.attr("data-index")).addClass('currentPhoto');

	currentTimeout = setTimeout(function() 
	{
		changeSelectedMember();
	}, READ_TIME);

});