
        function amarakoshavalidation(){
                 var data=$("#word").val();
                 var inputlang = $("#encoding").val();
                 var relation = $("#relation").val();
                 var out_encoding = $("#out_encoding").val();
               if(data == ""){
                       alert("enter text in textboxs");return false;
               }
               else {//<![CDATA[
                        for(var i=0;i<data.length;i++){
                                if(data[i]==" "){
                                        alert("Dont Use Multiple Words, Use Single Word in Textbox1");
                                        return false;
                                }
                        
                        }//]]>
               
               }
               if(relation == "Select a Relation"){
                                alert("Please select any Relation");return false;
               }
               else {
                
        var reguni=/[अआइईउऊऋॠऌएऐओऔअंअःकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह ्ािीुूृॄॢेैोौंःऽ]/;
        var reg=/[aAiIuUqQlLeEoOMHzkKgGfcCjJFtTdDNwWxXnpPbBmyrlvSRshZ]/;
        var regitrans=/[aiuURiLIeoMH.Nkgh~NcChj~nThDtdpbmyrlvwGYsSA^]/;
        var regslp=/[aAiIuUfFlxeEoOMHkKgGNcCqQjJwWQRtTdDnpPbBmyrlvSzsh]/;
        var regvel=/[aiurleomhkgncjtdpbyszv \~\"\?\-\_\.\,\!]/;
        var regrom=/[āaīiūuṛḷekgṅcjñṭḍṇtdnpbmyrlvṣśshĀAĪIŪUEOKGCJTDNṬḌHPBMYRLVŚṢS]/;
        var regkh=/[aAiIuUlReaoMHkghGcjJTDNtdnpbmyrlvzSs]/;
                
                if(inputlang=="Unicode"){
                        if(reg.test(data)){
                                alert("please check encoding notation and input text notation");
                                return false;
                        }

                        
                }
                else if(inputlang=="Itrans"){//<![CDATA[
                        for(var i=0;i<data.length;i++){
                                if(regitrans.test(data[i])){
                                }
                                else {
                                        alert("please check encoding notation and input text notation");
                                        return false;
                                }
                        }//]]>
                        
                }
                else if(inputlang=="SLP"){//<![CDATA[
                        for(var i=0;i<data.length;i++){
                                if(regslp.test(data[i])){
                                }
                                else {
                                        alert("please check encoding notation and input text notation");
                                        return false;
                                }
                        }//]]>
                }

                else if(inputlang=="IAST"){//<![CDATA[
                        for(var i=0;i<data.length;i++){
                                if(regrom.test(data[i])){
                                }
                                else {  
                                        alert("please check encoding notation and input text notation");
                                        return false;
                                }
                        }//]]>
      
                }               

                else if(inputlang=="KH"){//<![CDATA[
                        for(var i=0;i<data.length;i++){
                                if(regkh.test(data[i])){
                                }
                                else {
                                        alert("please check encoding notation and input text notation");
                                        return false;
                                }
                        }//]]>
      
                }

                else if(inputlang=="VH"){//<![CDATA[
                        for(var i=0;i<data.length;i++){
                                if(regvel.test(data[i])){
                                }
                                else {
                                        alert("please check encoding notation and input text notation");
                                        return false;
                                }
                        }//]]>
      
                }

                else if(inputlang=="WX"){//<![CDATA[
                        for(var i=0;i<data.length;i++){
                                if(reg.test(data[i])){
                                }
                                else {
                                        alert("please check encoding notation and input text notation");
                                        return false;
                                }
                        }//]]>
                       
                }
               }
              // calling interface.cgi file here
                $("#result").html("Loading data , please wait ...");
            $.get("/cgi-bin/scl/amarakosha/interface.cgi",{"word":data,"encoding":inputlang,"relation":relation,"out_encoding":out_encoding},function(data){
                data1 = data.replace(/@।/g,".");
                $("#result").html(data1); 
              });
        }
function fvalidation(){
                        if($("#feedback").val()){
                        $.post("/cgi-bin/scl/feedback.cgi",{"feedback":$("#feedback").val(),"module":"amarakosha"},function(data){
                                $("#fresult").html(data);
                                $("#feedback").val('');

                        });
                        }
                        else{
                                alert("Please Enter Your Feedback in TextArea");
                        }
                                return false;
                }
        
