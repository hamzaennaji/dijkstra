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

            $("#insert-links").on("click", "#delete2", function () {
                $(this).closest("tr").remove();
            });
            let inputs = [];
            $("#save").click(function(){
                inputs=[],
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
                        // console.log(i);
                        g.nodes_list(i);
                    }
                    $("#exampleModalLabel").text("Link all the points");
                    $("#insert").addClass("d-none");
                    $("#insert-links").removeClass("d-none");
                    $("#add").addClass("d-none");
                    $("#save").addClass("d-none");
                    $("#back").removeClass("d-none");
                    $("#save2").removeClass("d-none");
                    $("#add2").removeClass("d-none");
                    $(".form-control").removeClass("is-invalid");
                    optionsVal(inputs, "#insert-links");//default one
                    $("#back").on('click',function(){
                        $("#add2").addClass("d-none");
                        $("#save2").addClass("d-none");
                        $("#save").removeClass("d-none");
                        $("#add").removeClass("d-none");
                        $("#insert-links").addClass("d-none");
                        $("#insert").removeClass("d-none");
                        clearWeight("#insert-links");
                        $('#insert-links > tbody > tr').each(function() {
                            $(this).find(".p-source").empty();
                            $(this).find(".p-link").empty();  
                        });
                        $("#exampleModalLabel").text("insert all the points");
                        $(this).addClass("d-none");
                    });
                    // console.log(g.nodes);
                    // console.table(g);
                }
                $(this).trigger("blur");
            });
            
            $("#add2").on('click',function(){
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
                        <td>
                        <button type="button" id="delete2" class="btn btn-danger w-100 text-center" data-clicked=no>✖</button>
                        </td>
                    </tr>
                `);
                optionsVal(inputs, "#insert-links");
                $(this).trigger("blur");
            });
            function clearWeight(tableId) {
                $(tableId + ' tbody .p-weight').val('');
            }

            /* $("#save2").on("click", function () {
                let sourceLinkPairs = new Set();
                $('#insert-links > tbody > tr').each(function () {
                    let pSource = $(this).find(".p-source");
                    let pLink = $(this).find(".p-link");
                    let pWeight = $(this).find(".p-weight");
                    if (pSource.val() && pLink.val()) {
                        let pair = `${pSource.val()}-${pLink.val()}`;
                        let ipair = `${pLink.val()}-${pSource.val()}`;
                        if (!$(this).find(".p-weight").val()){
                            pWeight.addClass("is-invalid");
                            throwErrors(`Provide the value!`);
                        }
                        else if(pLink.val()===pSource.val()){
                            resetAnimationErrors();
                            throwErrors(`Can't link ${pLink.val()} with itself !`);
                        }
                        else if(sourceLinkPairs.has(pair)||sourceLinkPairs.has(ipair)) {
                            pWeight.addClass("is-invalid");
                            resetAnimationErrors();
                            throwErrors(`${pair} Duplicate row!`);
                        }
                        else{
                        g.addLink(pSource.val(), pLink.val(), +$(this).find(".p-weight").val());
                        $("#save2").attr('data-dismiss', 'modal');
                        $("#field").empty();
                        drawevErything(g.nodeList);
                        initLinks(g.nodeList);
                        dragNode(g.nodeList);
                        }
                        sourceLinkPairs.add(pair);
                        sourceLinkPairs.add(ipair);
                    }
                });
                let distances=g.dijkstra(g.nodes[0])["distances"];
                let parents=g.dijkstra(g.nodes[0])["parents"];
                let path=getDijkstraPath(parents);
                $("#field > .link").each(function(){
                    if(path.has($(this).attr("id"))){
                        $(this).addClass('show-arrow')
                        $(this).css({ 'background-color': '#0FCCB2' });
                    }
                });
                $('.node').addClass('show-border');
                // $('.link').addClass('show-arrow');
                console.log(distances);
                console.log(parents);
                // console.log(getDijkstraPath(parents));
            }); */
            // 100% working version
            $("#save2").on("click", function () {
                let sourceLinkPairs = new Set();
                let err = false;
                $('#insert-links > tbody > tr').each(function () {
                    let pSource = $(this).find(".p-source");
                    let pLink = $(this).find(".p-link");
                    let pWeight = $(this).find(".p-weight");
                    if (pSource.val() && pLink.val()) {
                        let pair = `${pSource.val()}-${pLink.val()}`;
                        let ipair = `${pLink.val()}-${pSource.val()}`;
                        if (!pWeight.val()) {
                            pWeight.addClass("is-invalid");
                            throwErrors(`Provide the value!`);
                            err = true;
                        }
                        else if(+pWeight.val()<0){
                            pWeight.addClass("is-invalid");
                            throwErrors(`Negative values aren't allowed!`);
                            err = true;
                        }
                        else if(!/^[0-9]+$/.test(pWeight.val())){
                            pWeight.addClass("is-invalid");
                            throwErrors(`Non-digit values aren't allowed!`);
                            err = true;
                        }
                        else if (pLink.val() === pSource.val()) {
                            resetAnimationErrors();
                            throwErrors(`Can't link ${pLink.val()} with itself!`);
                            err = true;
                        } 
                        else if (sourceLinkPairs.has(pair)||sourceLinkPairs.has(ipair)) {
                            pWeight.addClass("is-invalid");
                            resetAnimationErrors();
                            throwErrors(`${pair} Duplicate row!`);
                            err = true;
                        }
                        else {
                            g.addLink(pSource.val(), pLink.val(), +pWeight.val());
                            sourceLinkPairs.add(pair);
                            sourceLinkPairs.add(ipair);
                        }
                    }
                });
                if (!err) {
                    $("#save2").attr('data-dismiss', 'modal');
                    $("#field").empty();
                    drawevErything(g.nodeList);
                    initLinks(g.nodeList);
                    dragNode(g.nodeList);
                    let distances = g.dijkstra(g.nodes[0])["distances"];
                    let parents = g.dijkstra(g.nodes[0])["parents"];
                    let path = getDijkstraPath(parents);
                    let sum=0;
                    $("#field > .link").each(function () {
                        if (path.has($(this).attr("id"))) {
                            sum+=+$(this).find(".weight").text();
                            $(this).addClass('show-arrow')
                            $(this).css({ 'background-color': '#0FCCB2' });
                        }
                    });
                    $('#'+g.nodes[0]).addClass('show-border');
                    // console.log(distances);
                    // console.log(parents);
                    let res = g.dijkstra(g.nodes[0])["distances"];
                    let resultString = `${g.nodes[0]}->0, `;
                    for (let key in res) {
                        if (distances.hasOwnProperty(key)&&distances[key]!==0) {
                            resultString += key + " -> " + distances[key] + ", ";
                        }
                    }
                    $("#res").empty();
                    $('#res').append(`
                    <h4 class="alert-heading">Dijkstra path:</h4>
                    <p ${resultString}</p>
                    <hr
                    p><b>Shortest path value:</b> ${sum}</p>
                    `);
                    $('#res').removeClass("d-none");
                }
                $(this).trigger("blur");
            });
            
    }
    
    function getDijkstraPath(x){
        let path=new Set();
        for(let k of Object.keys(x)){
            if (x[k]!==null){
                path.add(x[k]+'-'+k);
            }
        }
        return path;
    }

    // drawevErything(g.nodeList);
