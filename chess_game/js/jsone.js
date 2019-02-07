
// variable declaration starts

var predict_move=1,move_count=0;

var previous_id,	previous_content	,previous_color,	previous_store_coin_color,	previous_store_coin_name,	previous_store_position_x,	previous_store_position_y;

var current_id,		current_content	,current_color,current_store_coin_color,	current_store_coin_name,	current_store_position_x,	current_store_position_y;

var possiblemovearray=[];

var wholearray=[]
for (var i = 11; i <=81; i=i+10) {
      for (var j = i; j <=(i+7); j=j+1) 
      {
      	wholearray.push(j)    
      }
}

var white_king_position=parseInt(15),black_king_position=parseInt(85);


var dangerplace=[];

var temp_possible_move=[];
//variable declaration ends






//	master call executed first when you click the board

function mastercall(obj)
{





	if (move_count==0)
	{
				if(movevalidate(obj))
				{
						storedata(obj);		
				}
				else{
					return;
				}
	}
	else
	{

				if (selfcheck(obj)) 
				{

							 	if(possiblemovearray.includes(parseInt(obj.id)))
							 	{
							 		removehighlight();
							 		operation(obj);
							 		check_for_opposite_king(obj)

							 	}
							 	else
							 	{
							 		
							 		alert("the coin does not have power")
							 		move_count=1;
							 		return false;

							 	}
								
					
				}
				else{
									removehighlight();
									if(movevalidate(obj))
									{
										storedata(obj);
										move_count=1;
									}


				}


	}



}









function movevalidate(obj)
{

	var	spanobj=document.getElementById(obj.id).querySelector("span");
		if (spanobj== null)
		{
			alert("wrong move");
			return false;
		}

		if ((spanobj.getAttribute("color")=="white" && predict_move == 1)	|| (spanobj.getAttribute("color")=="black" && predict_move == 0))
		{
			
			return true;
		}
		else
		{
			alert("not coorect player")
			return false;
		}
}








function storedata(obj)
{
 var spanobj=document.getElementById(obj.id).querySelector("span");
 previous_content=spanobj.innerText;
 previous_id=obj.id;
 previous_color=obj.className;
 previous_store_coin_color=spanobj.getAttribute("color");
 previous_store_coin_name=spanobj.getAttribute("coin_name");
 previous_store_position_y=(obj.id)%10;
 previous_store_position_x= parseInt( (obj.id)/10 );
 move_count=toggle(move_count);
 possiblemoves(obj);
}







function operation(obj)
{


 var spanobj=document.getElementById(obj.id).querySelector("span");
 var spanobjone=document.getElementById(previous_id).querySelector("span");
 current_id=obj.id;
 current_color=obj.className;
 current_store_coin_color=spanobj.getAttribute("color");
 current_store_coin_name=spanobj.getAttribute("coin_name");
 current_store_position_y=(obj.id)%10;
 current_store_position_x= parseInt( (obj.id)/10 );
 current_content=spanobj.innerText;


if ((previous_store_coin_name=="king") && (previous_store_coin_color=='black')	)
{
black_king_position=parseInt(current_id);
}


if ((previous_store_coin_name=="king") && (previous_store_coin_color=='white')	)
{
white_king_position=parseInt(current_id);
}




spanobj.setAttribute('color',previous_store_coin_color);
spanobj.setAttribute('coin_name',previous_store_coin_name);
spanobj.innerText=previous_content;

spanobjone.setAttribute('color',"null");
spanobjone.setAttribute('coin_name',"null");
spanobjone.innerText="";
move_count=toggle(move_count);
predict_move=toggle(predict_move);


checking_check_mate(obj);

}






function selfcheck(obj)
{

 if (document.getElementById(obj.id).querySelector("span").getAttribute("color")==previous_store_coin_color)
 {
 	return false;
 }
 else
 {

 	return true;
 }


}










function toggle(val)
{

	if(val==0)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}










