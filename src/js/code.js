function simulate(g) {
    let list=g.nodeList;
    // let neighbors=[];
    function drawevErything(list){
       for(let node in list){
        $("#field").append(//create circles
            $("<span>").addClass("node")
            .text(node)
            .attr("id",node)
            .css({
                left: Math.random() * ($('#field').width()-100),
                top: Math.random() * ($('#field').height()-100)
            }));
            // console.log("node:"+node);
            for(let links in list[node]){
                // neighbors.push({start:node,end:links,id:node+"-"+links});
                // console.log("links:"+links);
                $("#field").append($("<span>").addClass("link").attr("id",node+"-"+links));//create line
                $("#"+node+"-"+links).append($("<span>").addClass("weight").html(list[node][links]));//create weight
            }
        }
    }

    // initiate links with each node
    function initLinks(list){
        for(let node in list){
            let start=$("#"+node);
            for(let links in list[node]){
                let end=$("#"+links), line=$("#"+node+"-"+links);
                updateLinks(line,start,end);
            }
        }
    }

    function dragNode(list){
        $(".node").draggable({
            containment: "#field", 
            drag:function(event, ui){
                for(let node in list){
                    let start=$("#"+node);
                    for(let links in list[node]){
                        let end=$("#"+links), line=$("#"+node+"-"+links);
                        updateLinks(line,start,end);
                    }
                }
            }
        });    
    }

    function highlightDistance(){
        let path=g.dijkstra(g.nodes[0])["distances"];
        for(let k of Object.keys(path)){
            console.table(Object.keys(path)[Object.keys(path).indexOf(k)+1]);
        }
    }

    function updateLinks($link, $a, $b) {
        let aX = $a.position().left + $a.width() / 2;
        let aY = $a.position().top + $a.height() / 2;
        let bX = $b.position().left + $b.width() / 2;
        let bY = $b.position().top + $b.height() / 2;
        let midX = (aX + bX) / 2;
        let midY = (aY + bY) / 2;
        let distance = Math.sqrt(Math.pow(bX - aX, 2) + Math.pow(bY - aY, 2));
        // gpt said : stick to the circle son!
        let angle = Math.atan2(bY - aY, bX - aX) * (180 / Math.PI);// dont touch it! it's working!!
        $link.css({
          left: midX - distance / 2,
          top: midY - $link.height() / 2,
          width: distance,
          transform: "rotate(" + angle + "deg)"
        });
        $link.find(".weight").css({
            transform: "rotate(" + (-angle) + "deg)"
        });
    } 

    function setupTable(){
            $(".form-control").each(function(){$(this).val('')});
            $("#add").click(function () {
                $("#insert").append(`<tr>
                <td><input class="form-control" type="text" placeholder="point" aria-label="point"></td>
                <td>
                <button type="button" id="delete" class="btn btn-danger w-100 text-center" data-clicked=no>✖</button>
                </td>
                </tr>`);
            $(this).trigger("blur");
            });

            $("#insert").on("click", "#delete", function () {
                $(this).closest("tr").remove();
            });

            $("#save").click(function(){
                let inputs=[],
                duplicates=[];
                $(".form-control").each(function () {
                    if($(this).val()){
                        let value=($(this).val().trim());
                        inputs.push(value);
                        if(inputs.indexOf(value)!==inputs.lastIndexOf(value)&&!duplicates.includes(value)){
                            $(this).addClass("is-invalid");
                            duplicates.push(value);
                        }   
                    }
                    else{
                        $(this).addClass("is-invalid");
                    }
                });
                if(inputs.length===0){
                    resetAnimationErrors();
                    throwErrors(`Provide all the points`);
                }
                else if(inputs.length===1){
                    $(".form-control").addClass("is-invalid");
                    resetAnimationErrors();
                    throwErrors(`More than one point`);   
                }
                else if(duplicates.length===1){
                    resetAnimationErrors();
                    throwErrors(`The point ${duplicates[0]} is a duplicate`);
                }
                else if(duplicates.length>1){
                    resetAnimationErrors();
                    throwErrors(`The points ${duplicates} are duplicates`);
                }
                else{
                    g.nodes=[];
                    g.nodeList = {};
                    for(let i of inputs){
                        g.nodes_list(i);
                    }
                    $("#insert").addClass("d-none");
                    $("#insert-links").removeClass("d-none");
                    $("#back").removeClass("d-none");
                    $(".form-control").removeClass("is-invalid");
                    optionsVal(inputs, "#insert-links");//default one
                    $("#add").on('click',function(){
                        $("#insert-links tbody").append(`
							<tr>
								<td>
									<select class="form-select p-source">
									</select>
								</td>
								<td>
									<input class="form-control p-weight" type="text" placeholder="weight" aria-label="weight">
								</td>
								<td>
									<select class="form-select p-link">
									</select>
								</td>
							</tr>
						`);
						optionsVal(inputs, "#insert-links");
                    })
                    console.log(g.nodes);
                    console.table(g);
                }
                $(this).trigger("blur");
            });
    }

    // function optionsVal(inputs, id){
    //     $(id+' > tbody > tr').each(function() {
    //         $(this).find(".p-source").find('option').remove();
    //         $(this).find(".p-link").find('option').remove();
    //         for(let i of inputs){
    //             $(this).find(".p-source").append(`<option>${i}</option>`).removeAttr('disabled');
    //             $(this).find(".p-link").append(`<option>${i}</option>`).removeAttr('disabled');
    //         }
    //     });
    // }ss

    function getVal(array) {
        return array.map(item => `<option>${item}</option>`).join('');
    }

    function resetAnimationErrors(){
        $("#errorMsg")
        .stop(true, true)
        .animate({opacity: 0}, 500);
    }

    function throwErrors(error){
        resetAnimationErrors();
        $("#errorMsg  :nth-child(2)").text(error).attr('id','altertMsg');
        if($("#errorMsg").hasClass('fade')){
            $("#errorMsg")
            .css({opacity: 0, display: 'flex'})
            .animate({opacity: 1}, 500)
            .delay(2000)
            .animate({opacity: 0}, 500);    
            $(".close-popin").click(function(){
                resetAnimationErrors();
            });
        }
    }

    drawevErything(list);
    initLinks(list);
    dragNode(list);
    setupTable();
    // highlightDistance();
}