//100% working version
    function optionsVal(inputs, id){
        $(id + ' > tbody > tr').each(function() {
            const $pSource = $(this).find(".p-source");
            const $pLink = $(this).find(".p-link");
            //getiing the current options
            const existingOptions = $pSource.find('option').map(function() {
                return $(this).text();
            }).get();
            //adding only new options to p-source nd p-link
            for (let i of inputs) {
                if (!existingOptions.includes(i)) {
                    $pSource.append(`<option>${i}</option>`).removeAttr('disabled');
                    $pLink.append(`<option>${i}</option>`).removeAttr('disabled');
                }
            }
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
        .animate({opacity: 0}, 250);
    }

    function throwErrors(error){
        resetAnimationErrors();
        $("#errorMsg  :nth-child(2)").text(error).attr('id','altertMsg');
        if($("#errorMsg").hasClass('fade')){
            $("#errorMsg")
            .css({opacity: 0, display: 'flex'})
            .animate({opacity: 1}, 200)
            .delay(2000)
            .animate({opacity: 0}, 250,function(){
                $(this).css('display', 'none');
            });    
            $(".close-popin").click(function(){
                resetAnimationErrors();
                $("#errorMsg").animate({opacity: 0}, 250,function(){
                    $(this).css('display', 'none');
                }); 
            });
        }
    }

    drawevErything(list);
    initLinks(list);
    dragNode(list);
    $('.node').addClass('show-border');
    // $('.link').addClass('show-arrow');
    $("#field > .link").each(function () {
        if (getDijkstraPath(g.dijkstra(g.nodes[0])["parents"]).has($(this).attr("id"))) {
            $(this).addClass('show-arrow')
            $(this).css({ 'background-color': '#0FCCB2' });
        }
    });
    setupTable();
    // highlightDistance();
}