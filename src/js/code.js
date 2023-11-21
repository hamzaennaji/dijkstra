function visualize(g) {
    let list=g.nodeList;
    // console.table(list["A"]);
    for (let node in list) {
        $("#field").append(
        $("<span>").addClass("node")
        .text(node)
        .attr("id",node)
        .css({
            left: Math.random() * ($('#field').width()-100),
            top: Math.random() * ($('#field').height()-100)
          }));
        for(links in list[node]){
            // console.log(link+":");console.log($("#"+link).position());
            var $link = $("<span>").addClass("link").attr("id",node+"-"+links);
            $("#field").append($link);
            var begin=$("#"+node);
            var end=$("#"+links);
            updateLinks($link, $(begin),$(end));
            // console.log("links:"+endnode);
            }
        }
    // for(let x in $(".node")){
    //     console.log($(x).text());
    // }

    for(let node in list){
        $("#"+node).on("click",function(){
            //  console.log($(this).attr('id')+":");console.log($(this).position());
            var startnode=$(this).attr("id");
            // console.log($(this).attr("id"));
            if(Object.keys(list[node]).length>=1){
                for(links in list[node]){
                    // console.log(link+":");console.log($("#"+link).position());
                     var endnode=links;
                    // console.log("links:"+endnode);
                }
            }
        });
    }

    function updateLinks($link,$startnode,$endnode){
        var startnodeX=$startnode.position().left+$startnode.width()/2;
        var startnodeY=$startnode.position().top+$startnode.height()/2;
        var endnodeX=$endnode.position().left+$endnode.width()/2;
        var endnodeY=$endnode.position().top+$endnode.height()/2;
        var distance=Math.sqrt(Math.pow(endnodeX - startnodeX, 2) + Math.pow(endnodeY - startnodeY, 2));
        var angle = Math.atan2(endnodeY-startnodeY, endnodeX-startnodeX)*(180/Math.PI);
        $link.css({
            left: startX,
            top: startY,
            width: distance,
            transform: "rotate(" + angle + "deg)"
          });
    }
    $(".node").draggable({
        drag:function(event, ui){
            updateLinks($link,$startnode,$endnode)
        }
    });
    // $(".node").droppable();

    // for (let node in g.nodeList) {
    //     let neighbors = g.nodeList[node];
    //     for (let neighbor in neighbors) {
    //         // Connect the nodes with spans
    //         let span = document.createElement('span');
    //         span.className = 'link';
    //         span.style.left = (getX(node) + getX(neighbor)) / 2 + 'px';
    //         span.style.top = (getY(node) + getY(neighbor)) / 2 + 'px';
    //         span.style.width = getDistance(node, neighbor) + 'px';
    //         span.innerHTML = neighbors[neighbor];
    //         document.body.appendChild(span);
    //     }
    // }

    // function getX(node) {
    //     let element = document.getElementById(node);
    //     return element ? parseFloat(element.style.left) + 20 : 0; // Adjust for circle width
    // }

    // function getY(node) {
    //     let element = document.getElementById(node);
    //     return element ? parseFloat(element.style.top) + 20 : 0; // Adjust for circle height
    // }

    // function getDistance(node1, node2) {
    //     let x1 = getX(node1);
    //     let y1 = getY(node1);
    //     let x2 = getX(node2);
    //     let y2 = getY(node2);   
    //     return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    // }
}
