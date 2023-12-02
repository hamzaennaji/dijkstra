function simulate(g) {//
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
        // gpt said : stick to the circle son!
        // dont touch it! it's working!!
        let midX = (aX + bX) / 2;
        let midY = (aY + bY) / 2;
        let distance = Math.sqrt(Math.pow(bX - aX, 2) + Math.pow(bY - aY, 2));
        let angle = Math.atan2(bY - aY, bX - aX) * (180 / Math.PI);
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
            let i=0;
            $("#add").click(function () {
                i++;
                $("#insert").append(`<tr>
                <td><input class="form-control" type="text" placeholder="point ${i}" aria-label="point ${i}"></td>
                <td>
                <button type="button" id="delete" class="btn btn-danger w-100 text-center" data-clicked=no>X</button>
                </button>
                </td>
                </tr>`);
            });
            $("#insert").on("click", "#delete", function () {
                $(this).closest("tr").remove();
            });
            $("#save").click(function(){
                var inputs=[];
                $(".form-control").each(function () {
                    if($(this).val()){
                        let value=($(this).val().trim());
                        if(inputs.includes(value)){
                            // $("#table-input").append(`<div class="alert alert-danger" role="alert">${value} is a duplicate</div>`)
                            if($("#errorMsg").hasClass('hide')&&$("#errorMsg").hasClass('fade')){
                                $("#errorMsg").removeClass('hide')
                                .addClass('show')
                                .css({opacity: 0, display: 'block'})
                                .animate({opacity: 1}, 500)
                                .delay(2000)
                                .animate({opacity: 0}, 500, function () {
                                    $(this).removeClass('show').addClass('hide').css('display', 'none')
                                });
                            }
                            return;
                        }
                        inputs.push(value);
                    }   
                });
                for (let v of inputs) {
                    console.log(v);
                }
            });
            
        }
        
    // $("#launch").click(function () {
    //     $("#table-input").modal("show");
    // });
    drawevErything(list);
    initLinks(list);
    dragNode(list);
    setupTable();
    // highlightDistance();
}