function possiblemoves(obj)
{
	 var spanobj=document.getElementById(obj.id).querySelector("span");
	 var perfect_coin_name=spanobj.getAttribute("coin_name");
	 var perfect_coin_color=spanobj.getAttribute("color");
	 var perfect_y=(obj.id)%10;
 	 var perfect_x= parseInt( (obj.id)/10 );
 	 var prefect_id=obj.id;

 	



	 possiblemovearray=[];


	 switch	(perfect_coin_name)
	 {

	 	case "pawn":
			 	calculate_pawn(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;

		case "rook":
			 	calculate_rook(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;


		case "knight":
			 	calculate_knight(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;


		case "bishop":
			 	calculate_bishop(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;


		case "queen":
			 	calculate_queen(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;

		case "king":
				calculate_king(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;

		default:
				alert('default')
				break;
	 }






	 	


	 	var tempcolor	=	obj.querySelector("span").getAttribute("color");
	 	var tempcoin	=	obj.querySelector("span").getAttribute("coin_name");


	 	var s=obj.querySelector("span");
	 	s.setAttribute("color","null");
	 	s.setAttribute("coin_name","null");







	 	var temparray=[];

	 	var temp_white_king_position=white_king_position;
	 	var temp_black_king_position=black_king_position;




	 	possiblemovearray.forEach(function(change) {
  

	 						var q=document.getElementById(change);

	 						var special_coin_name=q.querySelector("span").getAttribute("coin_name");
	 						var special_coin_color=q.querySelector("span").getAttribute("color");

	 						q.querySelector("span").setAttribute("coin_name",tempcoin);
	 						q.querySelector("span").setAttribute("color",tempcolor);


	 						if((tempcoin=="king") && (tempcolor=="white"))
	 						{
	 							white_king_position=parseInt(change);
	 						}

	 						if((tempcoin=="king") && (tempcolor=="black"))
	 						{
	 							black_king_position=parseInt(change);
	 						}




	 						refine_possible(tempcolor);

	 						// console.log("dangerplace    "  +dangerplace);

							if(perfect_coin_color=="white")
							{
								if(dangerplace.includes(white_king_position))
								{

							
									temparray.push(change);
									// alert("white king danger")


								}
								else
								{


								}

							}
							else
							{
								if(dangerplace.includes(black_king_position))
								{
										temparray.push(change)
										// alert("black king danger")

								}
								else
								{



								}
							}


							q.querySelector("span").setAttribute("coin_name",special_coin_name);
	 						q.querySelector("span").setAttribute("color",special_coin_color);





		});




		obj.querySelector("span").setAttribute("color",tempcolor);
	 	obj.querySelector("span").setAttribute("coin_name",tempcoin);
	 	white_king_position 	=	temp_white_king_position;
	 	black_king_position 	=	temp_black_king_position;






								possiblemovearray = possiblemovearray.filter(function(item) {
								  return !temparray.includes(item); 
								})





								for (var x in possiblemovearray) {

											var element=document.getElementById(parseInt(possiblemovearray[x]));
											if(element.querySelector("span").getAttribute("coin_name") == "null")
											{
												 element.classList.add("highlight");
											}
											else
											{
												element.classList.add("highlightenemy");
											}

								}







}








function calculate_pawn(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{

		// alert(perfect_coin_name)
		// alert(perfect_coin_color)
		// alert(perfect_x)
		// alert(perfect_y)
		var temp=0;


								if(perfect_coin_color=="white")
								{

															if(perfect_x==2)
															{

																		if(document.getElementById((parseInt(prefect_id)+10)).querySelector("span").getAttribute("coin_name")=="null")
																		{
																					possiblemovearray[temp++]=(parseInt(prefect_id)+10);
																					
																					if(document.getElementById((parseInt(prefect_id)+20)).querySelector("span").getAttribute("coin_name")=="null")
																					{
																						possiblemovearray[temp++]=(parseInt(prefect_id)+20);
																					}
																		}

															}
															else if (perfect_x==8)
															{
																		possiblemovearray[temp++]=null;
															}
															else
															{
																if(document.getElementById((parseInt(prefect_id)+10)).querySelector("span").getAttribute("coin_name")=="null")
																	{
																		possiblemovearray[temp++]=(parseInt(prefect_id)+10);
																	}

															}
															if (perfect_y==1)
															{

																if(document.getElementById((parseInt(prefect_id)+11)).querySelector("span").getAttribute("color")=="black")
																	{
																	
																		possiblemovearray[temp++]=(parseInt(prefect_id)+11);
																	
																	}


															}
															else if(perfect_y==8)
															{
																	if(document.getElementById((parseInt(prefect_id)+9)).querySelector("span").getAttribute("color")=="black")
																	{
																		possiblemovearray[temp++]=(parseInt(prefect_id)+9);
																	}

															}
															else
															{
																if(document.getElementById((parseInt(prefect_id)+11)).querySelector("span").getAttribute("color")=="black")
																	{
																		possiblemovearray[temp++]=(parseInt(prefect_id)+11);
																	}

																if(document.getElementById((parseInt(prefect_id)+9)).querySelector("span").getAttribute("color")=="black")
																	{
																		possiblemovearray[temp++]=(parseInt(prefect_id)+9);
																	}

															}
										// console.log(possiblemovearray);
								}
								else
								{

											if(perfect_x==7)
											{

														if(document.getElementById((parseInt(prefect_id)-10)).querySelector("span").getAttribute("coin_name")=="null")
														{
																	possiblemovearray[temp++]=(parseInt(prefect_id)-10);
																	
																	if(document.getElementById((parseInt(prefect_id)-20)).querySelector("span").getAttribute("coin_name")=="null")
																	{
																		possiblemovearray[temp++]=(parseInt(prefect_id)-20);
																	}
														}

											}
											else if (perfect_x==1)
											{
														possiblemovearray[temp++]=null;
											}
											else
											{
												if(document.getElementById((parseInt(prefect_id)-10)).querySelector("span").getAttribute("coin_name")=="null")
													{
														possiblemovearray[temp++]=(parseInt(prefect_id)-10);
													}

											}
											

										

											if (perfect_y==1)
											{

												if(document.getElementById((parseInt(prefect_id)-9)).querySelector("span").getAttribute("color")=="white")
													{
														possiblemovearray[temp++]=(parseInt(prefect_id)-9);
													}


											}
											else if(perfect_y==8)
											{
													if(document.getElementById((parseInt(prefect_id)-11)).querySelector("span").getAttribute("color")=="white")
													{
														possiblemovearray[temp++]=(parseInt(prefect_id)-11);
													}

											}

											else
											{
												if(document.getElementById((parseInt(prefect_id)-9)).querySelector("span").getAttribute("color")=="white")
													{
														possiblemovearray[temp++]=(parseInt(prefect_id)-9);
													}

												if(document.getElementById((parseInt(prefect_id)-11)).querySelector("span").getAttribute("color")=="white")
													{
														possiblemovearray[temp++]=(parseInt(prefect_id)-11);
													}

											}

											// console.log(possiblemovearray);
								}




							return possiblemovearray;

}




function removehighlight()
{
	 for (var x in possiblemovearray) {
		var element=document.getElementById(parseInt(possiblemovearray[x]));
		 element.classList.remove("highlight");
		 element.classList.remove("highlightenemy");
	}
}



function calculate_rook(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{
			var temp=0;
			 

				for (var i = parseInt(prefect_id)+10;  i <=81; i=i+10) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possiblemovearray[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possiblemovearray[temp++]=i;
									break;
								}
					}




				for (var i = parseInt(prefect_id)-10;  i >=11; i=i-10) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possiblemovearray[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possiblemovearray[temp++]=i;
									break;
								}
					}


			var r=((parseInt(perfect_x)*10)+8);
				for (var i = parseInt(prefect_id)+1;  i<=r; i++) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possiblemovearray[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possiblemovearray[temp++]=i;
									break;
								}
					}




			r=((parseInt(perfect_x)*10)+1);

				for (var i = parseInt(prefect_id)-1;  i>=r; i--) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possiblemovearray[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possiblemovearray[temp++]=i;
									break;
								}
					}

				
			console.log(possiblemovearray)
			return possiblemovearray;
}



function calculate_bishop(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{

			var temp=0;



				for (var i = parseInt(prefect_id)+11;document.getElementById(i)!=null; i=i+11)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possiblemovearray[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possiblemovearray[temp++]=i;
												break;
											}
					}



				for (var i = parseInt(prefect_id)+9;	document.getElementById(i)!=null; 	i=i+9)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possiblemovearray[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possiblemovearray[temp++]=i;
												break;
											}						
					}





				for (var i = parseInt(prefect_id)-11;document.getElementById(i)!=null; i=i-11)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possiblemovearray[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possiblemovearray[temp++]=i;
												break;
											}
					}


				for (var i = parseInt(prefect_id)-9;	document.getElementById(i)!=null; 	i=i-9)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possiblemovearray[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possiblemovearray[temp++]=i;
												break;
											}						
					}







			console.log("bishop",possiblemovearray)
			return possiblemovearray;

}


function calculate_queen(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{
			var one=calculate_bishop(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			var arrayone = one.slice(); 
			var two= calculate_rook(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			var arraytwo = two.slice();




			possiblemovearray=[];
			possiblemovearray=arrayone.concat(arraytwo);
			return possiblemovearray;
}




function calculate_king(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{


	var temp=0;
	var t=parseInt(prefect_id);
	var temparray=[-9,-10,-11,-1,+1,9,10,11];
	possiblemovearray=[]


		for (i = 0; i <8 ; i++) 
		{

			var run=parseInt(t+temparray[i]);
							if(document.getElementById(run)!=null)
							{

											if (document.getElementById( run ).querySelector("span").getAttribute('color') == "null")
											{

															possiblemovearray[temp++]=run;
															// var inner_temparray=[-9,-10,-11,-1,+1,9,10,11];
															// var flag=0;
															// inner_temparray.forEach(function(item){
															// 	var inner_run=parseInt(run+parseInt(item));
															// 	if(document.getElementById(inner_run)!=null)
															// 	{
															// 		if ((document.getElementById( inner_run ).querySelector("span").getAttribute('coin_name') == "king") &&	(document.getElementById( inner_run ).querySelector("span").getAttribute('color')!=document.getElementById(prefect_id).querySelector("span").getAttribute('color')))
															// 		{
															// 				flag=1;
															// 		}
															// 	}
															// });


															// if (flag==0)
															// {
															// 	possiblemovearray[temp++]=run;
															// }
														

											}
											else if(document.getElementById( run ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{	
												continue;
											}
											else
											{

															possiblemovearray[temp++]=run;

															// var inner_temparray=[-9,-10,-11,-1,+1,9,10,11];
															// var flag=0;
															// inner_temparray.forEach(function(item){
															// 	var inner_run=parseInt(run+parseInt(item));
															// 	if(document.getElementById(inner_run)!=null)
															// 	{
															// 		if ((document.getElementById( inner_run ).querySelector("span").getAttribute('coin_name') == "king") &&	(document.getElementById( inner_run ).querySelector("span").getAttribute('color')!=document.getElementById(prefect_id).querySelector("span").getAttribute('color')))
															// 		{
															// 				flag=1;
															// 		}
															// 	}
															// });


															// if (flag==0)
															// {
															// 	possiblemovearray[temp++]=run;
															// }
											

											}			
										}
									}

return possiblemovearray;

}




function calculate_knight(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{


	var temp=0;
	var t=parseInt(prefect_id);
	var temparray=[8,-8,19,-19,21,-21,12,-12];
	possiblemovearray=[]


		for (i = 0; i <8 ; i++) 
		{

			var run=parseInt(t+temparray[i]);
							if(document.getElementById(run)!=null)
							{

											if (document.getElementById( run ).querySelector("span").getAttribute('color') == "null")
											{
												possiblemovearray[temp++]=run;
											}
											else if(document.getElementById( run ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												continue;
											}
											else
											{
												possiblemovearray[temp++]=run;
											}			

							}




		}
return possiblemovearray;
}









function refine_possible(tempcolor)
{




	 if(tempcolor=="white")
	 {
		var enemy_color="black";
	 }
	 else
	 {
	 	var enemy_color="white";
	 }


	calculate_enemy(enemy_color);




}








function calculate_enemy(enemy_color)
{

				dangerplace=[];
				wholearray.forEach(function(element) {
			 	var check_coin_name=document.getElementById(element).querySelector("span").getAttribute("coin_name");
			 	var check_coin_color=document.getElementById(element).querySelector("span").getAttribute("color");
			 	var check_id=document.getElementById(element);
			 	if (check_coin_color==enemy_color)
			 	{
			 		possible_opposition_cut_move(element);
			 	}
				});


}







function possible_opposition_cut_move(element)
{
	var obj=document.getElementById(element);
	 var spanobj=document.getElementById(element).querySelector("span");
	 var perfect_coin_name=spanobj.getAttribute("coin_name");
	 var perfect_coin_color=spanobj.getAttribute("color");
	 var perfect_y=(element)%10;
 	 var perfect_x= parseInt( (element)/10 );
 	 var prefect_id=element;
 	


	 switch	(perfect_coin_name)
	 {

	 	case "pawn":

			 	dangerplace=dangerplace.concat(cal_pawn(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id).slice());
			 	break;


		case "rook":

				dangerplace=dangerplace.concat(cal_rook(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id).slice());
			 	break;


		case "knight":


				dangerplace=dangerplace.concat(cal_knight(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id).slice());
			 	break;


		case "bishop":
			 
				dangerplace=dangerplace.concat(cal_bishop(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id).slice());
			 	break;


		case "queen":
			 
			dangerplace=dangerplace.concat(cal_queen(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id).slice());
			break;

		case "king":

				dangerplace=dangerplace.concat(cal_king(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id).slice());
			 	break;

		default:
				alert('default')
				break;
	 }



}

















function cal_rook(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{
			var temp=0;
			var possible=[];

				for (var i = parseInt(prefect_id)+10;  i <=81; i=i+10) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possible[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possible[temp++]=i;
									break;
								}
					}




				for (var i = parseInt(prefect_id)-10;  i >=11; i=i-10) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possible[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possible[temp++]=i;
									break;
								}
					}


			var r=((parseInt(perfect_x)*10)+8);
				for (var i = parseInt(prefect_id)+1;  i<=r; i++) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possible[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possible[temp++]=i;
									break;
								}
					}




			r=((parseInt(perfect_x)*10)+1);

				for (var i = parseInt(prefect_id)-1;  i>=r; i--) {
								if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
								{
									possible[temp++]=i;
								}
								else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
								{
									break;
								}
								else
								{
									possible[temp++]=i;
									break;
								}
					}

				

			return possible;
}

function cal_knight(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{


	var temp=0;
	var t=parseInt(prefect_id);
	var temparray=[8,-8,19,-19,21,-21,12,-12];
	var possible=[];


		for (i = 0; i <8 ; i++) 
		{

			var run=parseInt(t+temparray[i]);
							if(document.getElementById(run)!=null)
							{

											if (document.getElementById( run ).querySelector("span").getAttribute('color') == "null")
											{
												possible[temp++]=run;
											}
											else if(document.getElementById( run ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												continue;
											}
											else
											{
												possible[temp++]=run;
											}			

							}




		}
return possible;
}

function cal_bishop(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{

			var temp=0;
			var possible=[];


				for (var i = parseInt(prefect_id)+11;document.getElementById(i)!=null; i=i+11)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possible[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possible[temp++]=i;
												break;
											}
					}



				for (var i = parseInt(prefect_id)+9;	document.getElementById(i)!=null; 	i=i+9)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possible[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possible[temp++]=i;
												break;
											}						
					}





				for (var i = parseInt(prefect_id)-11;document.getElementById(i)!=null; i=i-11)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possible[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possible[temp++]=i;
												break;
											}
					}


				for (var i = parseInt(prefect_id)-9;	document.getElementById(i)!=null; 	i=i-9)
					{

											if (document.getElementById( i ).querySelector("span").getAttribute('color') == "null")
											{
												possible[temp++]=i;
											}
											else if(document.getElementById( i ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{
												break;
											}
											else
											{
												possible[temp++]=i;
												break;
											}						
					}







			return possible;
}

function cal_queen(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{
			var one=cal_bishop(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			var arrayone = one.slice(); 
			var two= cal_rook(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			var arraytwo = two.slice();
			var final=[];
			final=arrayone.concat(arraytwo);
			return final;
}

function cal_king(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{


	var temp=0;
	var t=parseInt(prefect_id);
	var temparray=[-9,-10,-11,-1,+1,9,10,11];
	var possible=[];

		for (i = 0; i <8 ; i++) 
		{

			var run=parseInt(t+temparray[i]);
							if(document.getElementById(run)!=null)
							{

											if (document.getElementById( run ).querySelector("span").getAttribute('color') == "null")
											{

															possible[temp++]=run;
															// var inner_temparray=[-9,-10,-11,-1,+1,9,10,11];
															// var flag=0;
															// inner_temparray.forEach(function(item){
															// 	var inner_run=parseInt(run+parseInt(item));
															// 	if(document.getElementById(inner_run)!=null)
															// 	{
															// 		if ((document.getElementById( inner_run ).querySelector("span").getAttribute('coin_name') == "king") &&	(document.getElementById( inner_run ).querySelector("span").getAttribute('color')!=document.getElementById(prefect_id).querySelector("span").getAttribute('color')))
															// 		{
															// 				flag=1;
															// 		}
															// 	}
															// });


															// if (flag==0)
															// {
															// 	possiblemovearray[temp++]=run;
															// }
														

											}
											else if(document.getElementById( run ).querySelector("span").getAttribute('color')==document.getElementById(prefect_id).querySelector("span").getAttribute('color'))
											{	
												continue;
											}
											else
											{

															possible[temp++]=run;

															// var inner_temparray=[-9,-10,-11,-1,+1,9,10,11];
															// var flag=0;
															// inner_temparray.forEach(function(item){
															// 	var inner_run=parseInt(run+parseInt(item));
															// 	if(document.getElementById(inner_run)!=null)
															// 	{
															// 		if ((document.getElementById( inner_run ).querySelector("span").getAttribute('coin_name') == "king") &&	(document.getElementById( inner_run ).querySelector("span").getAttribute('color')!=document.getElementById(prefect_id).querySelector("span").getAttribute('color')))
															// 		{
															// 				flag=1;
															// 		}
															// 	}
															// });


															// if (flag==0)
															// {
															// 	possiblemovearray[temp++]=run;
															// }
											

											}			
										}
									}
return possible;
}
function cal_pawn(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id)
{
		
		var temp=0;
		var possible=[];

								if(perfect_coin_color=="white")
								{

									
												
															if (perfect_y==1)
															{

																if(document.getElementById((parseInt(prefect_id)+11)).querySelector("span").getAttribute("color")=="black")
																	{
																		possible[temp++]=(parseInt(prefect_id)+11);
																	
																	}


															}
															else if(perfect_y==8)
															{
																	if(document.getElementById((parseInt(prefect_id)+9)).querySelector("span").getAttribute("color")=="black")
																	{
																		possible[temp++]=(parseInt(prefect_id)+9);
																	}

															}
															else
															{
																if(document.getElementById((parseInt(prefect_id)+11)).querySelector("span").getAttribute("color")=="black")
																	{
																		possible[temp++]=(parseInt(prefect_id)+11);
																	}

																if(document.getElementById((parseInt(prefect_id)+9)).querySelector("span").getAttribute("color")=="black")
																	{
																		possible[temp++]=(parseInt(prefect_id)+9);
																	}

															}

										// console.log(possiblemovearray);
								}
								else
								{
		
											if (perfect_y==1)
											{

												if(document.getElementById((parseInt(prefect_id)-9)).querySelector("span").getAttribute("color")=="white")
													{
														possible[temp++]=(parseInt(prefect_id)-9);
													}


											}
											else if(perfect_y==8)
											{
													if(document.getElementById((parseInt(prefect_id)-11)).querySelector("span").getAttribute("color")=="white")
													{
														possible[temp++]=(parseInt(prefect_id)-11);
													}

											}

											else
											{
												if(document.getElementById((parseInt(prefect_id)-9)).querySelector("span").getAttribute("color")=="white")
													{
														possible[temp++]=(parseInt(prefect_id)-9);
													}

												if(document.getElementById((parseInt(prefect_id)-11)).querySelector("span").getAttribute("color")=="white")
													{
														possible[temp++]=(parseInt(prefect_id)-11);
													}

											}

											// console.log(possiblemovearray);
								}




							return possible;
}
















function check_for_opposite_king(obj)
{


dangerplace=[];
possible_opposition_cut_move(parseInt(obj.id))
console.log("after ====>     "+dangerplace)


			
							if(document.getElementById(obj.id).querySelector("span").getAttribute("color")!="black")
							{
								if(dangerplace.includes(black_king_position))
								{
									alert("black king check")

									
								}


							}
							else
							{
								if(dangerplace.includes(white_king_position))
								{
										alert("white king check")
										

								}

							}

}





function checking_check_mate(obj)
{

// alert("kowsik")
temp_possible_move=[];
wholearray.forEach(function(element) {

			 	var check_coin_name=document.getElementById(element).querySelector("span").getAttribute("coin_name");
			 	var check_coin_color=document.getElementById(element).querySelector("span").getAttribute("color");
			 	var check_id=document.getElementById(element);

			 	if(check_coin_color !="null")
			 	{
					 	if (check_coin_color!=document.getElementById(obj.id).querySelector("span").getAttribute("color"))
					 	{


								// console.log(document.getElementById(element).querySelector("span").getAttribute("coin_name")+"=======>>>")
					 			
					 			possiblemoves_duplicate(document.getElementById(element));

					 			console.log("temp_possible_move. ======="+temp_possible_move);
					 			console.log("length=====>"+temp_possible_move.length)


					 		


					 		
					 	}
			 	}
});


	if (temp_possible_move.length==0)
					 			{
					 				alert("check_mate")

					 			}
					 			else
					 			{

					 			}






}













function possiblemoves_duplicate(obj)
{
	 var spanobj=document.getElementById(obj.id).querySelector("span");
	 var perfect_coin_name=spanobj.getAttribute("coin_name");
	 var perfect_coin_color=spanobj.getAttribute("color");
	 var perfect_y=(obj.id)%10;
 	 var perfect_x= parseInt( (obj.id)/10 );
 	 var prefect_id=obj.id;

 	



	
 possiblemovearray=[];

	 switch	(perfect_coin_name)
	 {

	 	case "pawn":
			 	calculate_pawn(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;

		case "rook":
			 	calculate_rook(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;


		case "knight":
			 	calculate_knight(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;


		case "bishop":
			 	calculate_bishop(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;


		case "queen":
			 	calculate_queen(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;

		case "king":
				calculate_king(perfect_coin_name,perfect_coin_color,obj,perfect_x,perfect_y,prefect_id);
			 	break;

		default:
				alert('default')
				break;
	 }






	 	


	 	var tempcolor	=	obj.querySelector("span").getAttribute("color");
	 	var tempcoin	=	obj.querySelector("span").getAttribute("coin_name");


	 	var s=obj.querySelector("span");
	 	s.setAttribute("color","null");
	 	s.setAttribute("coin_name","null");







	 	var temparray=[];

	 	var temp_white_king_position=white_king_position;
	 	var temp_black_king_position=black_king_position;




	 	possiblemovearray.forEach(function(change) {
  

	 						var q=document.getElementById(change);

	 						var special_coin_name=q.querySelector("span").getAttribute("coin_name");
	 						var special_coin_color=q.querySelector("span").getAttribute("color");

	 						q.querySelector("span").setAttribute("coin_name",tempcoin);
	 						q.querySelector("span").setAttribute("color",tempcolor);


	 						if((tempcoin=="king") && (tempcolor=="white"))
	 						{
	 							white_king_position=parseInt(change);
	 						}

	 						if((tempcoin=="king") && (tempcolor=="black"))
	 						{
	 							black_king_position=parseInt(change);
	 						}




	 						refine_possible(tempcolor);

	 						console.log("dangerplace    "  +dangerplace);

							if(perfect_coin_color=="white")
							{
								if(dangerplace.includes(white_king_position))
								{

							
									temparray.push(change);
									


								}
								else
								{


								}

							}
							else
							{
								if(dangerplace.includes(black_king_position))
								{
										temparray.push(change)
										

								}
								else
								{



								}
							}


							q.querySelector("span").setAttribute("coin_name",special_coin_name);
	 						q.querySelector("span").setAttribute("color",special_coin_color);





		});




		obj.querySelector("span").setAttribute("color",tempcolor);
	 	obj.querySelector("span").setAttribute("coin_name",tempcoin);
	 	white_king_position 	=	temp_white_king_position;
	 	black_king_position 	=	temp_black_king_position;






								possiblemovearray = possiblemovearray.filter(function(item) {
								  return !temparray.includes(item); 
								})






							temp_possible_move=temp_possible_move.concat(possiblemovearray.slice())




}







